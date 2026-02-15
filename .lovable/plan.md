

# Update Email Address Sitewide

## Overview
Replace all instances of `meliaking@voltaicnow.com` with `projects@meliasolar.com` across the entire site.

## Files to Update (5 files)

| File | Change |
|------|--------|
| `src/components/FloatingContactButtons.tsx` | Update `mailto:` link |
| `src/components/layout/Footer.tsx` | Update `mailto:` link and visible email text |
| `src/components/sections/Contact.tsx` | Update `mailto:` link and visible email text |
| `src/components/seo/LocalBusinessSchema.tsx` | Update `email` field in structured data |
| `src/pages/About.tsx` | Update `mailto:` link |

## Contact Form (Web3Forms)
The contact form submissions are routed through Web3Forms using an access key. The recipient email is configured in your Web3Forms account, not in the site code. You will need to log into your Web3Forms dashboard and update the notification email to `projects@meliasolar.com` so form submissions go to the new address.

## Summary
- 5 files updated with the new email
- No backend code changes needed
- Web3Forms account update needed separately for form submissions

