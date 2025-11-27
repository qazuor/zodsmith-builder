import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { siteConfig } from '@/config/site.config';
import {
  DEFAULT_OUTPUT_CONFIG,
  getDefaultValidations,
  type FieldDefinition,
  type OutputConfig,
  type SchemaDefinition,
  type SchemaTemplate,
  type ZodSmithStore,
} from '@/types/schema.types';

// =============================================================================
// Helpers
// =============================================================================

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const createEmptySchema = (name: string, description?: string): SchemaDefinition => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    description,
    fields: [],
    createdAt: now,
    updatedAt: now,
  };
};

// =============================================================================
// Store
// =============================================================================

export const useZodSmithStore = create<ZodSmithStore>()(
  persist(
    (set, get) => ({
      // =======================================================================
      // State
      // =======================================================================
      currentSchema: null,
      savedSchemas: [],
      outputConfig: DEFAULT_OUTPUT_CONFIG,
      selectedFieldId: null,
      isEditing: false,

      // =======================================================================
      // Schema CRUD
      // =======================================================================

      createSchema: (name: string, description?: string) => {
        const newSchema = createEmptySchema(name, description);
        set({
          currentSchema: newSchema,
          selectedFieldId: null,
          isEditing: true,
        });
      },

      loadSchema: (id: string) => {
        const { savedSchemas } = get();
        const schema = savedSchemas.find((s) => s.id === id);
        if (schema) {
          set({
            currentSchema: { ...schema },
            selectedFieldId: null,
            isEditing: false,
          });
        }
      },

      saveSchema: () => {
        const { currentSchema, savedSchemas } = get();
        if (!currentSchema) return;

        const updatedSchema: SchemaDefinition = {
          ...currentSchema,
          updatedAt: new Date().toISOString(),
        };

        const existingIndex = savedSchemas.findIndex((s) => s.id === currentSchema.id);

        if (existingIndex >= 0) {
          // Update existing
          const updated = [...savedSchemas];
          updated[existingIndex] = updatedSchema;
          set({
            savedSchemas: updated,
            currentSchema: updatedSchema,
            isEditing: false,
          });
        } else {
          // Add new
          set({
            savedSchemas: [...savedSchemas, updatedSchema],
            currentSchema: updatedSchema,
            isEditing: false,
          });
        }
      },

      deleteSchema: (id: string) => {
        const { savedSchemas, currentSchema } = get();
        set({
          savedSchemas: savedSchemas.filter((s) => s.id !== id),
          currentSchema: currentSchema?.id === id ? null : currentSchema,
          selectedFieldId: currentSchema?.id === id ? null : get().selectedFieldId,
        });
      },

      duplicateSchema: (id: string) => {
        const { savedSchemas } = get();
        const schema = savedSchemas.find((s) => s.id === id);
        if (!schema) return;

        const now = new Date().toISOString();
        const duplicated: SchemaDefinition = {
          ...schema,
          id: generateId(),
          name: `${schema.name} (copy)`,
          createdAt: now,
          updatedAt: now,
          fields: schema.fields.map((f) => ({ ...f, id: generateId() })),
        };

        set({
          currentSchema: duplicated,
          selectedFieldId: null,
          isEditing: true,
        });
      },

      updateSchemaName: (name: string) => {
        const { currentSchema } = get();
        if (!currentSchema) return;

        set({
          currentSchema: { ...currentSchema, name },
          isEditing: true,
        });
      },

      updateSchemaDescription: (description: string) => {
        const { currentSchema } = get();
        if (!currentSchema) return;

        set({
          currentSchema: { ...currentSchema, description },
          isEditing: true,
        });
      },

      // =======================================================================
      // Field CRUD
      // =======================================================================

      addField: (fieldData) => {
        const { currentSchema } = get();
        if (!currentSchema) return;

        const newField: FieldDefinition = {
          ...fieldData,
          id: generateId(),
          validations: fieldData.validations || getDefaultValidations(fieldData.type),
        };

        set({
          currentSchema: {
            ...currentSchema,
            fields: [...currentSchema.fields, newField],
          },
          selectedFieldId: newField.id,
          isEditing: true,
        });
      },

      updateField: (id: string, updates: Partial<FieldDefinition>) => {
        const { currentSchema } = get();
        if (!currentSchema) return;

        // If type changed, reset validations to defaults for new type
        const field = currentSchema.fields.find((f) => f.id === id);
        if (field && updates.type && updates.type !== field.type) {
          updates.validations = getDefaultValidations(updates.type);
        }

        set({
          currentSchema: {
            ...currentSchema,
            fields: currentSchema.fields.map((f) =>
              f.id === id ? { ...f, ...updates } : f
            ),
          },
          isEditing: true,
        });
      },

      removeField: (id: string) => {
        const { currentSchema, selectedFieldId } = get();
        if (!currentSchema) return;

        set({
          currentSchema: {
            ...currentSchema,
            fields: currentSchema.fields.filter((f) => f.id !== id),
          },
          selectedFieldId: selectedFieldId === id ? null : selectedFieldId,
          isEditing: true,
        });
      },

      reorderFields: (fromIndex: number, toIndex: number) => {
        const { currentSchema } = get();
        if (!currentSchema) return;

        const fields = [...currentSchema.fields];
        const [removed] = fields.splice(fromIndex, 1);
        fields.splice(toIndex, 0, removed);

        set({
          currentSchema: { ...currentSchema, fields },
          isEditing: true,
        });
      },

      // =======================================================================
      // Field Selection
      // =======================================================================

      selectField: (id: string | null) => {
        set({ selectedFieldId: id });
      },

      // =======================================================================
      // Output Config
      // =======================================================================

      setOutputConfig: (config: Partial<OutputConfig>) => {
        const { outputConfig } = get();
        set({
          outputConfig: { ...outputConfig, ...config },
        });
      },

      // =======================================================================
      // Import/Templates
      // =======================================================================

      importFromTypeScript: (code: string): boolean => {
        try {
          // Basic TypeScript interface/type parser
          const parsed = parseTypeScriptToSchema(code);
          if (!parsed) return false;

          const now = new Date().toISOString();
          const newSchema: SchemaDefinition = {
            id: generateId(),
            name: parsed.name,
            description: `Imported from TypeScript`,
            fields: parsed.fields.map((f) => ({ ...f, id: generateId() })),
            createdAt: now,
            updatedAt: now,
          };

          set({
            currentSchema: newSchema,
            selectedFieldId: null,
            isEditing: true,
          });

          return true;
        } catch {
          return false;
        }
      },

      loadTemplate: (template: SchemaTemplate) => {
        const now = new Date().toISOString();
        const newSchema: SchemaDefinition = {
          id: generateId(),
          name: template.schema.name,
          description: template.schema.description,
          fields: template.schema.fields.map((f) => ({ ...f, id: generateId() })),
          createdAt: now,
          updatedAt: now,
        };

        set({
          currentSchema: newSchema,
          selectedFieldId: null,
          isEditing: true,
        });
      },

      // =======================================================================
      // Reset
      // =======================================================================

      resetCurrentSchema: () => {
        set({
          currentSchema: null,
          selectedFieldId: null,
          isEditing: false,
        });
      },

      resetStore: () => {
        set({
          currentSchema: null,
          savedSchemas: [],
          outputConfig: DEFAULT_OUTPUT_CONFIG,
          selectedFieldId: null,
          isEditing: false,
        });
      },
    }),
    {
      name: siteConfig.storage.history,
      partialize: (state) => ({
        savedSchemas: state.savedSchemas,
        outputConfig: state.outputConfig,
      }),
    }
  )
);

// =============================================================================
// TypeScript Parser (Basic Implementation)
// =============================================================================

interface ParsedSchema {
  name: string;
  fields: Omit<FieldDefinition, 'id'>[];
}

function parseTypeScriptToSchema(code: string): ParsedSchema | null {
  // Match interface or type declaration
  const interfaceMatch = code.match(/(?:interface|type)\s+(\w+)\s*(?:=\s*)?{([^}]+)}/s);
  if (!interfaceMatch) return null;

  const [, name, body] = interfaceMatch;
  const fields: Omit<FieldDefinition, 'id'>[] = [];

  // Match field declarations
  const fieldRegex = /(\w+)(\?)?:\s*([^;,\n]+)/g;
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex exec pattern
  while ((match = fieldRegex.exec(body)) !== null) {
    const [, fieldName, optional, typeStr] = match;
    const trimmedType = typeStr.trim();

    const field = parseTypeToField(fieldName, trimmedType, !optional);
    if (field) {
      fields.push(field);
    }
  }

  return { name, fields };
}

function parseTypeToField(
  name: string,
  typeStr: string,
  required: boolean
): Omit<FieldDefinition, 'id'> | null {
  const nullable = typeStr.includes('| null');
  const cleanType = typeStr.replace(/\s*\|\s*null/g, '').trim();

  // Check for array
  if (cleanType.endsWith('[]')) {
    const itemType = cleanType.slice(0, -2).trim();
    return {
      name,
      type: 'array',
      required,
      nullable,
      validations: {
        itemType: mapTypeStringToFieldType(itemType),
      },
    };
  }

  // Check for enum (union of string literals)
  if (cleanType.includes("'") || cleanType.includes('"')) {
    const enumValues = cleanType
      .split('|')
      .map((v) => v.trim().replace(/['"]/g, ''))
      .filter((v) => v.length > 0);

    if (enumValues.length > 0) {
      return {
        name,
        type: 'enum',
        required,
        nullable,
        validations: { values: enumValues },
      };
    }
  }

  const fieldType = mapTypeStringToFieldType(cleanType);

  return {
    name,
    type: fieldType,
    required,
    nullable,
    validations: getDefaultValidations(fieldType),
  };
}

function mapTypeStringToFieldType(typeStr: string): 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array' {
  const lower = typeStr.toLowerCase();

  if (lower === 'string') return 'string';
  if (lower === 'number' || lower === 'int' || lower === 'float') return 'number';
  if (lower === 'boolean' || lower === 'bool') return 'boolean';
  if (lower === 'date' || lower.includes('date')) return 'date';

  // Default to string for unknown types
  return 'string';
}
