/**
 * ZodSmith Schema Types
 *
 * Type definitions for the visual Zod schema builder
 */

// =============================================================================
// Field Types
// =============================================================================

export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array';

// =============================================================================
// Validations by Type
// =============================================================================

export interface StringValidations {
  min?: number;
  max?: number;
  length?: number;
  email?: boolean;
  url?: boolean;
  uuid?: boolean;
  cuid?: boolean;
  regex?: string;
  startsWith?: string;
  endsWith?: string;
  includes?: string;
  trim?: boolean;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
}

export interface NumberValidations {
  min?: number;
  max?: number;
  int?: boolean;
  positive?: boolean;
  negative?: boolean;
  nonpositive?: boolean;
  nonnegative?: boolean;
  multipleOf?: number;
  finite?: boolean;
}

export interface DateValidations {
  min?: string; // ISO date string
  max?: string; // ISO date string
}

export interface ArrayValidations {
  min?: number;
  max?: number;
  length?: number;
  nonempty?: boolean;
  itemType: FieldType;
  itemValidations?: FieldValidations;
}

export interface EnumValidations {
  values: string[];
}

export type BooleanValidations = Record<string, never>

export type FieldValidations =
  | StringValidations
  | NumberValidations
  | DateValidations
  | ArrayValidations
  | EnumValidations
  | BooleanValidations;

// =============================================================================
// Field Definition
// =============================================================================

export interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  nullable: boolean;
  defaultValue?: string;
  description?: string;
  validations: FieldValidations;
}

// =============================================================================
// Schema Definition
// =============================================================================

export interface SchemaDefinition {
  id: string;
  name: string;
  description?: string;
  fields: FieldDefinition[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// =============================================================================
// Output Configuration
// =============================================================================

export type TypeOutputStyle = 'infer' | 'interface' | 'type';

export interface OutputConfig {
  typeStyle: TypeOutputStyle;
  includeExports: boolean;
  schemaNameSuffix: string; // e.g., "Schema" -> UserSchema
  typeNameSuffix: string; // e.g., "" -> User, "Type" -> UserType
  includeComments: boolean;
  semicolons: boolean;
}

// =============================================================================
// Template Definition
// =============================================================================

export interface SchemaTemplate {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  schema: Omit<SchemaDefinition, 'id' | 'createdAt' | 'updatedAt'>;
}

// =============================================================================
// Store State
// =============================================================================

export interface ZodSmithState {
  // Current schema being edited
  currentSchema: SchemaDefinition | null;

  // List of saved schemas
  savedSchemas: SchemaDefinition[];

  // Output configuration
  outputConfig: OutputConfig;

  // UI State
  selectedFieldId: string | null;
  isEditing: boolean;
}

// =============================================================================
// Store Actions
// =============================================================================

export interface ZodSmithActions {
  // Schema CRUD
  createSchema: (name: string, description?: string) => void;
  loadSchema: (id: string) => void;
  saveSchema: () => void;
  deleteSchema: (id: string) => void;
  duplicateSchema: (id: string) => void;
  updateSchemaName: (name: string) => void;
  updateSchemaDescription: (description: string) => void;

  // Field CRUD
  addField: (field: Omit<FieldDefinition, 'id'>) => void;
  updateField: (id: string, updates: Partial<FieldDefinition>) => void;
  removeField: (id: string) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;

  // Field Selection
  selectField: (id: string | null) => void;

  // Output Config
  setOutputConfig: (config: Partial<OutputConfig>) => void;

  // Import/Templates
  importFromTypeScript: (code: string) => boolean;
  loadTemplate: (template: SchemaTemplate) => void;

  // Reset
  resetCurrentSchema: () => void;
  resetStore: () => void;
}

export type ZodSmithStore = ZodSmithState & ZodSmithActions;

// =============================================================================
// Default Values
// =============================================================================

export const DEFAULT_OUTPUT_CONFIG: OutputConfig = {
  typeStyle: 'infer',
  includeExports: true,
  schemaNameSuffix: 'Schema',
  typeNameSuffix: '',
  includeComments: true,
  semicolons: true,
};

export const DEFAULT_STRING_VALIDATIONS: StringValidations = {};
export const DEFAULT_NUMBER_VALIDATIONS: NumberValidations = {};
export const DEFAULT_DATE_VALIDATIONS: DateValidations = {};
export const DEFAULT_BOOLEAN_VALIDATIONS: BooleanValidations = {};

export const DEFAULT_ARRAY_VALIDATIONS: ArrayValidations = {
  itemType: 'string',
};

export const DEFAULT_ENUM_VALIDATIONS: EnumValidations = {
  values: [],
};

export const getDefaultValidations = (type: FieldType): FieldValidations => {
  switch (type) {
    case 'string':
      return { ...DEFAULT_STRING_VALIDATIONS };
    case 'number':
      return { ...DEFAULT_NUMBER_VALIDATIONS };
    case 'boolean':
      return { ...DEFAULT_BOOLEAN_VALIDATIONS };
    case 'date':
      return { ...DEFAULT_DATE_VALIDATIONS };
    case 'array':
      return { ...DEFAULT_ARRAY_VALIDATIONS };
    case 'enum':
      return { ...DEFAULT_ENUM_VALIDATIONS };
  }
};
