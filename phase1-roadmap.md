# Yassi Sho - Phase 1 Roadmap

## Objective
Deliver a clean, detailed, and fully navigable HTML demo of the "Yassi Sho" Phase 1 features, optimized for mobile viewing, to present to the board of trustees.

## Core Rules & Principles
1. **Fallback Rule for Accuracy:** Before writing code for a specific feature, the developer MUST explicitly re-read the specific original instruction file(s) (PDF or Voice) related to that feature to ensure no nuances from the original Persian instructions are lost.
2. **Mobile-First Design:** 99% of traffic will be mobile. The UI/UX MUST be heavily optimized and flawless on mobile devices.
3. **UI/UX Priority:** For sections like the "Deceased", strict adherence to the initial design is not required; visual appeal and user convenience are the highest priorities.
4. **Navigable Demo:** The HTML files must be linked together to allow the board to click through the user journey interactively.
5. **High-Quality Assets:** Use high-quality images (from yaas.org.ir) for the demo.
6. **RTL Compatibility:** Strictly use CSS Logical Properties (e.g., `ps-*`, `me-*`, `inset-inline-start-*`) for all directional styling to ensure perfect Right-to-Left support. Physical directional classes (`ml-*`, `left-*`) are strictly prohibited.

## Key Requirements & Scope Synthesis

### 1. Users & Authentication (OTP)
- **Login/Registration:** Modal-based OTP flow. Registration requires Name, Phone, and Avatar upload with preview. OTP input must be 4 distinct graphic boxes. Login only requires Phone and the 4-digit code.
- **User Profile:** 
  - Manage "Defined Deceased" (List with edit/delete icons).
  - "My Boards" (List of ordered silver boards).
  - User Statistics (Count of deceased, total donation amount, count of boards).
  - Edit user image.

### 2. Deceased Section (Archive & Detail)
- **Archive Page:** Masonry layout (randomized, with one randomly enlarged item). Hovering over an item must reveal the person's name. Includes search by name, date of birth/death. Statistics box (donations, participants, deceased count, memorials). Button to define a new deceased person. Dynamic logic is needed for the random masonry.
- **Detail Page:** Shows personal info (Image, Full Name, DOB, DOD, Creator's Message & Info, Creation Date).
  - **Companions List:** Shows images, total count, and total donated amount.
  - **Memorial Gallery:** Images/video in a box. 'See All' opens a modal with organized media, uploader name, and date.
  - **Upload Memorial:** Modal form with title, file selection, and submit button.
  - **Donation Box:** Shows name, phone, image, and amount (for logged-in users, only show the amount).
- **Define Deceased Form:** Simple mobile-friendly form. Includes Name, DOB, DOD, Creator's message, Image (with preview).
  - **Invite Feature:** Option to invite related people (Name, Phone, Media upload permission toggle) and a specific box for their donation amount.

### 3. Silver Flower Board (Tablo Gol Noghre) Ordering
- **Purpose:** Ordering charity boards instead of natural flowers for funerals (4 different types/prices available).
- **Ordering Flow:** Select board type and quantity -> Input "To" and "From" -> Select/input condolence text (with default list options) -> Input sender's Name & Phone -> Select Mosque (dropdown) -> Input Delivery Date & Time -> View total price and pay.
- **Crucial Feature:** Live visual preview of the board based on user input, matching the physical board's aesthetic and font.

### 4. Charity Projects (طرح ها)
- **Archive Page:** Boxes for various projects (urgent projects visually distinct at the top). Each box includes Image, Title, Short Desc, Required Amount, Collected Amount, and a Progress Bar. Requires pagination.
- **Detail Page:** Includes all archive info + Extra details box, Media Gallery, and a Participants List (Masked phone numbers, amount, and date).

### 5. General Pages & UI Improvements
- **About Us:** Clean design with 3-4 sections telling the story of Yassi Sho and its founder.
- **Contact Us:** Standard form, phone, address, map.
- **Global UI:** Improve the logo. Add a standard footer with trust seals (E-namad), bank logos, and basic links (matching yaas.org.ir).

## Step-by-Step Implementation Plan

### Step 1: Initial HTML/CSS Scaffolding & Navigation
- Review existing `index.html` and assets.
- Setup basic routing structure for all foundational HTML files.
- Implement the global standard footer.
- Ensure the global CSS base uses logical properties for RTL.

### Step 2: Authentication & Profile
- Build the OTP Modal UI (Registration & Login with 4-digit inputs).
- Build the `profile.html` dashboard including stats, "My Boards", and the Deceased management list.

### Step 3: Deceased Section Implementation
- Build `deceased-archive.html` (Masonry layout, hover effects, search, stats).
- Build `deceased-detail.html` (Companions list, gallery modal, donation box).
- Create the detailed "Define Deceased" form with the invitation feature.

### Step 4: Silver Flower Board Ordering System
- Build the `board-order.html` multi-step form.
- Implement the Live Preview Generator logic.

### Step 5: Charity Projects
- Build `projects-archive.html` (Progress bars, urgent styling).
- Build `project-detail.html` (Masked participants list).

### Step 6: General Pages & Refinement
- Build `about.html` and `contact.html`.
- Final UI/UX review for mobile transitions and demo navigability.