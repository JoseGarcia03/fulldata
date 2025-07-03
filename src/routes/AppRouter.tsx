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
import { Contractors } from "../pages/contractor/Contractors"
import { Toaster } from "react-hot-toast"
import { AddContractor } from "../pages/contractor/AddContractor"

export const AppRouter = () => {
    const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userSnap = await getDoc(doc(db, "usuarios", firebaseUser.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          dispatch(setUser({
            uid: data.uid,
            displayName: data.displayName,
            email: data.email,
            isAdmin: data.isAdmin,
            isLeaderCrew: data.isLeaderCrew || false,
            password: data.password || "",
            phone: data.phone || "",
            createdBy: data.createdBy || "",
            verify: false,
            createdAt: data?.createdAt?.toDate().toISOString(),
          }));
          return;
        } else {
          dispatch(clearUser());
        }
      }

      dispatch(clearUser());
    })

    return () => unsubscribe();
  }, [dispatch])

  return (
    <>
      <Router>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to="/signin" />} />

          <Route element={<PublicGuard />}>
            <Route index path="/signin" element={<SignIn />}  />
            <Route path="/signup" element={<SignUp />}  />
          </Route>

          <Route element={<AuthGuard />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<h1 className="text-base font-medium text-gray-800 dark:text-white/90">Bienvenido...</h1>} />
              <Route path="/contractors" element={<Contractors />} />
              <Route path="/contractors/add-contractor" element={<AddContractor />} />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </Router>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} containerStyle={{ zIndex: 999999 }} />
    </>
  )
}