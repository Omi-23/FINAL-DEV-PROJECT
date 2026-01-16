# ⚡ Quick Testing Reference
## All Features - Quick Steps

---

## 🚀 Quick Start Testing Order

### 1. Setup (Do First!)
- [ ] Backend running: http://localhost:5001
- [ ] Frontend running: http://localhost:5173
- [ ] Add 3-5 products (Admin Dashboard)

### 2. Test Authentication
- [ ] Register new user: `/register`
- [ ] Login: `/login`
- [ ] Google login: Click "Continue with Google"
- [ ] GitHub login: Click "Continue with GitHub"
- [ ] Logout: Click "Logout" button

### 3. Test Products
- [ ] View products: `/products`
- [ ] Search products: Type in search box
- [ ] View details: Click "View Details"
- [ ] Add to wishlist: Click "Toggle Wishlist"

### 4. Test Ordering
- [ ] Place order: Fill form on product details page
- [ ] View confirmation: `/order-confirmation/:id`
- [ ] View my orders: Dashboard → My Orders
- [ ] Edit order: Click "Edit" in My Orders
- [ ] Cancel order: Click "Cancel" in My Orders

### 5. Test Reviews
- [ ] Submit review: Fill form on product details
- [ ] View reviews: Scroll to Reviews section
- [ ] View review slider: Home page → Customer Reviews

### 6. Test Admin (Login as admin email)
- [ ] Add product: Dashboard → Manage Products → Add Product
- [ ] Edit product: Click "Edit" in Manage Products
- [ ] Delete product: Click "Delete" in Manage Products
- [ ] Manage orders: Dashboard → Manage Orders
- [ ] Change order status: Select from dropdown
- [ ] View messages: Dashboard → Messages

### 7. Test Other Features
- [ ] Contact form: `/contact` → Fill and submit
- [ ] About page: `/about` → Check content
- [ ] Footer: Scroll to bottom → Check links
- [ ] Navigation: Click all navbar links
- [ ] Responsive: Resize browser → Check hamburger menu

---

## 📋 Feature List (All 15 Features)

1. ✅ **Navigation Bar** - Logo, links, login/logout, hamburger menu
2. ✅ **Sliding Banner** - Auto-slide, CTAs, featured benefits
3. ✅ **Products Section** - Grid layout, search, product cards
4. ✅ **Product Details** - Full info, price, ratings, reviews
5. ✅ **Purchasing** - Order form, quantity, validation
6. ✅ **Order Confirmation** - Summary, order ID, status
7. ✅ **Email/Password Auth** - Register, login, validation
8. ✅ **Social Login** - Google, GitHub
9. ✅ **Dashboard (Admin)** - Products, orders, messages
10. ✅ **Dashboard (User)** - Orders, wishlist
11. ✅ **Review Form** - Submit rating + comment
12. ✅ **Review Slider** - Auto-slide reviews on home
13. ✅ **Wishlist** - Add, view, remove (Unique Feature)
14. ✅ **Contact Page** - Form, validation, message storage
15. ✅ **About Page** - Mission, vision, team info
16. ✅ **Footer** - Links, social media, copyright

---

## 🎯 Key URLs

- **Home:** http://localhost:5173
- **Products:** http://localhost:5173/products
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Dashboard:** http://localhost:5173/dashboard
- **Contact:** http://localhost:5173/contact
- **About:** http://localhost:5173/about
- **Wishlist:** http://localhost:5173/wishlist

---

## 👤 Test Accounts

### Admin Account:
- **Email:** www.meselfomiofficial@gmail.com
- **Password:** (Your Firebase password)
- **Access:** Full admin dashboard

### Regular User:
- **Create via:** `/register`
- **Access:** User dashboard only

---

## 🔑 Key Testing Scenarios

### Scenario 1: New User Journey
1. Register → Browse → View Product → Add Wishlist → Place Order → Submit Review

### Scenario 2: Admin Management
1. Login as Admin → Add Product → Manage Orders → View Messages

### Scenario 3: Social Login
1. Google Login → Browse → Order → Review

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| No products | Add via Admin Dashboard |
| Can't login | Check Firebase config, restart server |
| Admin dashboard not showing | Login with admin email |
| Orders not appearing | Place order first, check correct dashboard |

---

## 📱 Responsive Testing

- **Mobile:** < 768px (hamburger menu)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## ✅ Final Checklist

- [ ] All 15 features tested
- [ ] Admin features work
- [ ] User features work
- [ ] Authentication works (email, Google, GitHub)
- [ ] Orders work (place, view, edit, cancel)
- [ ] Reviews work (submit, view, slider)
- [ ] Wishlist works (add, view, remove)
- [ ] Responsive design works
- [ ] All links navigate correctly
- [ ] Error handling works

---

**For detailed step-by-step instructions, see: `COMPLETE_FEATURE_TESTING_GUIDE.md`**
