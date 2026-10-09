# Jobify

A Next.js 14 (App Router) job portal with Tailwind CSS and Google sign-in (NextAuth).

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Environment variables

| Name | What it is |
| --- | --- |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console > Credentials (OAuth client, type "Web") |
| `NEXTAUTH_SECRET` | Random string. Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your site URL, e.g. `https://your-app.vercel.app` |

In Google Cloud Console, add this Authorized redirect URI:
`<NEXTAUTH_URL>/api/auth/callback/google`

## Accounts and roles

People choose **Job seeker** or **Job poster** on `/signup`, then continue with Google.

| Role | Can do | Cannot do |
| --- | --- | --- |
| Job seeker | Browse, apply (`/apply`), see applications on `/profile` | Post jobs |
| Job poster | Browse, post jobs (`/post`), see posted jobs on `/profile` | Apply |

`/profile`, `/apply` and `/post` require sign-in; `middleware.ts` enforces the role rules.
To switch role, sign out and sign in again with the other choice.

## Deploy on Vercel

1. Push the project to GitHub and import it in Vercel.
2. Add the four environment variables above under Project Settings > Environment Variables.
3. Redeploy.

## Notes

- The role is chosen at sign-in and stored in the session. With no database, nothing stops one Google account from signing in as either role.
- Profile details, applications and posted jobs are saved in the browser (`lib/storage.ts`), not on a server.
- Job data lives in `data.ts`. The apply and post-a-job forms do not save anywhere yet; wire them to an API route or database (see the `TODO` comments in `app/Component/Forms/`).
