
# Fix Sitemap for Google Search Console

## Problem
Google Search Console cannot fetch `https://meliasolar.com/sitemap.xml` because the `_redirects` proxy rewrite is not supported by the hosting platform. Instead of receiving XML, Google gets the SPA's 404 HTML page.

The backend function itself works perfectly and returns valid XML with all pages and blog posts.

## Solution

### 1. Update `robots.txt` to point directly to the backend function
Change the Sitemap URL in `public/robots.txt` from:
```
Sitemap: https://meliasolar.com/sitemap.xml
```
to the direct backend function URL so Google can fetch it successfully.

### 2. Add a `/sitemap.xml` route in the React app
Add a small component that redirects visitors to the backend sitemap URL, so anyone navigating to `/sitemap.xml` in a browser is taken to the actual XML.

### 3. Clean up `_redirects`
Remove the non-functional sitemap redirect line from `public/_redirects`.

## After publishing
Re-submit the new sitemap URL in Google Search Console to replace the current broken entry.
