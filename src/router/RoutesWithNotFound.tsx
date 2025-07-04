import type { ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/otherPages/NotFound";

interface Props {
  children: ReactNode;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      { children }

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}