import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./Layout";
import { AboutPage } from "../pages/AboutPage";
import { BlogPage } from "../pages/BlogPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { SupportPage } from "../pages/SupportPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/o-kompanii" element={<AboutPage />} />
        <Route path="/podderjka" element={<SupportPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy/" element={<Navigate replace to="/privacy-policy" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
