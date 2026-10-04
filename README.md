# Bazaro

Bazaro is a full-featured e-commerce storefront built with Next.js 16 and React 19. Shoppers can browse and search products, build a cart as a guest, and check out with cash on delivery or by card once they sign in.

The product data and order processing come from the public [Route Ecommerce API](https://ecommerce.routemisr.com).

## Features

**Shopping**

- Product listing with filters (category, brand, price range), sorting and pagination
- Live search across products and brands from the navbar, with a full-screen search overlay on mobile
- Product details page with image gallery, stock status, quantity selector, reviews breakdown and shipping information
- Home page with hero, category grid, featured products, hot offers carousel, brands marquee and newsletter section
- Dedicated categories and brands pages

**Cart and wishlist**

- Cart drawer (bottom sheet on mobile, side panel on desktop) and a full cart page
- Guest cart and guest wishlist stored in the browser, merged into the account automatically after login
- Quantity updates, item removal and clear cart

**Accounts and checkout**

- Sign up, log in and log out with NextAuth credentials
- Forgot password flow with email, six-digit code verification and password reset
- Profile, settings (update profile, change password) and address book
- Checkout with saved addresses, cash on delivery or card payment through the API's checkout session
- Order history with expandable order details

**Quality of life**

- Toast notifications, loading skeletons and empty and error states
- Responsive layout with separate mobile and desktop navigation
- Custom 404 page
- Form validation with Zod and Formik

## Tech stack

| Area          | Tools                                                               |
| ------------- | ------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router), React 19, TypeScript                       |
| Styling       | Tailwind CSS 4, shadcn/ui (base-nova), Base UI, lucide-react        |
| Auth          | NextAuth v4 (Credentials provider, JWT sessions)                    |
| Data fetching | Server Components, Server Actions, Route Handlers, TanStack Query 5 |
| Forms         | Formik, Zod 4, zod-formik-adapter                                   |
| UI components | embla-carousel                                                      |
| Linting       | ESLint 9 with eslint-config-next                                    |

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/Ahmed-Alhossiny/bazaro.git
cd bazaro
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXTAUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=http://localhost:3000
```

| Variable          | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `API_BASE_URL`    | Base URL of the Route Ecommerce API (v1)                               |
| `NEXTAUTH_SECRET` | Secret used to sign and decode session tokens                          |
| `NEXTAUTH_URL`    | Public URL of the app. Also used as the return URL after card payments |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Project structure

| Path                       | Purpose                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/app`                  | App Router pages, layouts, the not-found page and API routes                                       |
| `src/app/api/auth`         | NextAuth handler                                                                                   |
| `src/app/api/cart`         | Route Handlers that proxy the cart endpoints with the user's token                                 |
| `src/app/api/product-info` | Product lookup used by the guest cart                                                              |
| `src/app/api/search-data`  | Catalogue data used by live search                                                                 |
| `src/app/api/actions`      | Server Actions for cart, wishlist, address, auth and payment                                       |
| `src/components`           | UI components grouped by area: layout, auth, account, cart, product details, listing and shared UI |
| `src/hooks`                | `useCart` (TanStack Query for users, local storage for guests) and `useLiveSearch`                 |
| `src/services`             | Thin fetch wrappers around the Route API                                                           |
| `src/Schemas`              | Zod validation schemas                                                                             |
| `src/utils`                | Guest cart and wishlist storage helpers, token helper, small utilities                             |
| `src/types`                | Shared TypeScript types, including the NextAuth type extensions                                    |
| `src/next-auth`            | NextAuth configuration                                                                             |
| `src/proxy.ts`             | Route protection and auth redirects                                                                |
| `public`                   | Static images and payment logos                                                                    |

## How it works

**Authentication.** Login calls the API's sign-in endpoint through the NextAuth Credentials provider. The API token is stored in the NextAuth JWT cookie, and server code reads it with `getAccessToken()` to call protected endpoints.

**Guest to user flow.** Guests add items to a cart and wishlist stored in the browser. After login, `GuestCartMerge` and `GuestWishlistMerger` push those items to the account and clear the local copy.

**Data flow.** Server Components fetch catalogue data directly. Logged-in cart state is fetched through the `/api/cart` route handlers and cached with TanStack Query, while mutations such as checkout, addresses and wishlist changes run as Server Actions.

## Deployment

The project is set up for [Vercel](https://vercel.com).

1. Push the repository to GitHub.
2. Import it in Vercel. The Next.js defaults work without changes.
3. Add the three environment variables above. Set `NEXTAUTH_URL` to your deployed `https://` URL and use a fresh `NEXTAUTH_SECRET`.
4. Deploy. Every push to `main` redeploys production automatically.

If you run `next dev` behind a tunnel or proxy, add the public hostname to both `allowedDevOrigins` and `experimental.serverActions.allowedOrigins` in `next.config.ts`, otherwise Server Actions are rejected with an "Invalid Server Actions request" error.

## Roadmap

- Pages linked from the footer that are not built yet: help center, shipping, returns, order tracking, terms and privacy
- Working contact and newsletter forms
- Server-side search instead of loading the full catalogue in the browser
- Product-specific page titles, `sitemap.ts`, `robots.ts` and structured data
- Accessibility pass: colour contrast, keyboard navigation and focus handling
- Automated tests for login, add to cart and checkout

## Acknowledgements

- [Route Ecommerce API](https://ecommerce.routemisr.com) for products, users, carts and orders
- [shadcn/ui](https://ui.shadcn.com), [Base UI](https://base-ui.com) and [lucide](https://lucide.dev) for components and icons

## License

This project is for learning and portfolio purposes. Add a license of your choice if you plan to share or reuse it.
