# Project Context for Claude AI

## Project Overview

This is a Next.js monorepo project built with TypeScript, using modern web development practices and tools.

## Package Manager

- **pnpm** is the package manager for this project
- Always use `pnpm` commands instead of `npm` or `yarn`
- Workspaces are managed through pnpm workspace configuration

## Tech Stack

### Core Framework

- **Next.js** - React framework with App Router
- **TypeScript** - Primary language for type safety
- **React** - UI library

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
  - Authentication
  - PostgreSQL database
  - Real-time subscriptions
  - Storage
  - Edge Functions

### Forms & Validation

- **React Hook Form** - Form state management
- **Zod** - Schema validation and type inference
- Always use Zod schemas for form validation
- Leverage type inference from Zod schemas

### UI Components

- **shadcn/ui** - Component registry (not a component library)
- Components are copied into the project and can be customized
- Typically located in `@/components/ui`
- Built on top of Radix UI primitives
- Styled with Tailwind CSS

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- Follow Tailwind conventions and use utility classes

## Code Style & Conventions

### TypeScript Guidelines

- **Prefer `type` over `interface`** for type definitions
- Use proper TypeScript types throughout the codebase
- **Avoid `any` type** - only use in inevitable situations where proper typing is genuinely impossible
- Use type inference where possible
- Leverage utility types (`Partial`, `Pick`, `Omit`, `Record`, etc.)

Example:

```typescript
// Preferred ✅
type User = {
  id: string;
  name: string;
  email: string;
};

type UserFormData = Pick<User, 'name' | 'email'>;

// Avoid ❌
interface User {
  id: string;
  name: string;
  email: string;
}

const data: any = fetchData(); // Avoid this
```

### Function Declarations

- **Prefer `function` declarations over `const` arrow functions** where appropriate
- Use function declarations for top-level functions, utilities, and standalone functions
- Arrow functions are acceptable for callbacks, inline functions, and when lexical `this` binding is needed
- React components can use either pattern, but be consistent within the codebase

```typescript
// Preferred for top-level/utility functions ✅
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}

// Acceptable for callbacks and inline functions ✅
const numbers = [1, 2, 3].map((n) => n * 2);

button.addEventListener('click', (e) => {
  handleClick(e);
});

// Avoid for standalone functions ❌
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

**Benefits of function declarations:**

- Hoisted (can be called before declaration)
- More readable for complex functions
- Better stack traces in debugging
- Clear intent for reusable functions

**When to use arrow functions:**

- Array methods (map, filter, reduce, etc.)
- Event handlers and callbacks
- When you need lexical `this` binding
- Short, inline operations
- Inside React components for event handlers

### Form Patterns

Use React Hook Form with Zod for all forms:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handler functions can use arrow syntax for lexical this
  const onSubmit = (data: FormData) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Component Patterns

- Use functional components with hooks
- Follow React Server Components patterns for Next.js App Router
- Distinguish between Server Components and Client Components
- Use `"use client"` directive only when necessary
- Component functions can use either `function` or arrow function syntax (be consistent)

```typescript
// Both styles are acceptable for React components

// Function declaration style
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  return <div>{user?.name}</div>;
}

// Or arrow function style (pick one and be consistent)
export const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);

  return <div>{user?.name}</div>;
};
```

### Supabase Integration

- Use Supabase client for database operations
- Implement Row Level Security (RLS) policies
- Use TypeScript types generated from Supabase schema when possible
- Follow Supabase best practices for authentication and data fetching

Example:

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

const supabase = createClientComponentClient<Database>();

type Profile = Database['public']['Tables']['profiles']['Row'];

// Use function declarations for data fetching utilities
async function fetchUserProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}
```

## File Structure

```
.
├── apps/
│   └── web/               # Next.js application
│       ├── app/           # App Router pages and layouts
│       ├── components/    # React components
│       │   └── ui/        # shadcn/ui components
│       ├── lib/           # Utility functions and shared code
│       ├── types/         # TypeScript type definitions
│       └── public/        # Static assets
├── packages/              # Shared packages (if applicable)
├── package.json
├── pnpm-workspace.yaml
└── turbo.json            # Turborepo config (if using)
```

## Key Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Best Practices

1. **Type Safety**
   - Always define proper types for function parameters and return values
   - Use Zod for runtime validation and type inference
   - Avoid type assertions unless absolutely necessary

2. **Functions**
   - Use `function` declarations for standalone, reusable functions
   - Use arrow functions for callbacks, array methods, and when lexical `this` is needed
   - Be consistent with React component declaration style across the codebase

3. **Forms**
   - Use React Hook Form for all form state management
   - Define Zod schemas for validation
   - Infer TypeScript types from Zod schemas using `z.infer<>`

4. **Component Design**
   - Keep components small and focused
   - Use composition over configuration
   - Leverage shadcn/ui components as building blocks

5. **Error Handling**
   - Implement proper error boundaries
   - Handle async errors appropriately
   - Provide meaningful error messages to users

## When Suggesting Code

- Always use TypeScript with proper typing
- Use `type` declarations instead of `interface`
- Use `function` declarations for standalone functions and utilities
- Use arrow functions appropriately (callbacks, array methods, lexical this)
- Ensure pnpm compatibility in any package.json suggestions
- Follow React Hook Form + Zod patterns for forms
- Use shadcn/ui components where applicable
- Consider Next.js App Router patterns (Server vs Client Components)
- Include Supabase integration patterns when dealing with data
- Avoid using `any` type - provide specific types or use generics

## Notes for Claude

- When creating new components, check if shadcn/ui has a suitable component first
- When working with forms, always scaffold with React Hook Form + Zod
- When suggesting database operations, consider Supabase RLS and best practices
- Respect the monorepo structure and shared package conventions
- Always prefer type inference over explicit typing where TypeScript can infer correctly
- Use function declarations for utility functions, helpers, and business logic
- Use arrow functions for event handlers, callbacks, and array operations
