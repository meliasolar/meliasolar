

## Fix: Move Google Analytics Tag to Top of `<head>`

Google Tag Assistant expects the gtag snippet to appear **immediately after the opening `<head>` tag**. Currently it's placed near the bottom of `<head>` (around line 106), after all the preloads, meta tags, and critical CSS. This can cause detection failures.

### Change

**File: `index.html`**
- Remove the GA script block from its current location (lines 106-113)
- Re-insert it immediately after `<meta name="viewport" ...>` on line 5, so it's near the top of `<head>` as Google requires

The final order will be:
```
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" ... />

  <!-- Google tag (gtag.js) -->
  <script async src="...gtag/js?id=G-01Y3F9B3HW"></script>
  <script>...</script>

  <!-- Preloads, meta, styles, etc. -->
</head>
```

No other files need to change.

