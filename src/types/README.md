# Types Directory

This directory contains TypeScript type definitions used throughout the application.

## Files

- `api.ts` - Type definitions for API requests and responses
- `axios.d.ts` - Type extensions for Axios
- `dashboard.ts` - Types related to dashboard functionality
- `database.ts` - Database schema type definitions reflecting our PostgreSQL database structure

## Database Types

The `database.ts` file contains TypeScript type definitions that mirror our PostgreSQL database schema. These types are used to ensure type safety when working with data from our API.

Previously, the application was configured to use Supabase, but we've migrated to a direct PostgreSQL connection through our API. The types have been updated to reflect this change while maintaining backward compatibility.

## Usage

Import types from these files as needed:

```typescript
import type { Profile, Course } from '../types/database';
import type { DashboardData } from '../types/dashboard';
import type { APIResponse } from '../types/api';
```

These types help maintain consistency across the application and provide better IDE intellisense.
