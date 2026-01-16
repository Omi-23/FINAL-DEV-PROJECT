# 🎯 Complete Feature Testing Guide
## Smart E-Commerce & Service Management Platform

**All Features from Project Description - Step-by-Step Testing Instructions**

---

## 📋 Table of Contents

1. [Setup & Prerequisites](#setup--prerequisites)
2. [Feature 1: Navigation Bar](#feature-1-navigation-bar)
3. [Feature 2: Sliding Banner (Hero Section)](#feature-2-sliding-banner-hero-section)
4. [Feature 3: Products/Services Section](#feature-3-productsservices-section)
5. [Feature 4: Product/Service Details Page](#feature-4-productservice-details-page)
6. [Feature 5: Purchasing Features](#feature-5-purchasing-features)
7. [Feature 6: Order Confirmation](#feature-6-order-confirmation)
8. [Feature 7: Authentication (Email & Password)](#feature-7-authentication-email--password)
9. [Feature 8: Social Login](#feature-8-social-login)
10. [Feature 9: Dashboard (Role-Based)](#feature-9-dashboard-role-based)
11. [Feature 10: Customer Review Form](#feature-10-customer-review-form)
12. [Feature 11: Review Preview with Sliding Banner](#feature-11-review-preview-with-sliding-banner)
12. [Feature 12: Wishlist (Unique Feature)](#feature-12-wishlist-unique-feature)
13. [Feature 13: Contact Page](#feature-13-contact-page)
14. [Feature 14: About Us Page](#feature-14-about-us-page)
15. [Feature 15: Footer](#feature-15-footer)

---

## Setup & Prerequisites

### Before Testing:
1. ✅ Backend running on http://localhost:5001
2. ✅ Frontend running on http://localhost:5173
3. ✅ At least 3-5 products added (via Admin Dashboard)
4. ✅ Firebase Authentication enabled (Email/Password, Google, GitHub)

---

## Feature 1: Navigation Bar

### What to Test:
- Logo
- Menu links (Home, Products, About, Contact, Dashboard)
- Login/Logout buttons
- Responsive hamburger menu

### Step-by-Step Testing:

#### Test 1.1: Logo
1. Go to: http://localhost:5173
2. **Check:** Logo "Smart E-Commerce" appears at top left
3. **Click:** Logo should navigate to Home page

#### Test 1.2: Menu Links (Desktop)
1. **Check:** These links visible in navbar:
   - Home
   - Products
   - About
   - Contact
   - Dashboard
2. **Click each link** - should navigate correctly

#### Test 1.3: Login/Logout Buttons (Not Logged In)
1. **Check:** "Login" and "Register" buttons visible at top right
2. **Click "Login"** - should go to /login
3. **Click "Register"** - should go to /register

#### Test 1.4: Login/Logout Buttons (Logged In)
1. **Login first** (see Feature 7)
2. **Check:** Your email/name appears at top right
3. **Check:** "Logout" button appears
4. **Click "Logout"** - should log you out and show Login/Register buttons

#### Test 1.5: Responsive Hamburger Menu
1. **Resize browser** to mobile size (< 1024px width)
2. **Check:** Hamburger menu (☰) appears at top left
3. **Click hamburger** - menu should dropdown
4. **Check:** All menu links visible in dropdown
5. **Click a link** - should navigate and close menu

---

## Feature 2: Sliding Banner (Hero Section)

### What to Test:
- Auto-sliding banner
- Promotional content
- Call-to-action buttons

### Step-by-Step Testing:

#### Test 2.1: Auto-Sliding Banner
1. Go to: http://localhost:5173 (Home page)
2. **Watch the banner** - it should auto-slide every 3.5 seconds
3. **Check:** 3 different slides appear:
   - "Smart Shopping, Better Choices"
   - "Fast Orders & Easy Tracking"
   - "Wishlist Your Favorites"

#### Test 2.2: Manual Navigation
1. **Click the dots/buttons** below the banner
2. **Check:** Banner switches to selected slide immediately

#### Test 2.3: Call-to-Action Buttons
1. **Check:** Each slide has a CTA button:
   - "Browse Products"
   - "Go to Dashboard"
   - "View Wishlist"
2. **Click each button** - should navigate to correct page

#### Test 2.4: Featured Benefits Card
1. **Check:** Right side shows "Featured Benefits" card
2. **Check:** Shows 4 benefits:
   - Secure Firebase Auth
   - Role-Based Dashboard
   - Reviews & Ratings
   - Wishlist Feature

---

## Feature 3: Products/Services Section

### What to Test:
- Grid/card-based layout
- Product image, title, price
- Short description
- "View Details" button

### Step-by-Step Testing:

#### Test 3.1: Products Grid Layout
1. Go to: http://localhost:5173/products
2. **Check:** Products displayed in grid (1 column mobile, 2 tablet, 3 desktop)
3. **Check:** Each product in a card

#### Test 3.2: Product Information
1. **For each product card, check:**
   - ✅ Product image (if provided)
   - ✅ Product title
   - ✅ Price (৳ symbol)
   - ✅ Short description
   - ✅ "View Details" button

#### Test 3.3: Search Functionality
1. **Find search box** at top of Products page
2. **Type a product name** - products should filter
3. **Clear search** - all products should show again

#### Test 3.4: View Details Button
1. **Click "View Details"** on any product
2. **Check:** Navigates to `/products/:id` page
3. **Check:** Shows full product details

#### Test 3.5: Empty State
1. If no products exist, **check:** "No products found" message

---

## Feature 4: Product/Service Details Page

### What to Test:
- Full description
- Price
- Ratings & reviews
- Purchase/Order button

### Step-by-Step Testing:

#### Test 4.1: Product Information Display
1. Go to any product: http://localhost:5173/products/[product-id]
2. **Check left side:**
   - ✅ Product image (large)
   - ✅ Product title
   - ✅ Price (৳ symbol)
   - ✅ Average rating (stars)
   - ✅ Review count
   - ✅ Full description
   - ✅ "Toggle Wishlist" button
   - ✅ "Back" button

#### Test 4.2: Ratings Display
1. **Check:** Star rating displayed (1-5 stars)
2. **Check:** Review count shown (e.g., "(5 reviews)")
3. If no reviews, **check:** Shows 0 stars and "(0)"

#### Test 4.3: Reviews Section
1. **Scroll to Reviews section** (right side)
2. **Check:** Existing reviews displayed with:
   - Reviewer name
   - Rating (badge)
   - Comment text
3. If no reviews, **check:** "No reviews yet" message

---

## Feature 5: Purchasing Features

### What to Test:
- Order form
- Quantity selection
- User information auto-filled
- Order validation

### Step-by-Step Testing:

#### Test 5.1: Order Form (Not Logged In)
1. Go to any product details page
2. **Check:** Order form visible on right side
3. **Check:** "Place Order" button shows "Login Required"
4. **Try to submit** - should redirect to login

#### Test 5.2: Order Form (Logged In)
1. **Login first** (see Feature 7)
2. Go to product details page
3. **Check Order Form fields:**
   - Quantity (number input, min: 1)
   - Phone (text input)
   - Address (text input)
   - Total price (calculated: price × quantity)
   - "Place Order" button (enabled)

#### Test 5.3: Quantity Selection
1. **Change quantity** to 2, 3, etc.
2. **Check:** Total price updates automatically
3. **Try quantity 0 or negative** - should be prevented (min: 1)

#### Test 5.4: Place Order
1. **Fill order form:**
   - Quantity: 2
   - Phone: 01712345678
   - Address: 123 Main Street, Dhaka
2. **Click "Place Order"**
3. **Check:** Success toast message appears
4. **Check:** Redirects to Order Confirmation page

#### Test 5.5: Order Validation
1. **Try submitting empty form** - should show validation error
2. **Try quantity = 0** - should be prevented

---

## Feature 6: Order Confirmation

### What to Test:
- Confirmation page after successful order
- Order summary
- Order ID and status

### Step-by-Step Testing:

#### Test 6.1: Order Confirmation Page
1. After placing an order, **check:** Redirected to `/order-confirmation/:orderId`
2. **Check page shows:**
   - ✅ "Order Confirmation" title
   - ✅ Order ID (unique identifier)
   - ✅ Status (should be "pending")
   - ✅ Product name
   - ✅ Quantity
   - ✅ Unit price
   - ✅ Total price (unit price × quantity)

#### Test 6.2: Order Summary Display
1. **Check:** All order details in grid layout:
   - Order ID
   - Status
   - Product
   - Quantity
   - Unit Price
   - Total

#### Test 6.3: Action Buttons
1. **Check:** Two buttons:
   - "Continue Shopping" - goes to /products
   - "View My Orders" - goes to /dashboard/orders
2. **Click each** - should navigate correctly

---

## Feature 7: Authentication (Email & Password)

### What to Test:
- User registration
- User login
- Password validation and error handling

### Step-by-Step Testing:

#### Test 7.1: User Registration
1. Go to: http://localhost:5173/register
2. **Fill registration form:**
   - Name: Test User
   - Email: testuser@example.com
   - Password: test123456 (min 6 characters)
   - Confirm Password: test123456
3. **Click "Register"**
4. **Check:** Success toast appears
5. **Check:** Automatically logged in
6. **Check:** Redirected to home page
7. **Check:** Navbar shows your email/name

#### Test 7.2: User Login
1. Go to: http://localhost:5173/login
2. **Fill login form:**
   - Email: testuser@example.com
   - Password: test123456
3. **Click "Login"**
4. **Check:** Success toast appears
5. **Check:** Redirected to home page
6. **Check:** Navbar shows your email/name

#### Test 7.3: Login Error Handling
1. **Try wrong password:**
   - Email: testuser@example.com
   - Password: wrongpassword
2. **Click "Login"**
3. **Check:** Error toast appears (e.g., "Invalid credentials")

#### Test 7.4: Registration Error Handling
1. **Try registering with existing email:**
   - Email: testuser@example.com (already exists)
   - Password: test123456
2. **Click "Register"**
3. **Check:** Error toast appears (e.g., "Email already in use")

#### Test 7.5: Form Validation
1. **Try submitting empty form** - should show validation errors
2. **Try invalid email format** - should show error
3. **Try short password** (< 6 chars) - should show error

---

## Feature 8: Social Login

### What to Test:
- Login with Google
- Login with GitHub

### Step-by-Step Testing:

#### Test 8.1: Google Login
1. Go to: http://localhost:5173/login
2. **Click "Continue with Google"** button
3. **Check:** Google sign-in popup appears
4. **Select Google account**
5. **Check:** Success toast appears
6. **Check:** Automatically logged in
7. **Check:** Redirected to home page
8. **Check:** Navbar shows your Google account name/email

#### Test 8.2: GitHub Login
1. Go to: http://localhost:5173/login
2. **Click "Continue with GitHub"** button
3. **Check:** GitHub sign-in popup appears
4. **Authorize the app**
5. **Check:** Success toast appears
6. **Check:** Automatically logged in
7. **Check:** Redirected to home page
8. **Check:** Navbar shows your GitHub account name/email

#### Test 8.3: Social Login Error Handling
1. **Close the popup** without signing in
2. **Check:** Error toast appears (e.g., "Sign-in cancelled")

---

## Feature 9: Dashboard (Role-Based)

### What to Test:
- Admin Dashboard features
- User Dashboard features

### Step-by-Step Testing:

### 9A: Admin Dashboard

#### Test 9A.1: Access Admin Dashboard
1. **Login as admin:** www.meselfomiofficial@gmail.com
2. Go to: http://localhost:5173/dashboard
3. **Check:** "Admin Dashboard" appears (not "User Dashboard")
4. **Check:** Admin menu items visible:
   - Manage Products
   - Manage Orders
   - Messages

#### Test 9A.2: Manage Products (Admin)
1. Go to: Dashboard → Manage Products
2. **Check:** Table shows all products with:
   - Title
   - Price
   - Actions (Edit, Delete)
3. **Click "Add Product"** button
4. **Fill form:**
   - Title: New Product
   - Price: 5000
   - Image URL: https://images.unsplash.com/photo-1505740420928-5e560c06d30e
   - Short Description: A new product
   - Description: Full description here
5. **Click "Create"**
6. **Check:** Success toast appears
7. **Check:** Redirected to Manage Products
8. **Check:** New product appears in table

#### Test 9A.3: Edit Product (Admin)
1. In Manage Products, **click "Edit"** on any product
2. **Check:** Form pre-filled with product data
3. **Change price** to 6000
4. **Click "Update"**
5. **Check:** Success toast appears
6. **Check:** Product updated in table

#### Test 9A.4: Delete Product (Admin)
1. In Manage Products, **click "Delete"** on a product
2. **Check:** Confirmation dialog appears
3. **Click "OK"**
4. **Check:** Success toast appears
5. **Check:** Product removed from table

#### Test 9A.5: Manage All Orders (Admin)
1. Go to: Dashboard → Manage Orders
2. **Check:** Table shows ALL orders from all users with:
   - Order ID
   - User email
   - Product name
   - Quantity
   - Status
   - Status dropdown
3. **Change order status:**
   - Select different status from dropdown (pending, confirmed, shipped, delivered, canceled)
   - **Check:** Status updates immediately
   - **Check:** Success toast appears

#### Test 9A.6: View Contact Messages (Admin)
1. Go to: Dashboard → Messages
2. **Check:** Table shows all contact form submissions with:
   - Name
   - Email
   - Subject
   - Message
   - Date

### 9B: User Dashboard

#### Test 9B.1: Access User Dashboard
1. **Login as regular user** (not admin email)
2. Go to: http://localhost:5173/dashboard
3. **Check:** "User Dashboard" appears
4. **Check:** User menu items visible:
   - My Orders
   - My Wishlist

#### Test 9B.2: View Own Orders (User)
1. Go to: Dashboard → My Orders
2. **Check:** Table shows ONLY your orders with:
   - Order ID
   - Product name
   - Quantity
   - Status
   - Total price
   - Actions (Edit, Cancel)
3. **Check:** Other users' orders NOT visible

#### Test 9B.3: Edit Own Order (User)
1. In My Orders, **click "Edit"** on an order
2. **Check:** Form shows order details
3. **Change quantity** or other fields
4. **Click "Update"**
5. **Check:** Success toast appears
6. **Check:** Order updated in table

#### Test 9B.4: Cancel Own Order (User)
1. In My Orders, **click "Cancel"** on an order
2. **Check:** Confirmation dialog appears
3. **Click "OK"**
4. **Check:** Success toast appears
5. **Check:** Order removed or status changed to "canceled"

#### Test 9B.5: View Order Status (User)
1. In My Orders, **check:** Status column shows current status
2. **Check:** Status updates when admin changes it

---

## Feature 10: Customer Review Form

### What to Test:
- Authenticated users can submit reviews
- Rating + text feedback

### Step-by-Step Testing:

#### Test 10.1: Submit Review (Logged In)
1. **Login first**
2. Go to any product details page
3. **Scroll to Reviews section**
4. **Fill review form:**
   - Rating: 5 (1-5)
   - Comment: "Great product! Highly recommended."
5. **Click "Submit Review"**
6. **Check:** Success toast appears
7. **Check:** Review appears in reviews list immediately
8. **Check:** Average rating updates
9. **Check:** Review count increases

#### Test 10.2: Submit Review (Not Logged In)
1. **Logout first**
2. Go to product details page
3. **Try to submit review**
4. **Check:** Error toast: "Please login to submit a review"
5. **Check:** Redirected to login page

#### Test 10.3: Review Validation
1. **Try submitting without rating** - should show error
2. **Try rating > 5 or < 1** - should be prevented

#### Test 10.4: Update Existing Review
1. **Submit a review** for a product
2. **Submit another review** for the same product
3. **Check:** Previous review is updated (not duplicated)
4. **Check:** New rating and comment replace old ones

---

## Feature 11: Review Preview with Sliding Banner

### What to Test:
- Auto-sliding customer reviews
- Reviewer name, rating, comment

### Step-by-Step Testing:

#### Test 11.1: Review Slider on Home Page
1. Go to: http://localhost:5173 (Home page)
2. **Scroll down** to "Customer Reviews" section
3. **Check:** Reviews displayed in a card
4. **Check:** Shows:
   - Reviewer name
   - Rating (badge, e.g., "5 / 5")
   - Comment text
   - Product name

#### Test 11.2: Auto-Sliding Reviews
1. **Watch the review card** - it should auto-slide every 3 seconds
2. **Check:** Different reviews appear in rotation

#### Test 11.3: Manual Navigation
1. **Click the dots/buttons** below the review
2. **Check:** Review switches to selected one immediately

#### Test 11.4: Empty State
1. If no reviews exist, **check:** "No reviews yet. Be the first to review a product."

#### Test 11.5: "See products" Link
1. **Click "See products"** link
2. **Check:** Navigates to /products page

---

## Feature 12: Wishlist (Unique Feature)

### What to Test:
- Add to wishlist
- View wishlist
- Remove from wishlist

### Step-by-Step Testing:

#### Test 12.1: Add to Wishlist (Logged In)
1. **Login first**
2. Go to any product details page
3. **Click "Toggle Wishlist"** button
4. **Check:** Success toast: "Added to wishlist"
5. **Check:** Button text may change

#### Test 12.2: View Wishlist
1. Go to: http://localhost:5173/wishlist
   OR
   Dashboard → My Wishlist
2. **Check:** All wishlist items displayed in grid
3. **For each item, check:**
   - Product image
   - Product title
   - Price
   - "View" button (goes to product details)
   - "Remove" button

#### Test 12.3: Remove from Wishlist
1. In wishlist page, **click "Remove"** on an item
2. **Check:** Success toast: "Removed from wishlist"
3. **Check:** Item removed from list

#### Test 12.4: Add/Remove from Product Page
1. Go to product details page
2. **Click "Toggle Wishlist"** - adds if not in wishlist
3. **Click again** - removes if already in wishlist
4. **Check:** Toast messages appear correctly

#### Test 12.5: Wishlist (Not Logged In)
1. **Logout first**
2. Go to product details page
3. **Try to toggle wishlist**
4. **Check:** Error toast: "Please login to use wishlist"
5. **Check:** Redirected to login page

---

## Feature 13: Contact Page

### What to Test:
- Contact form
- Email/phone/address
- Form validation
- Message storage in database

### Step-by-Step Testing:

#### Test 13.1: Contact Information Display
1. Go to: http://localhost:5173/contact
2. **Check left side shows:**
   - Email: support@example.com
   - Phone: +880 1XXXXXXXXX
   - Address: Your City, Bangladesh

#### Test 13.2: Contact Form (Not Logged In)
1. **Check form fields:**
   - Name (empty)
   - Email (empty)
   - Subject
   - Message
2. **Fill form:**
   - Name: John Doe
   - Email: john@example.com
   - Subject: Question about products
   - Message: I have a question...
3. **Click "Send"**
4. **Check:** Success toast: "Message sent"
5. **Check:** Form fields cleared (subject, message)

#### Test 13.3: Contact Form (Logged In)
1. **Login first**
2. Go to Contact page
3. **Check:** Name and Email auto-filled with your account info
4. **Fill subject and message**
5. **Click "Send"**
6. **Check:** Success toast appears

#### Test 13.4: Form Validation
1. **Try submitting empty form** - should show validation errors
2. **Try invalid email** - should show error
3. **Try without message** - should show error

#### Test 13.5: Message Storage (Admin View)
1. **Login as admin**
2. Go to: Dashboard → Messages
3. **Check:** Your test message appears in table with:
   - Name
   - Email
   - Subject
   - Message
   - Timestamp

---

## Feature 14: About Us Page

### What to Test:
- Organization/project overview
- Mission & vision
- Team information

### Step-by-Step Testing:

#### Test 14.1: About Page Content
1. Go to: http://localhost:5173/about
2. **Check:** "About Us" title appears
3. **Check:** Project description visible:
   - "Smart E-Commerce & Service Management Platform..."
   - Description of the platform

#### Test 14.2: Mission Section
1. **Check:** "Mission" heading
2. **Check:** Mission statement visible:
   - "Provide a smooth and secure shopping experience..."

#### Test 14.3: Vision Section
1. **Check:** "Vision" heading
2. **Check:** Vision statement visible:
   - "Build a scalable platform that supports both customers and administrators."

#### Test 14.4: Team Section
1. **Check:** "Team" heading
2. **Check:** Team information visible:
   - "CSE-3532 Project Team"

---

## Feature 15: Footer

### What to Test:
- Quick links
- Social media icons
- Copyright
- Responsive layout

### Step-by-Step Testing:

#### Test 15.1: Footer Links
1. **Scroll to bottom** of any page
2. **Check:** Footer visible with links:
   - Home
   - Products
   - About
   - Contact
3. **Click each link** - should navigate correctly

#### Test 15.2: Social Media Icons
1. **Check:** Social media links visible:
   - Facebook
   - GitHub
   - LinkedIn
2. **Click each** - should open in new tab (if configured)

#### Test 15.3: Copyright
1. **Check:** Copyright text visible:
   - "Copyright © 2024 - Smart E-Commerce"
   - Year should be current year

#### Test 15.4: Responsive Layout
1. **Resize browser** to mobile size
2. **Check:** Footer adapts to smaller screen
3. **Check:** Links still clickable
4. **Check:** Layout doesn't break

---

## 🎯 Complete User Journey Testing

### Journey 1: New User Registration & Purchase

1. **Register:**
   - Go to /register
   - Fill form and register
   - ✅ Auto-logged in

2. **Browse Products:**
   - Go to /products
   - ✅ See product grid
   - ✅ Search works

3. **View Product:**
   - Click "View Details"
   - ✅ See full product details
   - ✅ See reviews section

4. **Add to Wishlist:**
   - Click "Toggle Wishlist"
   - ✅ Added to wishlist

5. **Place Order:**
   - Fill order form (quantity, phone, address)
   - Click "Place Order"
   - ✅ Order placed
   - ✅ Redirected to confirmation page

6. **View Order:**
   - Click "View My Orders"
   - ✅ Order appears in My Orders

7. **Submit Review:**
   - Go back to product details
   - Fill review form
   - ✅ Review submitted
   - ✅ Review appears in list

### Journey 2: Admin Management

1. **Login as Admin:**
   - Login with admin email
   - ✅ Admin Dashboard appears

2. **Add Product:**
   - Dashboard → Manage Products → Add Product
   - Fill form and create
   - ✅ Product created

3. **Manage Orders:**
   - Dashboard → Manage Orders
   - ✅ See all orders
   - ✅ Change order status
   - ✅ Status updates

4. **View Messages:**
   - Dashboard → Messages
   - ✅ See contact form submissions

### Journey 3: Social Login

1. **Google Login:**
   - Go to /login
   - Click "Continue with Google"
   - ✅ Logged in with Google

2. **Browse & Order:**
   - Browse products
   - Place order
   - ✅ Works same as email login

---

## ✅ Testing Checklist

### Basic Features:
- [ ] Navigation Bar (logo, links, responsive)
- [ ] Sliding Banner (auto-slide, CTAs)
- [ ] Products Section (grid, search)
- [ ] Product Details (info, reviews)
- [ ] Order Form (quantity, validation)
- [ ] Order Confirmation (summary, order ID)
- [ ] Email/Password Auth (register, login)
- [ ] Social Login (Google, GitHub)
- [ ] Admin Dashboard (products, orders, messages)
- [ ] User Dashboard (orders, wishlist)
- [ ] Review Form (submit, rating)
- [ ] Review Slider (auto-slide, display)
- [ ] Wishlist (add, view, remove)
- [ ] Contact Page (form, validation)
- [ ] About Page (mission, vision, team)
- [ ] Footer (links, social, copyright)

### Advanced Testing:
- [ ] Role-based access (admin vs user)
- [ ] Order status updates
- [ ] Review updates (not duplicates)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling (validation, network errors)
- [ ] Loading states (spinners, disabled buttons)

---

## 🐛 Common Issues & Solutions

### Issue: "No products showing"
**Solution:** Add products via Admin Dashboard first

### Issue: "Can't login"
**Solution:** 
- Check Firebase Authentication enabled
- Check .env file has correct Firebase config
- Restart frontend server

### Issue: "Admin dashboard not showing"
**Solution:** 
- Login with admin email: www.meselfomiofficial@gmail.com
- Check ADMIN_EMAILS in server/.env

### Issue: "Orders not appearing"
**Solution:** 
- Make sure you placed an order first
- Check you're logged in
- Check you're viewing correct dashboard (admin vs user)

---

## 📝 Notes

- **Test on different screen sizes:** Mobile, Tablet, Desktop
- **Test with different user roles:** Admin and Regular User
- **Test error scenarios:** Invalid inputs, network errors
- **Test all navigation:** Every link should work
- **Test authentication:** Login, logout, protected routes

---

**Happy Testing! 🎉**
