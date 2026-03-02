

## Plan

Two tasks:

### 1. Change password immediately (edge function)
Same approach as before — create a temporary edge function that uses the admin API to update the password for `david.shadrake@gmail.com`. Will use the `TEMP_NEW_PASSWORD` secret to collect the new password securely, execute the function, then clean up.

### 2. Fix the reset password page

**Root cause from auth logs:** The Supabase `/verify` endpoint successfully processes the recovery token and redirects to `/reset-password` with tokens in the URL hash. The Supabase JS client then automatically processes those hash tokens and establishes a session. However, the current page logic has a race condition — it checks the hash *before* the Supabase client has consumed it, and the `onAuthStateChange` listener may fire before or after the component mounts.

**Fix approach:** Simplify the detection logic. Instead of trying to parse hash fragments manually, rely on two things:
1. The `PASSWORD_RECOVERY` event from `onAuthStateChange` (primary)
2. A fallback check via `supabase.auth.getSession()` — if a session exists when the page loads, the recovery flow already completed
3. PKCE `code` parameter handling (keep as-is)
4. Increase timeout to 6 seconds to give the Supabase client more time to process the redirect

Additionally, also listen for `SIGNED_IN` event combined with checking that we're on the reset-password page (Supabase sometimes fires `SIGNED_IN` instead of `PASSWORD_RECOVERY` after the implicit recovery flow).

**Changes in `src/pages/ResetPassword.tsx`:**
- Add `getSession()` check — if a session already exists on mount, mark as valid
- Listen for both `PASSWORD_RECOVERY` and `SIGNED_IN` events
- Increase timeout to 6 seconds
- Keep hash check and PKCE code handling as fallbacks

