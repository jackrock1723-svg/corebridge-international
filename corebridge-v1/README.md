# CoreBridge International — V1

A free-tier, portable public website foundation. It is intentionally not locked to Wix.

## Current V1
- Responsive public website
- Home
- Opportunities + search/filter
- Opportunity detail
- People application form
- Partner inquiry form
- Business inquiry form
- Contact form
- Services
- About
- Supabase database schema
- Local demo mode for forms before Supabase is connected

## $0 deployment path
1. Create a public GitHub repository named `corebridge-international`.
2. Upload the contents of this folder.
3. Enable GitHub Pages from the repository's Pages settings.
4. Your public site can run on the GitHub Pages URL without purchasing hosting.
5. Connect the Supabase project after the public site is live.

GitHub Pages is available on GitHub Free for public repositories. Cloudflare Pages is another free static-hosting option.

## Supabase connection
1. Open your Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Copy the project's public URL and anon key.
4. Put them into `js/site.js`:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
5. Commit the change to GitHub.

Do not put a Supabase service-role key in the website. Only the public anon key belongs in frontend code, protected by Row Level Security policies.

## Next build stage
- Admin authentication
- Admin dashboard
- Live opportunity records from Supabase
- Candidate/partner/business pipelines
- File uploads
- Email/WhatsApp integrations
- AI-assisted matching and screening with human review
