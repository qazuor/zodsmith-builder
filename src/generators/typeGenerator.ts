import type {
  ArrayValidations,
  EnumValidations,
  FieldDefinition,
  OutputConfig,
  SchemaDefinition,
} from '@/types/schema.types';

/**
 * Generates TypeScript type/interface from a SchemaDefinition
 */
export function generateTypeScript(
  schema: SchemaDefinition,
  config: OutputConfig
): string {
  const lines: string[] = [];
  const { semicolons, includeComments, includeExports, typeNameSuffix, typeStyle } = config;
  const semi = semicolons ? ';' : '';
  const typeName = `${schema.name}${typeNameSuffix}`;
  const exportKeyword = includeExports ? 'export ' : '';

  // Description comment
  if (includeComments && schema.description) {
    lines.push('/**');
    lines.push(` * ${schema.description}`);
    lines.push(' */');
  }

  if (typeStyle === 'interface') {
    // Generate interface
    lines.push(`${exportKeyword}interface ${typeName} {`);
  } else {
    // Generate type alias
    lines.push(`${exportKeyword}type ${typeName} = {`);
  }

  // Generate fields
  schema.fields.forEach((field) => {
    if (includeComments && field.description) {
      lines.push(`  /** ${field.description} */`);
    }

    const typeCode = generateFieldType(field);
    const optional = !field.required ? '?' : '';

    lines.push(`  ${field.name}${optional}: ${typeCode}${semi}`);
  });

  if (typeStyle === 'interface') {
    lines.push('}');
  } else {
    lines.push(`}${semi}`);
  }

  return lines.join('\n');
}

/**
 * Generates TypeScript type for a field
 */
function generateFieldType(field: FieldDefinition): string {
  let baseType = getBaseType(field);

  // Handle nullable
  if (field.nullable) {
    baseType = `${baseType} | null`;
  }

  return baseType;
}

/**
 * Gets the base TypeScript type for a field
 */
function getBaseType(field: FieldDefinition): string {
  switch (field.type) {
    case 'string':
      return 'string';

    case 'number':
      return 'number';

    case 'boolean':
      return 'boolean';

    case 'date':
      return 'Date';

    case 'array': {
      const validations = field.validations as ArrayValidations;
      const itemType = getArrayItemType(validations.itemType);
      return `${itemType}[]`;
    }

    case 'enum': {
      const validations = field.validations as EnumValidations;
      if (validations.values.length === 0) {
        return 'never';
      }
      return validations.values.map((v) => `'${escapeString(v)}'`).join(' | ');
    }

    default:
      return 'unknown';
  }
}

/**
 * Gets TypeScript type for array item
 */
function getArrayItemType(itemType: string): string {
  switch (itemType) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'Date';
    default:
      return 'unknown';
  }
}

/**
 * Escapes special characters in strings
 */
function escapeString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Generates TypeScript using z.infer (for use with Zod schema)
 */
export function generateInferredType(
  schema: SchemaDefinition,
  config: OutputConfig
): string {
  const { semicolons, includeComments, includeExports, schemaNameSuffix, typeNameSuffix } = config;
  const semi = semicolons ? ';' : '';
  const schemaName = `${schema.name}${schemaNameSuffix}`;
  const typeName = `${schema.name}${typeNameSuffix}`;
  const exportKeyword = includeExports ? 'export ' : '';

  const lines: string[] = [];

  if (includeComments && schema.description) {
    lines.push('/**');
    lines.push(` * ${schema.description}`);
    lines.push(` * Inferred from ${schemaName}`);
    lines.push(' */');
  }

  lines.push(`${exportKeyword}type ${typeName} = z.infer<typeof ${schemaName}>${semi}`);

  return lines.join('\n');
}

/**
 * Generates a complete TypeScript module with both approaches
 */
export function generateTypeModule(
  schema: SchemaDefinition,
  config: OutputConfig
): string {
  const lines: string[] = [];

  // Add explicit interface/type
  lines.push('// Explicit TypeScript type');
  lines.push(generateTypeScript(schema, config));
  lines.push('');

  // Add inferred type comment
  lines.push('// Alternative: Inferred from Zod schema');
  lines.push(`// ${generateInferredType(schema, { ...config, includeComments: false })}`);

  return lines.join('\n');
}
