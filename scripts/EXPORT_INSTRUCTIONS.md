# Database Export Instructions (Supabase → Neon or other Postgres)

## Prerequisites

1. Set `DATABASE_URL` in `.env.local` in the project root. Works with **Supabase**, **Neon**, or any Postgres:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```
   For **Neon**: use the connection string from Neon Console → Connect (pooled URL recommended), e.g.:
   ```
   DATABASE_URL=postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```

2. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

## Running the Export

Run the export script using npm:

```bash
npm run export-supabase
```

Or directly with node:

```bash
node scripts/export-supabase-data.js
```

## What Gets Exported

The script will create a `supabase-export/` directory in your project root with:

- **`csv/`** - All table data as CSV files
- **`json/`** - All table data as JSON files (for programmatic use)
- **`schema/`** - Individual table schema files
- **`database-schema.json`** - Complete database schema
- **`export-summary.json`** - Summary of the export

## Tables Exported

The script will export all tables from your Supabase database:
- `programs`
- `program_locations`
- `program_details`
- `assessment_results`
- `programs_vector` (if exists)

## Next Steps

1. Review the exported files in `supabase-export/`
2. Use the CSV or JSON files for backup, migration, or analysis as needed

## Troubleshooting

- **Connection Error**: Make sure your `DATABASE_URL` is correct and accessible. For Neon, use the pooled connection string and ensure `?sslmode=require` if needed.
- **Permission Error**: Ensure your database user has SELECT permissions on all tables
- **Empty Tables**: Some tables may be empty - this is normal if you haven't populated them yet
