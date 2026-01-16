# 🚀 QUICK START GUIDE - Run Your Project

## ⚠️ IMPORTANT: Port 5001 is Currently in Use

Your backend server is likely already running on port 5001. Here's how to proceed:

## Option 1: Use the Already Running Server (Recommended)

If your backend is already running, just start the frontend:

```bash
# Open a NEW terminal window
cd client
npm run dev
```

Then open http://localhost:5173 in your browser.

## Option 2: Stop and Restart Everything

### Step 1: Stop the Running Server
```bash
# Find and kill the process using port 5001
# On Windows:
netstat -ano | findstr :5001
# Note the PID (Process ID) from the output
taskkill /PID <PID_NUMBER> /F

# Or simply close the terminal where the server is running
```

### Step 2: Start Backend Server
```bash
cd server
npm run dev
```

Wait for: `MongoDB connected` and `Server listening on 5001`

### Step 3: Start Frontend (in a NEW terminal)
```bash
cd client
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Open Browser
Go to: **http://localhost:5173**

---

## ✅ Verification Checklist

Before running, verify:

- [x] MongoDB connection string is correct in `server/.env`
- [x] Firebase config is correct in `client/.env`
- [x] `serviceAccountKey.json` exists in `server/` folder
- [x] Port 5001 is available (or change to another port)
- [x] All dependencies installed (`node_modules` exist)

---

## 🔧 If You Need to Change Ports

If port 5001 is busy and you want to use a different port:

1. **Edit `server/.env`:**
   ```
   PORT=5002
   CORS_ORIGIN=http://localhost:5173
   ```

2. **Edit `client/.env`:**
   ```
   VITE_API_BASE_URL=http://localhost:5002
   ```

3. Restart both servers

---

## 📝 Current Configuration

- **Backend Port:** 5001
- **Frontend Port:** 5173
- **Backend URL:** http://localhost:5001
- **Frontend URL:** http://localhost:5173
- **MongoDB:** Connected ✓
- **Firebase:** Configured ✓

---

## 🐛 Common Errors & Solutions

### Error: "EADDRINUSE: address already in use"
**Fix:** Port is already in use. Stop the existing process or change port.

### Error: "MongoDB connection failed"
**Fix:** Check `MONGODB_URI` in `server/.env` - ensure it's correct and MongoDB Atlas allows your IP.

### Error: "Firebase Admin initialization failed"
**Fix:** Check `FIREBASE_SERVICE_ACCOUNT_PATH` in `server/.env` points to `./serviceAccountKey.json`

### Error: "CORS error" in browser
**Fix:** Ensure `CORS_ORIGIN` in `server/.env` matches frontend URL (http://localhost:5173)

---

## 🎯 Quick Commands

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client  
npm run dev
```

**That's it! Your project should be running!** 🎉
