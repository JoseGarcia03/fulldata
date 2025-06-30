import { Navigate, Route, BrowserRouter as Router } from "react-router-dom"
import { RoutesWithNotFound } from "./RoutesWithNotFound"
import { SignIn } from "../pages/auth/SignIn"
import { SignUp } from "../pages/auth/SignUp"
import { AuthGuard } from "../guards/AuthGuard"
import { AppLayout } from "../components/layout/AppLayout"
import { PublicGuard } from "../guards/PublicGuard"
import { useAppDispatch } from "../hooks/useRedux"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase/firebase-config"
import { doc, getDoc } from "firebase/firestore"
import { clearUser, setUser } from "../redux/slices/authSlice"

export const AppRouter = () => {
    const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "usuarios", firebaseUser.uid));
        const extra = userDoc.exists() ? userDoc.data() : null;
        dispatch(setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          isAdmin: extra?.isAdmin,
          createdAt: extra?.createdAt
        }));
      } else {
        dispatch(clearUser());
      }
    })

    return () => unsubscribe();
  }, [dispatch])

  return (
    <Router>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to="/signin" />} />

        <Route element={<PublicGuard />}>
          <Route index path="/signin" element={<SignIn />}  />
          <Route path="/signup" element={<SignUp />}  />
        </Route>

        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<h1>Hola Mundo</h1>} />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </Router>
  )
}