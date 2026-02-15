

# Update Form Sender Name

## Overview
Change the sender name on contact form notification emails from "Voltaic Now Website" to "Melia Solar".

## Change

**File:** `supabase/functions/send-contact-email/index.ts`

Update the `from_name` field in the Web3Forms API payload from `"Voltaic Now Website"` to `"Melia Solar"`.

This is a single-line change on the line that reads:
```
from_name: "Voltaic Now Website",
```
Changed to:
```
from_name: "Melia Solar",
```

The backend function will be redeployed automatically after the change.

