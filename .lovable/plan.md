

## Problem

The reset password page immediately shows "Invalid or expired reset link" because:

1. **The page defaults to `isValidSession = false`** and renders the error state before the auth system has time to process the recovery tokens from the URL.
2. **PKCE flow handling is missing.** Supabase's newer auth uses a `code` query parameter (not just hash fragments). The page only checks for `type=recovery` in the URL hash, which may not be present.
3. **Race condition:** The `PASSWORD_RECOVERY` auth event fires asynchronously, but the component already rendered the "invalid" view before it arrives.

## Fix

Rework the `ResetPassword` component:

1. **Add a `checking` loading state** (default `true`) so the page shows a spinner/loading indicator instead of the "invalid" error while tokens are being processed.
2. **Handle the PKCE `code` query parameter.** If `?code=...` is present in the URL, call `supabase.auth.exchangeCodeForSession(code)` to complete the token exchange before showing the form.
3. **Keep the existing hash check and `PASSWORD_RECOVERY` listener** as fallbacks.
4. **Set a timeout** (~3 seconds) — if neither the hash check, code exchange, nor the auth event fires by then, show the "invalid" message.

### Summary of changes in `src/pages/ResetPassword.tsx`:
- Add `isChecking` state, initially `true`, to show a loading state instead of the error
- In the `useEffect`, parse `window.location.search` for a `code` param and call `exchangeCodeForSession` if found
- After all checks complete (hash, code exchange, auth event, or timeout), set `isChecking` to `false`
- Render a loading indicator while `isChecking` is true

