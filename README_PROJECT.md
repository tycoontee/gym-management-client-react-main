# Gym Membership Management System

A complete, full-featured gym membership management application built with React, TypeScript, and Material-UI. This is a single-page application (SPA) with LocalStorage-based persistence for demo purposes.

## Features

### ✅ 15 Complete Pages

**Public Pages:**
1. **Home** - Landing page with hero section, features, statistics, and CTA buttons
2. **About** - Company story, mission, values, and team information
3. **Services** - Membership plans showcase, features comparison, and FAQ
4. **Instructors** - Full instructor directory with photos, specializations, and bios (6 instructors)
5. **Contact** - Contact form, location info, phone, email, and hours
6. **Not Found (404)** - Friendly 404 error page

**Member Pages (Authenticated):**
7. **Dashboard** - Welcome section with membership info, status, action buttons, recent payments
8. **Profile** - Personal information display and edit capability with validation
9. **Payments** - Payment form with card details, amount auto-calculation from membership plan
10. **Payment History** - Complete payment transaction history with filtering and search

**Admin Pages (Admin Only):**
11. **Members** - Admin dashboard for viewing and managing all gym members
12. **Admin Dashboard** - Business metrics (total members, revenue, recent signups/payments)

**Authentication Pages:**
13. **Login** - Email/password authentication with demo credentials
14. **Register** - New member registration with profile creation
15. **Settings** - User settings (password change, notification preferences)

### 🔐 Authentication System
- **LocalStorage-based** user sessions
- Email/password authentication
- User role system (member/admin)
- Protected routes that redirect to login
- Admin-only page protection
- Demo credentials for testing:
  - **Admin**: admin@gym.com / admin123
  - **Member**: john@example.com / password123

### 🏋️ Membership Plans
Three tiered membership options:
- **Basic** - ₦5,000/month
- **Standard** - ₦10,000/month
- **Premium** - ₦20,000/month

Each plan includes specific features displayed in the services page and comparison table.

### 💳 Payment System
- Payment processing with simulated card payment
- Transaction ID generation
- Payment status tracking (paid/pending/overdue)
- Payment history with date range filtering
- Admin revenue tracking and analytics

### 👥 Instructor Directory
- 6 professional instructors with detailed profiles
- Profile photos using randomuser.me API
- Specializations (Weightlifting, Yoga, Cardio, Boxing, CrossFit, Pilates)
- Years of experience
- Direct contact information

### 📱 Responsive Design
- **Mobile-first** approach (xs: <600px)
- **Tablet** optimized (sm: 600px, md: 960px)
- **Desktop** enhanced layouts (lg: 1280px, xl: 1920px)
- Material-UI Grid system for flexible layouts
- Touch-friendly interfaces on mobile
- Hamburger navigation menu on mobile devices

### 🎨 UI/Design System
- **Color Scheme**: Dark navy (#1a1a1a) + Orange accent (#FF6B35)
- **Component Library**: Material-UI v5 with custom theming
- **Typography**: Responsive text sizes and weights
- **Icons**: Material-UI Icons for visual indicators
- **Forms**: Validated input fields with error messages
- **Tables**: DataGrid-style tables with sorting/filtering
- **Cards**: Structured information display

### 🗄️ Data Persistence
- **LocalStorage** for all data (no backend required)
- Auto-initialization with sample data on first load
- CRUD operations for:
  - Users (authentication)
  - Members (profiles and status)
  - Payments (transactions)
  - Membership Plans (offerings)
  - Instructors (directory)

### 🔧 Sample Data Included
- 1 admin user + 5 member accounts
- 8 payment transactions with mixed statuses
- 6 instructors with full profiles
- 3 membership plans with features
- Pre-loaded sample members with various statuses (active/expired/pending)

## Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library with Hooks
- **TypeScript 5.5.3** - Full type safety
- **Vite 5.4.1** - Lightning-fast build tool
- **TanStack Router v1.49.1** - File-based routing (not React Router DOM)

### UI & Styling
- **Material-UI (MUI) v5.16.7** - Complete component library
- **Material-UI Icons** - Icon set
- **Emotion** - CSS-in-JS styling (MUI dependency)

### Utilities & Libraries
- **date-fns 3.6.0** - Date formatting and manipulation
- **Zod 3.23.8** - Schema validation
- **Axios 1.7.4** - HTTP client (for API integration)
- **TanStack React Query** - Server state management
- **Stripe SDK** - Payment processing (for future integration)

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Biome** - Fast code linter
- **Vitest** - Unit testing
- **JSDOM** - DOM testing environment

## Project Structure

```
src/
├── types/
│   └── index.ts              # Global type definitions
├── utils/
│   ├── storage.ts            # LocalStorage utilities
│   └── index.ts              # Utility exports
├── data/
│   └── sample-data.ts        # Sample data initialization
├── context/
│   ├── auth-context.tsx      # Authentication state management
│   ├── snackbar-context.tsx  # Notification system
│   └── index.ts              # Context exports
├── components/
│   ├── navbar.tsx            # Top navigation bar
│   ├── footer.tsx            # Footer component
│   ├── layout.tsx            # Main layout wrapper
│   ├── public-layout.tsx      # Public pages layout
│   ├── loading-animation.tsx  # Loading spinner
│   ├── instructor-card.tsx    # Instructor profile card
│   ├── payment-card.tsx       # Payment display card
│   ├── membership-plan-card.tsx # Plan selection card
│   └── index.ts              # Component exports
├── pages/
│   ├── home.tsx              # Home page
│   ├── about.tsx             # About page
│   ├── services.tsx          # Services/Plans page
│   ├── instructors.tsx       # Instructors page
│   ├── contact.tsx           # Contact page
│   ├── not-found.tsx         # 404 page
│   ├── dashboard.tsx         # Member dashboard
│   ├── profile.tsx           # Member profile
│   ├── payments.tsx          # Payment processing
│   ├── payment-history.tsx   # Payment history
│   ├── members.tsx           # Admin members list
│   ├── admin.tsx             # Admin dashboard
│   └── settings.tsx          # Settings page
├── routes/
│   ├── __root.tsx            # Root route
│   ├── index.tsx             # Home route
│   ├── login.tsx             # Login route
│   ├── about.tsx             # About route
│   ├── services.tsx          # Services route
│   ├── instructors.tsx       # Instructors route
│   ├── contact.tsx           # Contact route
│   ├── register.tsx          # Register route
│   ├── __catch-all.tsx       # 404 catch-all
│   └── _auth/
│       ├── _auth.tsx         # Protected layout
│       ├── _auth.dashboard.tsx
│       ├── _auth.profile.tsx
│       ├── _auth.payment.tsx
│       ├── _auth.payment-history.tsx
│       ├── _auth.members.tsx
│       ├── _auth.admin.tsx
│       ├── _auth.settings.tsx
│       └── _auth.check-in.tsx
├── modules/                  # Feature modules
│   ├── login/
│   │   └── login.page.tsx
│   ├── member/
│   │   ├── register.page.tsx
│   │   ├── register-form.tsx
│   │   ├── members.page.tsx
│   │   ├── member.model.ts
│   │   ├── member.service.ts
│   │   ├── member.repository.ts
│   │   └── __tests__/
│   ├── payment/
│   ├── membership-plan/
│   └── check-in/
├── main.tsx                  # React entry point
├── index.css                 # Global styles
├── vite-env.d.ts            # Vite type declarations
└── routeTree.gen.ts         # Auto-generated route tree
```

## Installation & Setup

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm 7+ or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gym-management-client-react-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server with hot reload

# Build
npm run build           # Compile TypeScript and bundle with Vite

# Preview
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Testing
npm run test            # Run Vitest unit tests
npm run test:watch      # Run tests in watch mode
```

## Demo Credentials

### Admin Account
- **Email**: admin@gym.com
- **Password**: admin123

### Member Accounts
- **Email**: john@example.com
- **Password**: password123

- **Email**: jane@example.com
- **Password**: password123

Additional pre-loaded members available in the system.

## Key Features Explained

### Authentication Flow
1. User lands on login page
2. Enters email/password
3. System validates against LocalStorage user records
4. On success, creates session and stores in LocalStorage
5. Redirects to dashboard
6. Protected routes check session before rendering

### Data Flow
- All data stored in browser's LocalStorage under `storage_keys` namespace
- Sample data auto-initializes on first load
- CRUD operations through `storage.ts` utilities
- No network calls (demo mode)

### Routing Structure
- **Public routes**: Accessible without login
- **Protected routes** (`/_auth/_auth/*`): Require authentication
- **Admin routes**: Additional check for admin role
- **Catch-all route**: 404 page for unknown routes

### Form Validation
- Email format validation
- Password strength requirements
- Phone number validation
- Card details validation
- Custom error messages for each field

## Responsive Breakpoints

```
xs: 0px - 599px      (Mobile phones)
sm: 600px - 959px    (Tablets)
md: 960px - 1279px   (Small desktops)
lg: 1280px - 1919px  (Desktops)
xl: 1920px+          (Large screens)
```

## Performance Considerations

- **Code Splitting**: Routes are lazy-loaded by TanStack Router
- **Image Optimization**: Instructor photos use randomuser.me CDN
- **Bundle Size**: ~1.1MB (unminified) due to MUI and dependencies
- **Caching**: Browser LocalStorage for all data persistence
- **Build Time**: ~40 seconds for production build

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancement Opportunities

1. **Backend Integration**
   - Replace LocalStorage with REST API calls
   - Database for persistent user data
   - Cloud file storage for photos

2. **Payment Processing**
   - Real Stripe/Paystack integration
   - Invoice generation
   - Payment receipts

3. **Features to Add**
   - Email notifications
   - SMS alerts
   - Attendance tracking
   - Class scheduling
   - Trainer assignments
   - Progress tracking

4. **Admin Enhancements**
   - Member search/filtering
   - Bulk actions
   - Report generation
   - Analytics dashboard

5. **Mobile App**
   - React Native version
   - Offline capability
   - Push notifications

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
Update `vite.config.ts` with `base: '/repo-name/'` and deploy `dist` folder.

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Routes not working after adding new files
- The route tree auto-generates on dev server start
- Delete `src/routeTree.gen.ts` and restart dev server
- Check file naming follows TanStack Router convention

### LocalStorage not persisting
- Check browser's privacy/incognito mode
- Verify localStorage is enabled in browser settings
- Check console for storage quota errors

### Build errors with types
- Delete `node_modules/.tsc-cache`
- Run `npm install` again
- Restart IDE TypeScript server

## Support & Contact

For questions or issues:
- Check existing GitHub issues
- Review inline code documentation
- Refer to MUI and TanStack Router official docs

## License

This project is provided as-is for educational and development purposes.

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready
