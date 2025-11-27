# ZodSmith

> A powerful visual builder for creating Zod schemas and TypeScript types with an intuitive drag-and-drop interface.

[![ZodSmith](https://img.shields.io/badge/ZodSmith-Visual%20Schema%20Builder-667eea?style=for-the-badge)](https://github.com/qazuor/zodsmith-builder)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Zod](https://img.shields.io/badge/Zod-4-3068b7?style=flat-square)](https://zod.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Visual Schema Builder](#visual-schema-builder)
  - [Field Types & Validations](#field-types--validations)
  - [Code Generation](#code-generation)
  - [Templates](#templates)
  - [TypeScript Import](#typescript-import)
  - [Schema Management](#schema-management)
  - [Internationalization](#internationalization)
  - [Theming](#theming)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Scripts](#development-scripts)
- [Usage Guide](#usage-guide)
  - [Creating a Schema](#creating-a-schema)
  - [Adding and Configuring Fields](#adding-and-configuring-fields)
  - [Field Options](#field-options)
  - [Configuring Validations](#configuring-validations)
  - [Generating Code](#generating-code)
  - [Output Settings](#output-settings)
  - [Importing from TypeScript](#importing-from-typescript)
  - [Managing Schemas](#managing-schemas)
- [Code Examples](#code-examples)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**ZodSmith** is a web-based visual tool that allows developers to define data models through an intuitive interface and automatically generate production-ready [Zod](https://zod.dev) schemas and TypeScript types. Instead of writing validation schemas by hand, you can visually design your data structures, configure validations, and copy the generated code directly into your projects.

### Why ZodSmith?

- **Faster Development**: Skip the repetitive task of writing Zod schemas manually
- **Visual Feedback**: See your schema structure at a glance with a clean, organized interface
- **Real-time Preview**: Watch the generated code update instantly as you make changes
- **Error Prevention**: The UI prevents invalid configurations and ensures type-safe output
- **Learning Tool**: Great for developers learning Zod's API and validation options
- **Team Collaboration**: Share schema designs by saving and exporting configurations

---

## Features

### Visual Schema Builder

The core of ZodSmith is its visual schema builder, providing an intuitive interface for designing data structures:

- **Drag-and-Drop Field Reordering**: Easily reorganize fields by dragging them to new positions
- **Real-time Code Preview**: See the generated Zod schema and TypeScript types update instantly
- **Field Cards**: Each field displays its type, validation rules, and status at a glance
- **Inline Editing**: Quick-edit field names directly from the field cards
- **Side Panel Editor**: Detailed configuration panel for advanced field options
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Field Types & Validations

ZodSmith supports all common field types with comprehensive validation options:

| Type | Description | Available Validations |
|------|-------------|----------------------|
| **String** | Text values | `min`, `max`, `length` (exact), `email`, `url`, `uuid`, `cuid`, `regex`, `startsWith`, `endsWith`, `includes`, `trim`, `toLowerCase`, `toUpperCase` |
| **Number** | Numeric values | `min`, `max`, `int`, `positive`, `negative`, `nonnegative`, `nonpositive`, `multipleOf`, `finite` |
| **Boolean** | True/false values | No additional validations needed |
| **Date** | Date/time values | `min` (minimum date), `max` (maximum date) |
| **Enum** | Fixed set of values | Define a list of allowed string values |
| **Array** | List of items | `itemType`, `min`, `max`, `length` (exact), `nonempty` |

#### String Validations Detail

| Validation | Description | Example Output |
|------------|-------------|----------------|
| `min(n)` | Minimum length | `.min(3)` |
| `max(n)` | Maximum length | `.max(100)` |
| `length(n)` | Exact length | `.length(10)` |
| `email()` | Valid email format | `.email()` |
| `url()` | Valid URL format | `.url()` |
| `uuid()` | Valid UUID format | `.uuid()` |
| `cuid()` | Valid CUID format | `.cuid()` |
| `regex(pattern)` | Match regex pattern | `.regex(/^[a-z]+$/)` |
| `startsWith(str)` | Must start with | `.startsWith("https://")` |
| `endsWith(str)` | Must end with | `.endsWith(".com")` |
| `includes(str)` | Must contain | `.includes("@")` |
| `trim()` | Trim whitespace | `.trim()` |
| `toLowerCase()` | Convert to lowercase | `.toLowerCase()` |
| `toUpperCase()` | Convert to uppercase | `.toUpperCase()` |

#### Number Validations Detail

| Validation | Description | Example Output |
|------------|-------------|----------------|
| `min(n)` | Minimum value | `.min(0)` |
| `max(n)` | Maximum value | `.max(100)` |
| `int()` | Must be integer | `.int()` |
| `positive()` | Must be > 0 | `.positive()` |
| `negative()` | Must be < 0 | `.negative()` |
| `nonnegative()` | Must be >= 0 | `.nonnegative()` |
| `nonpositive()` | Must be <= 0 | `.nonpositive()` |
| `multipleOf(n)` | Must be divisible by | `.multipleOf(5)` |
| `finite()` | Must be finite | `.finite()` |

### Code Generation

ZodSmith generates three types of output:

1. **Zod Schema**: Complete `z.object()` definition with all validations
2. **TypeScript Type**: Type definition using your preferred style
3. **Full Module**: Combined output with imports and exports

#### Output Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| **Type Style** | Choose how types are generated | `z.infer<typeof Schema>`, `interface`, or `type` |
| **Schema Suffix** | Suffix added to schema name | `User` → `UserSchema` |
| **Type Suffix** | Suffix added to type name | `User` → `User` or `UserType` |
| **Include Exports** | Add `export` keywords | `export const UserSchema = ...` |
| **Include Comments** | Add JSDoc comments | `/** User email address */` |
| **Semicolons** | Use semicolons | Configurable per preference |

### Templates

Get started quickly with 8 predefined templates covering common use cases:

| Template | Description | Fields |
|----------|-------------|--------|
| **User** | User account with authentication | id, email, name, username, age, isActive, role, createdAt |
| **Product** | E-commerce product | id, name, description, price, quantity, sku, category, tags, isAvailable |
| **Address** | Postal address | street, street2, city, state, postalCode, country |
| **API Response** | Standard API wrapper | success, message, errorCode, timestamp |
| **Blog Post** | Content management | id, title, slug, content, excerpt, authorId, status, tags, publishedAt, createdAt |
| **Contact Form** | Contact submission | name, email, subject, message, phone |
| **Login** | Authentication credentials | email, password, rememberMe |
| **Settings** | User preferences | theme, language, notifications, emailDigest, timezone |

All templates are fully internationalized and display in the user's selected language.

### TypeScript Import

Import existing TypeScript interfaces or type definitions and convert them to visual schemas:

**Supported Syntax:**
- `interface Name { ... }`
- `type Name = { ... }`
- Optional fields: `field?: type`
- Nullable fields: `field: type | null`
- Arrays: `field: type[]`
- String literal unions: `field: 'a' | 'b' | 'c'`

### Schema Management

- **Save to Local Storage**: Persist schemas in the browser for later use
- **Load Saved Schemas**: Continue editing previously saved schemas
- **Duplicate Schemas**: Create copies for variations
- **Delete Schemas**: Remove schemas you no longer need
- **Auto-save State**: Current work is preserved between sessions

### Internationalization

ZodSmith supports multiple languages with full UI translation:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | Complete |
| Spanish | `es` | Complete |

The language preference is saved in local storage and persists across sessions.

### Theming

- **Light Mode**: Clean, bright interface for daytime use
- **Dark Mode**: Eye-friendly dark theme for low-light environments
- **System Detection**: Automatically matches your OS preference
- **Persistent Preference**: Your choice is saved and restored

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev) | 19 | UI framework with hooks and concurrent features |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Type-safe development |
| [Vite](https://vite.dev) | 7 | Fast build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first CSS framework |

### UI & Components

| Technology | Purpose |
|------------|---------|
| [shadcn/ui](https://ui.shadcn.com) | High-quality UI component library |
| [Radix UI](https://www.radix-ui.com) | Accessible component primitives |
| [Lucide React](https://lucide.dev) | Beautiful icon library |
| [Motion](https://motion.dev) | Animation library |

### State & Data

| Technology | Purpose |
|------------|---------|
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight state management with persistence |
| [Zod](https://zod.dev) | Schema validation (internal use + generation target) |

### Utilities

| Technology | Purpose |
|------------|---------|
| [dnd-kit](https://dndkit.com) | Drag and drop functionality |
| [i18next](https://www.i18next.com) | Internationalization framework |
| [react-i18next](https://react.i18next.com) | React bindings for i18next |

### Development Tools

| Technology | Purpose |
|------------|---------|
| [Biome](https://biomejs.dev) | Fast linter and formatter |
| [Vitest](https://vitest.dev) | Unit testing framework |
| [Testing Library](https://testing-library.com) | React component testing |

---

## Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/qazuor/zodsmith-builder.git

# Navigate to the project directory
cd zodsmith-builder

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production (TypeScript check + Vite build) |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |
| `pnpm check` | Run linter and formatter together |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:coverage` | Run tests with coverage report |

---

## Usage Guide

### Creating a Schema

There are three ways to create a new schema:

1. **New Schema Button**: Click "New Schema" in the sidebar and enter a name
2. **Use a Template**: Select from the Templates tab for common patterns
3. **Import TypeScript**: Paste an existing interface to convert it

**Best Practice**: Use PascalCase for schema names (e.g., `UserProfile`, `ProductInventory`)

### Adding and Configuring Fields

1. Click the **"Add Field"** button in the schema builder
2. Select a field type from the dropdown (string, number, boolean, date, enum, array)
3. Enter a field name (camelCase recommended, e.g., `firstName`, `createdAt`)
4. The field is added to your schema and selected for editing

### Field Options

Click on any field to open the editor panel with these options:

| Option | Description |
|--------|-------------|
| **Name** | The field's property name in the schema |
| **Type** | Data type (string, number, boolean, date, enum, array) |
| **Description** | Optional description (becomes JSDoc comment) |
| **Required** | If enabled, field must be provided (no `.optional()`) |
| **Nullable** | If enabled, field can be `null` (adds `.nullable()`) |
| **Default Value** | Value used when field is not provided (adds `.default()`) |

### Configuring Validations

Each field type has specific validation options available in the editor panel:

**String Fields:**
- Length constraints (min, max, exact)
- Format validations (email, url, uuid, cuid)
- Pattern matching (regex, startsWith, endsWith, includes)
- Transformations (trim, lowercase, uppercase)

**Number Fields:**
- Range constraints (min, max)
- Type constraints (integer, finite)
- Sign constraints (positive, negative, nonnegative, nonpositive)
- Divisibility (multipleOf)

**Date Fields:**
- Date range (minimum date, maximum date)

**Array Fields:**
- Item type selection
- Length constraints (min, max, exact, nonempty)

**Enum Fields:**
- Define allowed values (comma-separated)

### Generating Code

Click the **code button** (right side of the screen) to open the preview drawer:

1. **Zod Schema Tab**: Shows the `z.object()` definition
2. **TypeScript Tab**: Shows the type/interface definition
3. **Full Module Tab**: Shows complete module with imports

Click the **copy button** to copy any tab's content to your clipboard.

### Output Settings

Click the **gear icon** in the preview header to configure output:

- **Type Style**: Choose between `z.infer`, `interface`, or `type`
- **Schema Suffix**: Text appended to schema name (default: "Schema")
- **Type Suffix**: Text appended to type name (default: empty)
- **Include Exports**: Add `export` keyword to declarations
- **Include Comments**: Add JSDoc comments from field descriptions
- **Semicolons**: Include semicolons at end of statements

### Importing from TypeScript

1. Click the **upload icon** in the Schemas sidebar header
2. Paste your TypeScript interface or type definition
3. Click **"Load Example"** to see supported syntax
4. Click **"Import"** to convert to a visual schema

**Example Input:**
```typescript
interface User {
  id: string;
  email: string;
  name?: string;           // Optional field
  age: number | null;      // Nullable field
  tags: string[];          // Array field
  role: 'admin' | 'user';  // Enum field
  createdAt: Date;
}
```

### Managing Schemas

**Saving:**
- Click **"Save"** to store the current schema in local storage
- Saved schemas appear in the Schemas tab of the sidebar

**Loading:**
- Click on any saved schema to load it into the editor

**Duplicating:**
- Click the menu icon (three dots) on a saved schema
- Select **"Duplicate"** to create a copy

**Deleting:**
- Click the menu icon on a saved schema
- Select **"Delete"** to remove it

---

## Code Examples

### Basic User Schema

**Visual Configuration:**
- Schema Name: `User`
- Fields:
  - `id` (string, required, uuid)
  - `email` (string, required, email)
  - `name` (string, required, min: 2, max: 100)
  - `isActive` (boolean, required)

**Generated Output:**

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
```

### Product Schema with All Features

**Visual Configuration:**
- Schema Name: `Product`
- Fields:
  - `id` (string, required, uuid)
  - `name` (string, required, min: 1, max: 200, trim)
  - `description` (string, optional, nullable, max: 2000)
  - `price` (number, required, min: 0, nonnegative)
  - `quantity` (number, required, int, nonnegative)
  - `category` (enum, required, values: electronics, clothing, food, other)
  - `tags` (array of strings, optional, default: [])
  - `isAvailable` (boolean, required, default: true)

**Generated Output:**

```typescript
import { z } from 'zod';

/**
 * Product Schema
 * E-commerce product information
 */
export const ProductSchema = z.object({
  /** Product unique identifier */
  id: z.string().uuid(),
  /** Product name */
  name: z.string().min(1).max(200).trim(),
  /** Product description */
  description: z.string().max(2000).nullable().optional(),
  /** Product price in cents */
  price: z.number().min(0).nonnegative(),
  /** Available quantity */
  quantity: z.number().int().nonnegative(),
  /** Product category */
  category: z.enum(['electronics', 'clothing', 'food', 'other']),
  /** Product tags */
  tags: z.array(z.string()).default([]),
  /** Whether product is available */
  isAvailable: z.boolean().default(true),
});

export type Product = z.infer<typeof ProductSchema>;
```

### API Response Wrapper

**Visual Configuration:**
- Schema Name: `ApiResponse`
- Fields:
  - `success` (boolean, required)
  - `data` (string, optional, nullable) - Note: for actual use, this would be generic
  - `message` (string, optional)
  - `errorCode` (string, optional, nullable)
  - `timestamp` (date, required)

**Generated Output:**

```typescript
import { z } from 'zod';

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.string().nullable().optional(),
  message: z.string().optional(),
  errorCode: z.string().nullable().optional(),
  timestamp: z.date(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
```

---

## Project Structure

```
zodsmith-builder/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── animate-ui/        # Animated UI components
│   │   │   ├── components/    # Complex animated components
│   │   │   ├── icons/         # Animated icons
│   │   │   └── primitives/    # Animation primitives
│   │   ├── builder/           # Schema builder components
│   │   │   ├── SchemaBuilder.tsx    # Main builder container
│   │   │   ├── FieldList.tsx        # Sortable field list
│   │   │   ├── FieldCard.tsx        # Individual field display
│   │   │   ├── FieldEditor.tsx      # Field configuration panel
│   │   │   ├── AddFieldButton.tsx   # Add field dropdown
│   │   │   └── validations/         # Type-specific validation forms
│   │   │       ├── StringValidations.tsx
│   │   │       ├── NumberValidations.tsx
│   │   │       ├── DateValidations.tsx
│   │   │       ├── ArrayValidations.tsx
│   │   │       └── EnumValidations.tsx
│   │   ├── preview/           # Code preview components
│   │   │   ├── PreviewDrawer.tsx    # Slide-out preview panel
│   │   │   ├── CodeBlock.tsx        # Syntax-highlighted code display
│   │   │   └── OutputSettings.tsx   # Generation settings popover
│   │   ├── sidebar/           # Sidebar components
│   │   │   ├── Sidebar.tsx          # Main sidebar container
│   │   │   ├── SchemaList.tsx       # Saved schemas list
│   │   │   ├── TemplateList.tsx     # Template selection list
│   │   │   ├── NewSchemaDialog.tsx  # Create schema modal
│   │   │   ├── ImportDialog.tsx     # TypeScript import modal
│   │   │   └── MobileMenu.tsx       # Mobile navigation
│   │   ├── common/            # Shared components
│   │   │   ├── CopyButton.tsx       # Copy to clipboard button
│   │   │   ├── HelpDialog.tsx       # Help/documentation modal
│   │   │   ├── LanguageSelector.tsx # Language picker
│   │   │   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   │   │   └── ThemeProvider.tsx    # Theme context provider
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx           # App header
│   │   │   ├── Footer.tsx           # App footer
│   │   │   └── MainLayout.tsx       # Main layout wrapper
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       └── ... (more UI primitives)
│   ├── generators/            # Code generation logic
│   │   ├── index.ts                 # Generator exports
│   │   ├── zodGenerator.ts          # Zod schema generation
│   │   └── typeGenerator.ts         # TypeScript type generation
│   ├── store/                 # State management
│   │   └── zodsmith.store.ts        # Zustand store with persistence
│   ├── templates/             # Predefined schema templates
│   │   └── schemas.ts               # Template definitions
│   ├── types/                 # TypeScript type definitions
│   │   └── schema.types.ts          # Schema, field, validation types
│   ├── i18n/                  # Internationalization
│   │   ├── index.ts                 # i18n configuration
│   │   └── locales/
│   │       ├── en.json              # English translations
│   │       └── es.json              # Spanish translations
│   ├── config/                # Application configuration
│   │   └── site.config.ts           # Site-wide settings
│   ├── icons/                 # Custom SVG icons
│   ├── lib/                   # Utility functions
│   │   └── utils.ts                 # Helper functions (cn, etc.)
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind
├── test/                      # Test files
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── vitest.config.ts           # Vitest configuration
├── biome.json                 # Biome linter/formatter config
├── tailwind.config.ts         # Tailwind configuration
└── components.json            # shadcn/ui configuration
```

---

## Deployment

### Building for Production

```bash
# Create optimized production build
pnpm build

# Preview the build locally
pnpm preview
```

The build output will be in the `dist/` directory.

### Deployment Platforms

ZodSmith is a static site and can be deployed to any static hosting platform:

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
1. Update `vite.config.ts` with your base path
2. Build the project
3. Deploy the `dist` folder to GitHub Pages

**Docker:**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Browser Support

ZodSmith supports all modern browsers:

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

**Note**: Internet Explorer is not supported.

---

## Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues

- Use the [GitHub Issues](https://github.com/qazuor/zodsmith-builder/issues) page
- Include browser version and OS
- Provide steps to reproduce the issue
- Include screenshots if applicable

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test:run`)
5. Run linter (`pnpm check`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Biome handles formatting)
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

### Adding a New Language

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Translate all strings
4. Add the language to `siteConfig.languages` in `src/config/site.config.ts`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**qazuor** - Full-stack developer from Entre Rios, Argentina

- Website: [qazuor.com](https://qazuor.com)
- GitHub: [@qazuor](https://github.com/qazuor)
- LinkedIn: [qazuor](https://linkedin.com/in/qazuor)

### Support

If you find ZodSmith useful, consider:

- Starring the repository on GitHub
- [Buying me a coffee](https://buymeacoffee.com/qazuor)
- Sharing it with others

---

<p align="center">
  Built with React, TypeScript, Tailwind CSS, and Zod
</p>
