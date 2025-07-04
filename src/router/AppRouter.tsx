import { Navigate, Route, BrowserRouter as Router } from "react-router-dom";
import { RoutesWithNotFound } from "./RoutesWithNotFound";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { AuthGuard } from "../guards/AuthGuard";
import { PublicGuard } from "../guards/PublicGuard";
import { Toaster } from "react-hot-toast";
import { ContractorGuard } from "../guards/ContractorGuard";
import { AdminRoutes } from "./routes/AdminRoutes";
import { ContractorRoutes } from "./routes/ContractorRoutes";
import { useAuthListener } from "../hooks/useAuthListener";

export const AppRouter = () => {
  useAuthListener()

  return (
    <>
      <Router>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to="/signin" />} />

          <Route element={<PublicGuard />}>
            <Route index path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AuthGuard />}>
            {AdminRoutes()}
          </Route>

          {/* Contractor Routes */}
          <Route element={<ContractorGuard />}>
            {ContractorRoutes()}
          </Route>
        </RoutesWithNotFound>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
        containerStyle={{ zIndex: 999999 }}
      />
    </>
  );
};
