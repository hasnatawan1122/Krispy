# Krispy — Fast Food Restaurant Website Demo

A modern, high-conversion restaurant demo website for **Krispy** (**Krispy Cottage**, Vehari, Pakistan), designed with a mobile-first, app-like ordering experience.

![Krispy Hero Feast](/public/images/krispy-hero-feast.png)

---

## 🍽️ About the Project

This demo is tailored to demonstrate how a local fast-food restaurant can enhance its digital brand, provide transparent menu discovery, and offer frictionless mobile ordering without upfront complex backend infrastructure.

- **Brand:** Krispy
- **Full Business Name:** Krispy Cottage
- **Address:** 177 Jinnah Road, D Block, Vehari, 61100, Punjab, Pakistan
- **Phone:** 0302-3360008 / 067-2300008
- **WhatsApp:** +92 302 3360008
- **Hours:** 11:00 AM – 2:00 AM (Next Day) Daily
- **Services:** Home Delivery, Takeaway / Pickup, Dine-in

---

## 🌟 Key Features

1. **App-Like Mobile & Desktop Experience**
   - Sticky elevated header with quick cart count badge.
   - Mobile bottom navigation bar (`Home`, `Menu`, `Deals`, `Cart`).
   - Horizontal category pill filters with instant filtering.
   - Responsive product grids (2 columns on mobile, 3–4 on desktop).

2. **Authentic Restaurant Menu & Accurate Pricing (PKR)**
   - **Gourmet Pizzas:** Chapli Kabab, Chicken Supreme, Super Supreme, Chicken Extreme, Behari, 4X, Loaded Cheese Chicago, Crown Crust, Shahi Kebab, Bonefire Crust with accurate Small, Medium, and Large pricing.
   - **Sides & Snacks:** Pizza Paratha (Rs. 300), Pizza Rolls (Rs. 300), Loaded Fries (Rs. 300), Sandwiches.
   - **Jumbo Deals 1–6:** Multi-pizza combos with Coke (from Rs. 650 to Rs. 1650).
   - **Regular & Family Deals:** Deal 13 to Deal 20 (including 5 Zester Burgers Family Deal, 10 Pcs Fried Chicken Meal).
   - **Happy Kiddy Meals:** 3 kids combos (Rs. 330 each) with "Take 1 Happy Kiddy Meal, Get 1 Free Toy" promotion.
   - **Midnight Deals:** Midnight Pizza Deal (Rs. 950) & Midnight Burger Deal (Rs. 400), active from 11:00 PM to 2:00 AM.
   - **Extras & Customization:** Size-based Extra Cheese and Extra Toppings, cheese slices, and dip sauces.

3. **Interactive Food Customizer & Shopping Cart**
   - Instant price updates upon selecting pizza sizes.
   - Extras selection with size-dependent calculation.
   - Quantity increment/decrement with real-time totals.
   - Full cart persistence across sessions via `localStorage`.
   - Clear empty states and quick add-to-cart buttons.

4. **Formatted WhatsApp Checkout Preview**
   - Collects customer name, phone, order type (`Home Delivery`, `Takeaway`, `Dine-in`), address, and special notes.
   - Formats a structured order message with line items, variants, extras, and subtotal.
   - Displays required delivery disclaimer: *"Delivery charges, if applicable, will be confirmed by the restaurant."*
   - Includes one-click "Copy Order Text" and "Send to WhatsApp" link (`https://wa.me/923023360008`).

5. **Illustrative Sample Customer Feedback**
   - Clearly labeled demonstration testimonials highlighting pizzas, late-night service, and family meals.

6. **SEO & Performance**
   - Next.js 15 App Router with static generation.
   - OpenGraph and Twitter card metadata.
   - Pre-configured `sitemap.xml` and `robots.txt`.
   - `Schema.org` `FastFoodRestaurant` JSON-LD structured data.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** Zustand (with localStorage persistence)
- **Deployment:** Vercel / GitHub Ready

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/krispy-restaurant.git
cd krispy-restaurant

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── layout.tsx             # Root layout with fonts, header, footer & modals
│   ├── page.tsx               # Homepage (10 complete sections)
│   ├── menu/                  # Full interactive menu page & filters
│   ├── deals/                 # Jumbo, Family, Midnight & Regular deals
│   ├── contact/               # Contact details, opening hours, directions & form
│   ├── not-found.tsx          # Custom 404 page
│   ├── robots.ts              # Search engine robots configuration
│   ├── sitemap.ts             # Dynamic XML sitemap
│   └── globals.css            # Custom styles & design tokens
├── components/
│   ├── layout/                # Header, Footer, MobileBottomNav
│   ├── home/                  # Hero, Services, Categories, Featured, Deals, Midnight, Reviews, Location
│   ├── menu/                  # ProductCard, ItemCustomizationModal
│   ├── deals/                 # DealCard
│   ├── cart/                  # CartDrawer, WhatsAppCheckoutModal
├── data/
│   ├── restaurant.ts          # Restaurant info, address, phone & hours
│   ├── menu.ts                # Complete menu items, sizes, extras & deals
│   └── reviews.ts             # Illustrative customer testimonials
├── lib/
│   ├── currency.ts            # PKR (Rs.) currency formatter
│   ├── whatsapp.ts            # Formatted WhatsApp message generator
│   └── utils.ts               # Tailwind merge utilities
├── store/
│   ├── cart-store.ts          # Zustand shopping cart with localStorage
│   └── ui-store.ts            # Modal visibility controls
└── types/
    └── menu.ts                # TypeScript interfaces
```

---

## ⚙️ Configuration & Customization

### How to Edit Prices and Menu Items
Open [`src/data/menu.ts`](src/data/menu.ts):
- To change a pizza price, edit the `sizePrices` array on the item.
- To update deals or combo contents, edit the `includedItems` array and `price`.
- To add a new menu item, insert an object into `MENU_ITEMS`.

### How to Change Restaurant Details or Phone Numbers
Open [`src/data/restaurant.ts`](src/data/restaurant.ts):
- Update `phone`, `phoneSecondary`, or `whatsappNumber`.
- Change `address` or `openingHours`.

### How to Replace Images
All assets are located in [`public/images/`](public/images/):
- **Logo:** `public/images/krispy-logo.png`
- **Hero Feast:** `public/images/krispy-hero-feast.png`
- **Pizzas:** `public/images/krispy-featured-pizza.png`
- **Burgers:** `public/images/krispy-featured-burger.png`
- **Sides:** `public/images/sides/`

---

## 🚢 Deploying to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Krispy restaurant website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/krispy-restaurant.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**. The site will be live within 1–2 minutes!

---

## 📄 License & Disclaimer

*Disclaimer: This website is a portfolio demonstration built for Krispy Cottage in Vehari, Pakistan. Online order submission prepares a WhatsApp message for communication and does not process automated financial transactions.*

