

# Reorder Energy Unit Dropdown

Move "USD/Month" to the first position in the energy unit dropdown on the contact form's energy consumption step.

## Change

**File:** `src/components/ContactFormModal.tsx`

Reorder the three `SelectItem` entries in the energy unit `Select` from:
1. kWh/Month
2. kWh/Year
3. USD/Month

To:
1. USD/Month
2. kWh/Month
3. kWh/Year

Also update the default `energyUnit` value in the initial form state (and the reset function) from `"kWh/Month"` to `"USD/Month"` so it matches the first item by default.

