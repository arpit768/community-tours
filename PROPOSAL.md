# Project Proposal: Community Tours and Travels Platform

**Document Version:** 1.0
**Date:** March 2026
**Prepared by:** Techkera Team 
**Client:** Community Tours and Travels Pvt. Ltd., Kathmandu, Nepal

---

## 1. Executive Summary

Community Tours and Travels is a full-stack web application designed to digitize and streamline the tour booking experience for Himalayan travel packages. The platform connects travelers with curated tour packages while providing internal tools for staff verification and administrative oversight. The system supports three distinct user roles — Traveler, Staff, and Admin — each with dedicated dashboards, workflows, and access controls.


---

## 2. Problem Statement

The Nepal tourism industry, particularly Himalayan trekking and tour operators, still relies heavily on manual booking processes, phone inquiries, and paper-based record keeping. This creates:

- Difficulty for travelers to discover and compare tour packages online
- No centralized system for managing bookings and availability
- Lack of a tour quality verification mechanism before packages go live
- Inability for management to track revenue, bookings, and platform activity in real time

---

## 3. Project Objectives

1. Provide travelers with a modern, intuitive interface to browse, compare, and book Himalayan tour packages
2. Enable staff to review and verify tour packages before they are publicly listed
3. Give administrators complete platform visibility with analytics, booking management, and user oversight
4. Ensure the platform is fully responsive and accessible across mobile, tablet, and desktop devices
5. Lay a production-ready foundation deployable on modern cloud infrastructure

---

## 4. Scope of Work

### 4.1 In Scope

- Public landing page with featured tours and destination highlights
- User authentication (login / registration) with role-based access control
- Traveler dashboard: browse tours, book packages, view booking history
- Staff dashboard: review pending tours, verify or reject packages, manage bookings
- Admin dashboard: full analytics, tour management, booking oversight
- User profile pages with role-specific statistics
- Notification system for cross-role alerts (Staff → Admin)
- Mobile-first responsive design for all pages and components
- Frontend deployment on Vercel
- Backend REST API deployment on Railway

### 4.2 Out of Scope

- Real payment gateway integration (placeholder only in this phase)
- Native mobile applications (iOS / Android)
- Multi-language / i18n support
- Third-party travel API integrations (e.g., flight, hotel)
- Customer support chat or ticketing system

---

## 5. Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | Component-based UI with type safety |
| Vite | Fast build tooling and dev server |
| Tailwind CSS | Utility-first responsive styling |
| Lucide React | Consistent icon library |
| localStorage | Client-side session persistence |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| JSON Web Tokens (JWT) | Stateless authentication |
| In-memory data store | Rapid prototyping (upgradeable to PostgreSQL) |
| CORS middleware | Secure cross-origin API access |

### Deployment

| Service | Role |
|---|---|
| Vercel | Frontend hosting with SPA routing |
| Railway | Backend API hosting with auto-deploy |
| GitHub | Source control and CI/CD integration |

---

## 6. System Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Client Browser                   │
│                                                      │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  Landing   │  │  Auth View   │  │  Dashboards │  │
│  │   Page     │  │  (Login/Reg) │  │ (Role-based)│  │
│  └────────────┘  └──────────────┘  └─────────────┘  │
│                        │                             │
│              React 19 + TypeScript + Vite            │
└───────────────────────┬──────────────────────────────┘
                        │ HTTPS / REST
┌───────────────────────▼──────────────────────────────┐
│                  Express.js API (Railway)             │
│                                                      │
│   /api/auth     /api/tours     /api/bookings         │
│                                                      │
│         JWT Middleware + Role Guards                 │
│                                                      │
│         In-memory Store (→ PostgreSQL ready)         │
└──────────────────────────────────────────────────────┘
```

---

## 7. User Roles & Permissions

| Feature | Traveler | Staff | Admin |
|---|:---:|:---:|:---:|
| Browse tour packages | ✅ | ✅ | ✅ |
| Book a tour | ✅ | — | — |
| View own bookings | ✅ | — | — |
| Review & verify tours | — | ✅ | ✅ |
| Manage all bookings | — | ✅ | ✅ |
| Create / edit tours | — | ✅ | ✅ |
| View platform analytics | — | — | ✅ |
| Manage staff accounts | — | — | ✅ |
| Receive admin notifications | — | — | ✅ |

---

## 8. Key Features

### 8.1 Landing Page
- Full-screen hero section with call-to-action
- Featured tour packages with ratings and pricing
- Popular destinations grid
- Trust indicators and testimonials
- Fully responsive (mobile-first)

### 8.2 Authentication
- Email and password login with validation
- Role-based redirection after login
- Quick-login mock buttons for demo (Admin, Staff, Traveler)
- Secure JWT tokens stored in localStorage

### 8.3 Traveler Dashboard
- Searchable and filterable tour catalog
- Detailed tour view with difficulty, duration, inclusions
- Booking form with date selection and group size
- Booking history with status tracking (Pending, Confirmed, Completed, Cancelled)
- Mobile-optimized bottom-sheet booking modal

### 8.4 Staff Dashboard
- Pending tour verification queue
- Tour detail review with approve/reject action
- Active booking management with status updates
- Scrollable tab navigation optimized for mobile

### 8.5 Admin Dashboard
- Platform-wide analytics (revenue, bookings, tours)
- Complete booking management with filters
- Tour catalog management (create, edit, toggle availability)
- Notification center for Staff actions

### 8.6 Profile View
- Role-specific statistics and activity
- Recent booking history (Travelers)
- Verification metrics (Staff)
- Revenue and platform KPIs (Admin)
- Frequent Traveler badge (5+ completed tours)

---

## 9. Responsive Design Strategy

| Breakpoint | Target Devices |
|---|---|
| `< 640px` (sm) | Mobile phones (portrait) |
| `640px – 768px` (md) | Mobile phones (landscape), small tablets |
| `768px – 1024px` (lg) | Tablets |
| `> 1024px` (xl) | Laptops and desktops |

Design patterns applied:
- Bottom-sheet modals on mobile (full-screen drawers)
- Scrollable horizontal tab bars on small screens
- Collapsed/stacked grids on mobile (single column → multi-column)
- Touch-friendly tap targets (min 44px height)
- Fluid typography scaling with `sm:` / `md:` / `lg:` prefixes

---

## 10. API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/tours` | Public | List all verified tours |
| POST | `/api/tours` | Admin, Staff | Create new tour package |
| PUT | `/api/tours/:id` | Admin, Staff | Update tour details |
| GET | `/api/bookings` | Admin, Staff | Get all bookings |
| POST | `/api/bookings` | Traveler | Create a booking |
| PUT | `/api/bookings/:id/status` | Admin, Staff | Update booking status |

---

## 11. Deployment Plan

### Frontend (Vercel)
1. Connect GitHub repository to Vercel project
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add `vercel.json` with SPA rewrite rule
5. Configure environment variable: `VITE_API_URL`

### Backend (Railway)
1. Connect GitHub repository to Railway project
2. Set start command: `node server/server.js`
3. Configure environment variables: `JWT_SECRET`, `PORT`, `CORS_ORIGIN`
4. Enable auto-deploy on push to `main`

---

## 12. Project Timeline

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 – Discovery & Design | Week 1 | Requirements finalization, wireframes, design system |
| Phase 2 – Core Development | Week 2–3 | Auth, landing page, traveler dashboard |
| Phase 3 – Role Dashboards | Week 4–5 | Staff and Admin views, notification system |
| Phase 4 – Responsive Polish | Week 6 | Mobile optimization, cross-browser testing |
| Phase 5 – Backend & API | Week 7 | Express API, JWT auth, endpoint testing |
| Phase 6 – Deployment & QA | Week 8 | Vercel + Railway deploy, final bug fixes |

**Total Estimated Duration:** 8 Weeks

---

## 13. Budget Estimate

| Item | Cost (NPR) |
|---|---|
| Frontend Development | 80,000 |
| Backend API Development | 50,000 |
| UI/UX Design & Responsive Polish | 30,000 |
| Testing & QA | 20,000 |
| Deployment & DevOps Setup | 10,000 |
| Documentation | 10,000 |
| **Total** | **2,00,000** |

*Hosting costs: Vercel (Free tier) + Railway (~$5/month) for initial launch*

---

## 14. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope creep (payment integration) | Medium | High | Strict phase-gate approach; payment deferred to v2 |
| Backend data loss (in-memory store) | Low | Medium | PostgreSQL migration planned for v2 |
| Mobile compatibility issues | Low | Medium | Test on real devices throughout development |
| Third-party service downtime (Vercel/Railway) | Low | High | Monitor uptime; SLA-backed plans for production |

---

## 15. Future Roadmap (v2)

- **Real Payment Integration** — Khalti or eSewa payment gateway for Nepal
- **PostgreSQL Database** — Replace in-memory store with persistent relational database
- **Email Notifications** — Booking confirmation and status update emails
- **Review & Ratings** — Travelers rate completed tours
- **Itinerary Builder** — Day-by-day tour plan display
- **Multi-language Support** — Nepali (ne) and English (en)
- **Native Mobile App** — React Native version for iOS and Android
- **Advanced Analytics** — Revenue charts, booking trends, peak season reports

---

## 16. Conclusion

Community Tours and Travels Platform addresses a real gap in Nepal's digital tourism ecosystem. By providing a clean, role-driven interface for travelers, staff, and administrators, the platform streamlines tour discovery, booking, and management in one unified product. Built on modern, production-ready technology and designed for all devices, it is positioned for rapid growth and a clear path toward full-featured v2 capabilities.

---

*© 2026 Community Tours and Travels Pvt. Ltd., Kathmandu, Nepal. All rights reserved.*
