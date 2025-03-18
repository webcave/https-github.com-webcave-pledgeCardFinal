import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/DummyAuthContext";
import PageLayout from "./components/layout/PageLayout";

// Lazy load components for better performance
const CampaignsPage = lazy(
  () => import("./components/campaigns/CampaignsPage"),
);
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const CampaignWrapper = lazy(
  () => import("./components/campaigns/CampaignWrapper"),
);
const CampaignCreationWrapper = lazy(
  () => import("./components/campaigns/CampaignCreationWrapper"),
);
const CampaignEditWrapper = lazy(
  () => import("./components/campaigns/CampaignEditWrapper"),
);
const UserDashboard = lazy(
  () => import("./components/dashboard/UserDashboard"),
);
const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const SignupPage = lazy(() => import("./components/auth/SignupPage"));

function App() {
  // Tempo routes
  {
    import.meta.env.VITE_TEMPO === "true" && useRoutes(routes);
  }

  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Loading...</p>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignWrapper />} />
            <Route
              path="/campaigns/:id/edit"
              element={<CampaignEditWrapper />}
            />
            <Route
              path="/campaigns/create"
              element={<CampaignCreationWrapper />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route
              path="/dashboard/donations"
              element={<UserDashboard activeTab="donations" />}
            />
            <Route
              path="/dashboard/pledges"
              element={<UserDashboard activeTab="pledges" />}
            />
            <Route
              path="/dashboard/campaigns"
              element={<UserDashboard activeTab="campaigns" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Add this to allow Tempo to capture routes before any catchall */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
            <Route
              path="*"
              element={
                <PageLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                </PageLayout>
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
