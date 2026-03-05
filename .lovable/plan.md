

The approved plan has two remaining tasks that need to be implemented:

### 1. Redesign Savings Calculator (`src/components/sections/SavingsCalculator.tsx`)

- **Math**: Solar payment = `currentBill * 0.6`. 25-year savings uses 6% annual compounding utility increase vs locked solar payment.
- **Card 1** → "Your Solar Freedom Plan*" showing `$${Math.round(currentBill * 0.6)}/mo` with subtitle "*Average Payment vs Utility"
- **Card 2** → "25-Year Savings*" with compounding calculation, subtitle "*Based on 6% annual utility increase"
- **Card 3** → Keep environmental impact (trees equivalent)
- Slider subtitle → "Drag the slider to see your savings..."
- Keep slider max at $20,000
- CTA button → "Book Now"
- Remove circular icon containers from cards

### 2. Update Hero stat (`src/components/sections/Hero.tsx`)

- Change `"12K+"` to `"9K+"` (line 104)

