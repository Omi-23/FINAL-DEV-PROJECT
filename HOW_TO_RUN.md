# How to Run the Smart E-Commerce Platform

## Prerequisites
- Node.js installed (v18 or higher recommended)
- MongoDB Atlas account (already configured)
- Firebase project (already configured)

## Step-by-Step Instructions

### 1. Verify Environment Variables

#### Server (.env in `server/` folder)
Make sure these are set:
- `PORT=5001` (or your preferred port)
- `MONGODB_URI=your_mongodb_connection_string`
- `CORS_ORIGIN=http://localhost:5173`
- `ADMIN_EMAILS=your_admin_email@example.com`
- `FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json`

#### Client (.env in `client/` folder)
Make sure these are set:
- `VITE_API_BASE_URL=http://localhost:5001` (must match server PORT)
- `VITE_FIREBASE_API_KEY=your_firebase_api_key`
- `VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain`
- `VITE_FIREBASE_PROJECT_ID=your_firebase_project_id`
- `VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket`
- `VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id`
- `VITE_FIREBASE_APP_ID=your_firebase_app_id`

### 2. Install Dependencies (if not already installed)

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Run the Application

You need to run BOTH the backend server and frontend client in separate terminal windows.

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

Expected output:
```
MongoDB connected
Server listening on 5001
```

#### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Access the Application

- Frontend: Open http://localhost:5173 in your browser
- Backend API: http://localhost:5001

## Troubleshooting

### Problem: "MongoDB connection failed"
**Solution:**
- Check your `MONGODB_URI` in `server/.env`
- Ensure your MongoDB Atlas cluster is running
- Verify your IP is whitelisted in MongoDB Atlas
- Check your MongoDB username/password are correct

### Problem: "Firebase Admin initialization failed"
**Solution:**
- Verify `serviceAccountKey.json` exists in `server/` folder
- Check `FIREBASE_SERVICE_ACCOUNT_PATH` in `server/.env` points to the correct file
- Ensure the service account JSON file is valid

### Problem: "CORS error" or "Network error"
**Solution:**
- Ensure backend is running on port 5001
- Check `CORS_ORIGIN` in `server/.env` matches frontend URL (http://localhost:5173)
- Verify `VITE_API_BASE_URL` in `client/.env` matches backend URL (http://localhost:5001)

### Problem: "Firebase authentication not working"
**Solution:**
- Verify all Firebase environment variables in `client/.env` are correct
- Check Firebase project settings in Firebase Console
- Ensure Firebase Authentication is enabled in Firebase Console
- Verify Google/GitHub providers are enabled in Firebase Authentication settings

### Problem: "Port already in use"
**Solution:**
- Change `PORT` in `server/.env` to a different port (e.g., 5002)
- Update `VITE_API_BASE_URL` in `client/.env` to match
- Update `CORS_ORIGIN` in `server/.env` if needed

### Problem: "Module not found" errors
**Solution:**
- Delete `node_modules` folders in both `server/` and `client/`
- Delete `package-lock.json` files
- Run `npm install` again in both directories

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

## Production Build

```bash
# Build frontend
cd client
npm run build

# Start server (production mode)
cd server
npm start
```
