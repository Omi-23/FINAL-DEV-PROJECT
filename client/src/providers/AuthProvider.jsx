import { createContext, useEffect, useMemo, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase/firebase.config.js";
import { api, setApiAuthToken } from "../api/apiClient.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (!currentUser) {
        setRole(null);
        setToken(null);
        setApiAuthToken(null);
        setLoading(false);
        return;
      }

      const idToken = await currentUser.getIdToken();
      setToken(idToken);
      setApiAuthToken(idToken);

      try {
        const res = await api.get("/api/users/me");
        setRole(res.data?.data?.role || "user");
      } catch (e) {
        setRole("user");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({
      user,
      loading,
      role,
      token,
      register,
      login,
      loginWithGoogle,
      loginWithGithub,
      logout
    }),
    [user, loading, role, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
