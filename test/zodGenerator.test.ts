import { describe, expect, it } from 'vitest';
import { generateZodSchema, generateFullModule } from '@/generators/zodGenerator';
import type { SchemaDefinition, OutputConfig } from '@/types/schema.types';

const defaultConfig: OutputConfig = {
  semicolons: true,
  includeComments: true,
  includeExports: true,
  schemaNameSuffix: 'Schema',
  typeNameSuffix: '',
  typeStyle: 'infer',
};

const createTestSchema = (fields: SchemaDefinition['fields']): SchemaDefinition => ({
  id: 'test-id',
  name: 'User',
  description: 'A user schema',
  fields,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe('generateZodSchema', () => {
  it('generates a basic string field', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'name',
        type: 'string',
        required: true,
        nullable: false,
        validations: {},
      },
    ]);

    const result = generateZodSchema(schema, defaultConfig);

    expect(result).toContain("import { z } from 'zod';");
    expect(result).toContain('export const UserSchema = z.object({');
    expect(result).toContain('name: z.string()');
  });

  it('generates optional fields correctly', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'nickname',
        type: 'string',
        required: false,
        nullable: false,
        validations: {},
      },
    ]);

    const result = generateZodSchema(schema, defaultConfig);

    expect(result).toContain('z.string().optional()');
  });

  it('generates nullable fields correctly', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'middleName',
        type: 'string',
        required: true,
        nullable: true,
        validations: {},
      },
    ]);

    const result = generateZodSchema(schema, defaultConfig);

    expect(result).toContain('z.string().nullable()');
  });

  it('generates number validations', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'age',
        type: 'number',
        required: true,
        nullable: false,
        validations: { min: 0, max: 150, int: true },
      },
    ]);

    const result = generateZodSchema(schema, defaultConfig);

    expect(result).toContain('z.number().int().min(0).max(150)');
  });

  it('generates enum fields', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'status',
        type: 'enum',
        required: true,
        nullable: false,
        validations: { values: ['active', 'inactive', 'pending'] },
      },
    ]);

    const result = generateZodSchema(schema, defaultConfig);

    expect(result).toContain("z.enum(['active', 'inactive', 'pending'])");
  });
});

describe('generateFullModule', () => {
  it('generates schema with infer type style', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'name',
        type: 'string',
        required: true,
        nullable: false,
        validations: {},
      },
    ]);

    const result = generateFullModule(schema, { ...defaultConfig, typeStyle: 'infer' });

    expect(result).toContain('export type User = z.infer<typeof UserSchema>;');
  });

  it('generates schema with interface type style', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'name',
        type: 'string',
        required: true,
        nullable: false,
        validations: {},
      },
    ]);

    const result = generateFullModule(schema, { ...defaultConfig, typeStyle: 'interface' });

    expect(result).toContain('export interface User {');
    expect(result).toContain('name: string;');
  });

  it('generates schema with type alias style', () => {
    const schema = createTestSchema([
      {
        id: 'f1',
        name: 'name',
        type: 'string',
        required: true,
        nullable: false,
        validations: {},
      },
    ]);

    const result = generateFullModule(schema, { ...defaultConfig, typeStyle: 'type' });

    expect(result).toContain('export type User = {');
    expect(result).toContain('name: string;');
  });
});
