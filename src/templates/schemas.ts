import type { TFunction } from 'i18next';

import type { SchemaTemplate } from '@/types/schema.types';

/**
 * Template definition with translation keys
 */
interface TemplateDefinition {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  schema: {
    nameKey: string;
    descriptionKey: string;
    fields: {
      name: string;
      type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'array';
      required: boolean;
      nullable: boolean;
      descriptionKey: string;
      validations: Record<string, unknown>;
    }[];
  };
}

/**
 * Template definitions with translation keys
 */
const templateDefinitions: TemplateDefinition[] = [
  // ===========================================================================
  // User Template
  // ===========================================================================
  {
    id: 'user',
    nameKey: 'schemaTemplates.user.name',
    descriptionKey: 'schemaTemplates.user.description',
    icon: 'User',
    schema: {
      nameKey: 'schemaTemplates.user.schemaName',
      descriptionKey: 'schemaTemplates.user.schemaDescription',
      fields: [
        {
          name: 'id',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.id',
          validations: { uuid: true },
        },
        {
          name: 'email',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.email',
          validations: { email: true },
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.name',
          validations: { min: 2, max: 100 },
        },
        {
          name: 'username',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.username',
          validations: { min: 3, max: 30 },
        },
        {
          name: 'age',
          type: 'number',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.user.fields.age',
          validations: { min: 0, max: 150, int: true },
        },
        {
          name: 'isActive',
          type: 'boolean',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.isActive',
          validations: {},
        },
        {
          name: 'role',
          type: 'enum',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.role',
          validations: { values: ['admin', 'user', 'guest'] },
        },
        {
          name: 'createdAt',
          type: 'date',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.user.fields.createdAt',
          validations: {},
        },
      ],
    },
  },

  // ===========================================================================
  // Product Template
  // ===========================================================================
  {
    id: 'product',
    nameKey: 'schemaTemplates.product.name',
    descriptionKey: 'schemaTemplates.product.description',
    icon: 'Package',
    schema: {
      nameKey: 'schemaTemplates.product.schemaName',
      descriptionKey: 'schemaTemplates.product.schemaDescription',
      fields: [
        {
          name: 'id',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.id',
          validations: { uuid: true },
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.name',
          validations: { min: 1, max: 200 },
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.product.fields.description',
          validations: { max: 2000 },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.price',
          validations: { min: 0, nonnegative: true },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.quantity',
          validations: { min: 0, int: true, nonnegative: true },
        },
        {
          name: 'sku',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.sku',
          validations: { min: 1, max: 50 },
        },
        {
          name: 'category',
          type: 'enum',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.category',
          validations: { values: ['electronics', 'clothing', 'food', 'other'] },
        },
        {
          name: 'tags',
          type: 'array',
          required: false,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.tags',
          validations: { itemType: 'string' },
        },
        {
          name: 'isAvailable',
          type: 'boolean',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.product.fields.isAvailable',
          validations: {},
        },
      ],
    },
  },

  // ===========================================================================
  // Address Template
  // ===========================================================================
  {
    id: 'address',
    nameKey: 'schemaTemplates.address.name',
    descriptionKey: 'schemaTemplates.address.description',
    icon: 'MapPin',
    schema: {
      nameKey: 'schemaTemplates.address.schemaName',
      descriptionKey: 'schemaTemplates.address.schemaDescription',
      fields: [
        {
          name: 'street',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.address.fields.street',
          validations: { min: 1, max: 200 },
        },
        {
          name: 'street2',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.address.fields.street2',
          validations: { max: 100 },
        },
        {
          name: 'city',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.address.fields.city',
          validations: { min: 1, max: 100 },
        },
        {
          name: 'state',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.address.fields.state',
          validations: { min: 1, max: 100 },
        },
        {
          name: 'postalCode',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.address.fields.postalCode',
          validations: { min: 3, max: 20 },
        },
        {
          name: 'country',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.address.fields.country',
          validations: { length: 2 },
        },
      ],
    },
  },

  // ===========================================================================
  // API Response Template
  // ===========================================================================
  {
    id: 'api-response',
    nameKey: 'schemaTemplates.apiResponse.name',
    descriptionKey: 'schemaTemplates.apiResponse.description',
    icon: 'Globe',
    schema: {
      nameKey: 'schemaTemplates.apiResponse.schemaName',
      descriptionKey: 'schemaTemplates.apiResponse.schemaDescription',
      fields: [
        {
          name: 'success',
          type: 'boolean',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.apiResponse.fields.success',
          validations: {},
        },
        {
          name: 'message',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.apiResponse.fields.message',
          validations: { max: 500 },
        },
        {
          name: 'errorCode',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.apiResponse.fields.errorCode',
          validations: {},
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.apiResponse.fields.timestamp',
          validations: {},
        },
      ],
    },
  },

  // ===========================================================================
  // Blog Post Template
  // ===========================================================================
  {
    id: 'blog-post',
    nameKey: 'schemaTemplates.blogPost.name',
    descriptionKey: 'schemaTemplates.blogPost.description',
    icon: 'FileText',
    schema: {
      nameKey: 'schemaTemplates.blogPost.schemaName',
      descriptionKey: 'schemaTemplates.blogPost.schemaDescription',
      fields: [
        {
          name: 'id',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.id',
          validations: { uuid: true },
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.title',
          validations: { min: 1, max: 200 },
        },
        {
          name: 'slug',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.slug',
          validations: { min: 1, max: 200 },
        },
        {
          name: 'content',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.content',
          validations: { min: 1 },
        },
        {
          name: 'excerpt',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.blogPost.fields.excerpt',
          validations: { max: 500 },
        },
        {
          name: 'authorId',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.authorId',
          validations: { uuid: true },
        },
        {
          name: 'status',
          type: 'enum',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.status',
          validations: { values: ['draft', 'published', 'archived'] },
        },
        {
          name: 'tags',
          type: 'array',
          required: false,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.tags',
          validations: { itemType: 'string' },
        },
        {
          name: 'publishedAt',
          type: 'date',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.blogPost.fields.publishedAt',
          validations: {},
        },
        {
          name: 'createdAt',
          type: 'date',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.blogPost.fields.createdAt',
          validations: {},
        },
      ],
    },
  },

  // ===========================================================================
  // Contact Form Template
  // ===========================================================================
  {
    id: 'contact-form',
    nameKey: 'schemaTemplates.contactForm.name',
    descriptionKey: 'schemaTemplates.contactForm.description',
    icon: 'Mail',
    schema: {
      nameKey: 'schemaTemplates.contactForm.schemaName',
      descriptionKey: 'schemaTemplates.contactForm.schemaDescription',
      fields: [
        {
          name: 'name',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.contactForm.fields.name',
          validations: { min: 2, max: 100 },
        },
        {
          name: 'email',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.contactForm.fields.email',
          validations: { email: true },
        },
        {
          name: 'subject',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.contactForm.fields.subject',
          validations: { min: 1, max: 200 },
        },
        {
          name: 'message',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.contactForm.fields.message',
          validations: { min: 10, max: 5000 },
        },
        {
          name: 'phone',
          type: 'string',
          required: false,
          nullable: true,
          descriptionKey: 'schemaTemplates.contactForm.fields.phone',
          validations: { max: 20 },
        },
      ],
    },
  },

  // ===========================================================================
  // Login Credentials Template
  // ===========================================================================
  {
    id: 'login',
    nameKey: 'schemaTemplates.login.name',
    descriptionKey: 'schemaTemplates.login.description',
    icon: 'LogIn',
    schema: {
      nameKey: 'schemaTemplates.login.schemaName',
      descriptionKey: 'schemaTemplates.login.schemaDescription',
      fields: [
        {
          name: 'email',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.login.fields.email',
          validations: { email: true },
        },
        {
          name: 'password',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.login.fields.password',
          validations: { min: 8, max: 100 },
        },
        {
          name: 'rememberMe',
          type: 'boolean',
          required: false,
          nullable: false,
          descriptionKey: 'schemaTemplates.login.fields.rememberMe',
          validations: {},
        },
      ],
    },
  },

  // ===========================================================================
  // Settings/Config Template
  // ===========================================================================
  {
    id: 'settings',
    nameKey: 'schemaTemplates.settings.name',
    descriptionKey: 'schemaTemplates.settings.description',
    icon: 'Settings',
    schema: {
      nameKey: 'schemaTemplates.settings.schemaName',
      descriptionKey: 'schemaTemplates.settings.schemaDescription',
      fields: [
        {
          name: 'theme',
          type: 'enum',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.settings.fields.theme',
          validations: { values: ['light', 'dark', 'system'] },
        },
        {
          name: 'language',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.settings.fields.language',
          validations: { length: 2 },
        },
        {
          name: 'notifications',
          type: 'boolean',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.settings.fields.notifications',
          validations: {},
        },
        {
          name: 'emailDigest',
          type: 'enum',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.settings.fields.emailDigest',
          validations: { values: ['never', 'daily', 'weekly', 'monthly'] },
        },
        {
          name: 'timezone',
          type: 'string',
          required: true,
          nullable: false,
          descriptionKey: 'schemaTemplates.settings.fields.timezone',
          validations: { min: 1, max: 50 },
        },
      ],
    },
  },
];

/**
 * Get translated schema templates
 */
export function getTranslatedTemplates(t: TFunction): SchemaTemplate[] {
  return templateDefinitions.map((def) => ({
    id: def.id,
    name: t(def.nameKey),
    description: t(def.descriptionKey),
    icon: def.icon,
    schema: {
      name: t(def.schema.nameKey),
      description: t(def.schema.descriptionKey),
      fields: def.schema.fields.map((field) => ({
        id: '',
        name: field.name,
        type: field.type,
        required: field.required,
        nullable: field.nullable,
        description: t(field.descriptionKey),
        validations: field.validations,
      })),
    },
  }));
}

/**
 * Get template IDs (doesn't require translation)
 */
export const getTemplateIds = (): string[] => {
  return templateDefinitions.map((t) => t.id);
};

/**
 * Get a translated template by ID
 */
export function getTranslatedTemplateById(t: TFunction, id: string): SchemaTemplate | undefined {
  return getTranslatedTemplates(t).find((template) => template.id === id);
}

/**
 * Legacy export for backward compatibility - uses English keys as fallback
 * @deprecated Use getTranslatedTemplates(t) instead
 */
export const schemaTemplates: SchemaTemplate[] = templateDefinitions.map((def) => ({
  id: def.id,
  name: def.nameKey.split('.').pop() || def.id,
  description: def.descriptionKey,
  icon: def.icon,
  schema: {
    name: def.schema.nameKey.split('.').pop() || def.id,
    description: def.schema.descriptionKey,
    fields: def.schema.fields.map((field) => ({
      id: '',
      name: field.name,
      type: field.type,
      required: field.required,
      nullable: field.nullable,
      description: field.descriptionKey,
      validations: field.validations,
    })),
  },
}));
