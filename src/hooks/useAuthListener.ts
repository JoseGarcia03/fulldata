import { useEffect } from "react";
import { useAppDispatch } from "./useRedux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { clearUser, setUser } from "../redux/slices/authSlice";
import { doc, getDoc } from "firebase/firestore";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return dispatch(clearUser());

      const uid = firebaseUser.uid;

      try {
        const userSnap = await getDoc(doc(db, "usuarios", uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          dispatch(setUser({
            uid,
            displayName: data.displayName || "",
            email: data.email || "",
            isAdmin: data.isAdmin === true,
            isLeaderCrew: data.isLeaderCrew || false,
            password: data.password || "",
            phone: data.phone || "",
            createdBy: data.createdBy || "",
            verify: false,
            createdAt: data?.createdAt?.toDate?.().toISOString() || null,
            role: "admin",
          }));
          return;
        }

        const contractorSnap = await getDoc(doc(db, "contratistas", uid));
        if (contractorSnap.exists()) {
          const data = contractorSnap.data();
          dispatch(setUser({
            uid,
            displayName: data.displayName || "",
            email: data.email || "",
            isAdmin: false,
            isLeaderCrew: data.isLeaderCrew || false,
            password: data.password || "",
            phone: data.phone || "",
            createdBy: data.createdBy || "",
            verify: data.verify || false,
            createdAt: data?.createdAt?.toDate?.().toISOString() || null,
            crew: data.crew || null,
            role: "contratista",
          }));
          return;
        }

        dispatch(clearUser());
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};