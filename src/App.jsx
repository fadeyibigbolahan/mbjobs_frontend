import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/theme-context";
import Layout from "./pages/layout";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import useAuthCheck from "./hooks/useAuthCheck";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded pages (dynamically imported for better performance)
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const VerificationPage = lazy(() => import("./pages/VerificationPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProfileSettingsPage = lazy(() => import("./pages/ProfileSettingsPage"));
const HelpSupportPage = lazy(() => import("./pages/HelpSupportPage"));
const PlansPage = lazy(() => import("./pages/PlansPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));

const JobApplicationPage = lazy(() => import("./pages/JobApplicationPage"));
const PostJobPage = lazy(() => import("./pages/PostJobPage"));
const MyJobsPage = lazy(() => import("./pages/MyJobsPage"));
const BrowseJobsPage = lazy(() => import("./pages/BrowseJobsPage"));
const BrowseCoursesPage = lazy(() => import("./pages/BrowseCoursesPage"));
const MyApplicationsPage = lazy(() => import("./pages/MyApplicationsPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));

const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const MyCoursesPage = lazy(() => import("./pages/MyCoursesPage"));
const EmployerProfilePage = lazy(() => import("./pages/EmployerProfilePage"));
const ApprenticeDashboardPage = lazy(() =>
  import("./pages/ApprenticeDashboardPage")
);
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const ManageUsersPage = lazy(() => import("./pages/ManageUsersPage"));
const ManageApplicationsPage = lazy(() =>
  import("./pages/ManageApplicationsPage")
);
const CreateCoursePage = lazy(() => import("./pages/CreateCoursePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const FAQSupportPage = lazy(() => import("./pages/FAQSupportPage"));
const LiveChatPage = lazy(() => import("./pages/LiveChatPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccessPage"));

function App() {
  useAuthCheck(); // Automatically logout when token expires

  const router = createHashRouter(
    [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/faqs",
        element: <FAQSupportPage />,
      },
      {
        path: "/live-chat",
        element: <LiveChatPage />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        ),
        children: [
          { path: "overview", element: <DashboardPage /> },
          { path: "apprentice-overview", element: <ApprenticeDashboardPage /> },
          { path: "admin-overview", element: <AdminDashboardPage /> },
          { path: "job-application", element: <JobApplicationPage /> },
          { path: "post-job", element: <PostJobPage /> },
          { path: "my-jobs", element: <MyJobsPage /> },
          { path: "browse-jobs", element: <BrowseJobsPage /> },
          { path: "job-details", element: <JobDetailsPage /> },
          { path: "manage-users", element: <ManageUsersPage /> },
          { path: "manage-applications", element: <ManageApplicationsPage /> },
          { path: "create-course", element: <CreateCoursePage /> },
          { path: "my-applications", element: <MyApplicationsPage /> },
          { path: "browse-courses", element: <BrowseCoursesPage /> },
          { path: "course-details/:courseId", element: <CourseDetailsPage /> },
          { path: "my-courses", element: <MyCoursesPage /> },
          { path: "user-profile", element: <UserProfilePage /> },
          { path: "profile-settings", element: <ProfileSettingsPage /> },
          { path: "company-settings", element: <EmployerProfilePage /> },
          { path: "category", element: <CategoryPage /> },
          { path: "help-support", element: <HelpSupportPage /> },
        ],
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      { path: "/signin", element: <SigninPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/verification", element: <VerificationPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/features", element: <FeaturesPage /> },
      // { path: "/solution", element: <SolutionPage /> },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
    {
      basename: "/",
    }
  );

  return (
    <ThemeProvider storageKey="theme">
      <Suspense
        fallback={
          <div className="loading-spinner">
            <Loading />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
