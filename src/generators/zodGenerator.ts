import type {
  ArrayValidations,
  DateValidations,
  EnumValidations,
  FieldDefinition,
  NumberValidations,
  OutputConfig,
  SchemaDefinition,
  StringValidations,
} from '@/types/schema.types';

/**
 * Generates Zod schema code from a SchemaDefinition
 */
export function generateZodSchema(
  schema: SchemaDefinition,
  config: OutputConfig
): string {
  const lines: string[] = [];
  const { semicolons, includeComments, includeExports, schemaNameSuffix } = config;
  const semi = semicolons ? ';' : '';
  const schemaName = `${schema.name}${schemaNameSuffix}`;

  // Import statement
  lines.push(`import { z } from 'zod'${semi}`);
  lines.push('');

  // Schema description comment
  if (includeComments && schema.description) {
    lines.push('/**');
    lines.push(` * ${schema.description}`);
    lines.push(' */');
  }

  // Schema declaration
  const exportKeyword = includeExports ? 'export ' : '';
  lines.push(`${exportKeyword}const ${schemaName} = z.object({`);

  // Generate fields
  schema.fields.forEach((field, index) => {
    const fieldCode = generateFieldCode(field);
    const isLast = index === schema.fields.length - 1;
    const comma = isLast ? '' : ',';

    if (includeComments && field.description) {
      lines.push(`  /** ${field.description} */`);
    }

    lines.push(`  ${field.name}: ${fieldCode}${comma}`);
  });

  lines.push(`})${semi}`);

  return lines.join('\n');
}

/**
 * Generates Zod code for a single field
 */
function generateFieldCode(field: FieldDefinition): string {
  let code = generateTypeCode(field);

  // Handle nullable
  if (field.nullable) {
    code += '.nullable()';
  }

  // Handle optional
  if (!field.required) {
    code += '.optional()';
  }

  // Handle default value
  if (field.defaultValue !== undefined && field.defaultValue !== '') {
    const defaultVal = formatDefaultValue(field);
    if (defaultVal) {
      code += `.default(${defaultVal})`;
    }
  }

  return code;
}

/**
 * Generates Zod type code based on field type
 */
function generateTypeCode(field: FieldDefinition): string {
  switch (field.type) {
    case 'string':
      return generateStringCode(field.validations as StringValidations);
    case 'number':
      return generateNumberCode(field.validations as NumberValidations);
    case 'boolean':
      return 'z.boolean()';
    case 'date':
      return generateDateCode(field.validations as DateValidations);
    case 'array':
      return generateArrayCode(field.validations as ArrayValidations);
    case 'enum':
      return generateEnumCode(field.validations as EnumValidations);
    default:
      return 'z.unknown()';
  }
}

/**
 * Generates Zod string schema with validations
 */
function generateStringCode(validations: StringValidations): string {
  const methods: string[] = ['z.string()'];

  // Length validations
  if (validations.length !== undefined) {
    methods.push(`.length(${validations.length})`);
  } else {
    if (validations.min !== undefined) {
      methods.push(`.min(${validations.min})`);
    }
    if (validations.max !== undefined) {
      methods.push(`.max(${validations.max})`);
    }
  }

  // Format validations
  if (validations.email) {
    methods.push('.email()');
  }
  if (validations.url) {
    methods.push('.url()');
  }
  if (validations.uuid) {
    methods.push('.uuid()');
  }
  if (validations.cuid) {
    methods.push('.cuid()');
  }

  // Pattern validations
  if (validations.regex) {
    methods.push(`.regex(/${validations.regex}/)`);
  }
  if (validations.startsWith) {
    methods.push(`.startsWith('${escapeString(validations.startsWith)}')`);
  }
  if (validations.endsWith) {
    methods.push(`.endsWith('${escapeString(validations.endsWith)}')`);
  }
  if (validations.includes) {
    methods.push(`.includes('${escapeString(validations.includes)}')`);
  }

  // Transformations
  if (validations.trim) {
    methods.push('.trim()');
  }
  if (validations.toLowerCase) {
    methods.push('.toLowerCase()');
  }
  if (validations.toUpperCase) {
    methods.push('.toUpperCase()');
  }

  return methods.join('');
}

/**
 * Generates Zod number schema with validations
 */
function generateNumberCode(validations: NumberValidations): string {
  const methods: string[] = ['z.number()'];

  // Type validations
  if (validations.int) {
    methods.push('.int()');
  }
  if (validations.finite) {
    methods.push('.finite()');
  }

  // Range validations
  if (validations.min !== undefined) {
    methods.push(`.min(${validations.min})`);
  }
  if (validations.max !== undefined) {
    methods.push(`.max(${validations.max})`);
  }
  if (validations.multipleOf !== undefined) {
    methods.push(`.multipleOf(${validations.multipleOf})`);
  }

  // Sign validations
  if (validations.positive) {
    methods.push('.positive()');
  }
  if (validations.nonnegative) {
    methods.push('.nonnegative()');
  }
  if (validations.negative) {
    methods.push('.negative()');
  }
  if (validations.nonpositive) {
    methods.push('.nonpositive()');
  }

  return methods.join('');
}

/**
 * Generates Zod date schema with validations
 */
function generateDateCode(validations: DateValidations): string {
  const methods: string[] = ['z.date()'];

  if (validations.min) {
    methods.push(`.min(new Date('${validations.min}'))`);
  }
  if (validations.max) {
    methods.push(`.max(new Date('${validations.max}'))`);
  }

  return methods.join('');
}

/**
 * Generates Zod array schema with validations
 */
function generateArrayCode(validations: ArrayValidations): string {
  // Generate item type
  const itemType = generateItemTypeCode(validations.itemType);
  const methods: string[] = [`z.array(${itemType})`];

  // Length validations
  if (validations.nonempty) {
    methods.push('.nonempty()');
  } else if (validations.length !== undefined) {
    methods.push(`.length(${validations.length})`);
  } else {
    if (validations.min !== undefined) {
      methods.push(`.min(${validations.min})`);
    }
    if (validations.max !== undefined) {
      methods.push(`.max(${validations.max})`);
    }
  }

  return methods.join('');
}

/**
 * Generates Zod type code for array item type
 */
function generateItemTypeCode(itemType: string): string {
  switch (itemType) {
    case 'string':
      return 'z.string()';
    case 'number':
      return 'z.number()';
    case 'boolean':
      return 'z.boolean()';
    case 'date':
      return 'z.date()';
    default:
      return 'z.unknown()';
  }
}

/**
 * Generates Zod enum schema
 */
function generateEnumCode(validations: EnumValidations): string {
  if (validations.values.length === 0) {
    return 'z.never()';
  }

  const values = validations.values.map((v) => `'${escapeString(v)}'`).join(', ');
  return `z.enum([${values}])`;
}

/**
 * Formats default value based on field type
 */
function formatDefaultValue(field: FieldDefinition): string | null {
  const { type, defaultValue } = field;

  if (defaultValue === undefined || defaultValue === '') {
    return null;
  }

  switch (type) {
    case 'string':
      return `'${escapeString(defaultValue)}'`;
    case 'number':
      return defaultValue;
    case 'boolean':
      return defaultValue.toLowerCase() === 'true' ? 'true' : 'false';
    case 'date':
      return `new Date('${defaultValue}')`;
    case 'enum':
      return `'${escapeString(defaultValue)}'`;
    case 'array':
      return '[]';
    default:
      return null;
  }
}

/**
 * Escapes special characters in strings
 */
function escapeString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Generates the full module with schema and type export
 */
export function generateFullModule(
  schema: SchemaDefinition,
  config: OutputConfig
): string {
  const lines: string[] = [];
  const { semicolons, includeExports, includeComments, schemaNameSuffix, typeNameSuffix, typeStyle } = config;
  const semi = semicolons ? ';' : '';
  const schemaName = `${schema.name}${schemaNameSuffix}`;
  const typeName = `${schema.name}${typeNameSuffix}`;
  const exportKeyword = includeExports ? 'export ' : '';

  // Generate schema
  lines.push(generateZodSchema(schema, config));
  lines.push('');

  // Generate type based on typeStyle option
  if (typeStyle === 'infer') {
    // Use z.infer
    if (includeComments && schema.description) {
      lines.push('/**');
      lines.push(` * ${schema.description}`);
      lines.push(` * Inferred from ${schemaName}`);
      lines.push(' */');
    }
    lines.push(`${exportKeyword}type ${typeName} = z.infer<typeof ${schemaName}>${semi}`);
  } else if (typeStyle === 'interface') {
    // Generate explicit interface
    if (includeComments && schema.description) {
      lines.push('/**');
      lines.push(` * ${schema.description}`);
      lines.push(' */');
    }
    lines.push(`${exportKeyword}interface ${typeName} {`);
    schema.fields.forEach((field) => {
      if (includeComments && field.description) {
        lines.push(`  /** ${field.description} */`);
      }
      const typeCode = getTypeScriptType(field);
      const optional = !field.required ? '?' : '';
      lines.push(`  ${field.name}${optional}: ${typeCode}${semi}`);
    });
    lines.push('}');
  } else {
    // Generate explicit type alias
    if (includeComments && schema.description) {
      lines.push('/**');
      lines.push(` * ${schema.description}`);
      lines.push(' */');
    }
    lines.push(`${exportKeyword}type ${typeName} = {`);
    schema.fields.forEach((field) => {
      if (includeComments && field.description) {
        lines.push(`  /** ${field.description} */`);
      }
      const typeCode = getTypeScriptType(field);
      const optional = !field.required ? '?' : '';
      lines.push(`  ${field.name}${optional}: ${typeCode}${semi}`);
    });
    lines.push(`}${semi}`);
  }

  return lines.join('\n');
}

/**
 * Gets the TypeScript type string for a field
 */
function getTypeScriptType(field: FieldDefinition): string {
  let baseType: string;

  switch (field.type) {
    case 'string':
      baseType = 'string';
      break;
    case 'number':
      baseType = 'number';
      break;
    case 'boolean':
      baseType = 'boolean';
      break;
    case 'date':
      baseType = 'Date';
      break;
    case 'array': {
      const validations = field.validations as ArrayValidations;
      const itemType = getArrayItemTypeScript(validations.itemType);
      baseType = `${itemType}[]`;
      break;
    }
    case 'enum': {
      const validations = field.validations as EnumValidations;
      if (validations.values.length === 0) {
        baseType = 'never';
      } else {
        baseType = validations.values.map((v) => `'${escapeString(v)}'`).join(' | ');
      }
      break;
    }
    default:
      baseType = 'unknown';
  }

  // Handle nullable
  if (field.nullable) {
    baseType = `${baseType} | null`;
  }

  return baseType;
}

/**
 * Gets TypeScript type for array item
 */
function getArrayItemTypeScript(itemType: string): string {
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
