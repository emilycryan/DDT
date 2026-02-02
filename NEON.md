# DDT Neon Database

**Neon org:** `org-jolly-block-94745771`  
**Neon project:** `rapid-hill-84900386`

Use this project for the DDT app’s PostgreSQL (programs, program_locations, program_details, etc.).

## Connect the app

1. In [Neon Console](https://console.neon.tech), open org **org-jolly-block-94745771** → project **rapid-hill-84900386**.
2. Click **Connect** and choose your branch (e.g. **main**) and database.
3. Copy the **pooled** connection string (URI).
4. In this repo, create or edit `DDT/.env.local`:
   ```bash
   DATABASE_URL=postgresql://USER:PASSWORD@ep-xxxxx-pooler.REGION.aws.neon.tech/DATABASE?sslmode=require
   ```
   Paste your copied URL as the value (ensure it includes `?sslmode=require` if Neon didn’t add it).
5. Restart the API: from `DDT/`, run `npm run dev:api` (or `npm run dev`).

## Connect in Cursor

1. Open the **Neon** view in the Cursor sidebar.
2. Sign in to Neon if needed.
3. Select org **org-jolly-block-94745771** → project **rapid-hill-84900386**.
4. Connect to the branch/database you use for DDT.
5. Use the extension to browse tables, run SQL, or copy the connection string into `.env.local`.

## Console link

- **Neon Console:** https://console.neon.tech  
- Navigate: your org → project **rapid-hill-84900386**.
