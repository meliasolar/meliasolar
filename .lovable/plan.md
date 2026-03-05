

## Updated Plan

The savings calculator redesign and hero stat update are **already completed**. Here is the full current plan with the new task added:

### ~~1. Redesign Savings Calculator~~ ✓ DONE
### ~~2. Update Hero stat ("12K+" → "9K+")~~ ✓ DONE

### 3. Remove 3 project images from carousel, projects page, and filesystem

**`src/components/sections/PortfolioCarousel.tsx`**
- Remove entries for `project-7.webp`, `project-5.webp`, `project-8.webp` from `projectImages` array

**`src/pages/Projects.tsx`**
- Remove static path variables `project5`, `project7`, `project8`
- Remove corresponding entries from `projects` array ("Luxury Estate Energy System", "Multi-Roof Solar System", "Suburban Home Solar")

**Delete files:**
- `public/images/portfolio/project-5.webp`
- `public/images/portfolio/project-7.webp`
- `public/images/portfolio/project-8.webp`

