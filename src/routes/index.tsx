import { lazy, Suspense } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import LayoutDefault from "../components/Layout";
import ErrorPage from "../pages/Error";
import ScheduleBoard from "../components/Calendar/ScheduleBoard";
import Home from "../pages/Home";
import DestinationPage from "../pages/Destination/DestinationPage";
import DestinationDetailPage from "../pages/Destination/destinationDetailPage";
import PostListPage from "../pages/PostListPage/PostListPage";
import AdminManagement from "../pages/Admin/AdminManagement";
import AboutPage from "../pages/About";
const Login = lazy(() => import("../pages/Account/Login"));
const Logout = lazy(() => import("../pages/Account/Logout"));
const Chat = lazy(() => import("../pages/Chat"));
const Profile = lazy(() => import("../User/Profile"));
const Planner = lazy(() => import("../pages/Planner"));

// Wrapper component that will extract URL parameters for the Planner
const PlannerWithParams = () => {
  const [searchParams] = useSearchParams();
  
  // Extract query parameters that will be passed to the Planner component
  const queryParams = {
    duration: searchParams.get("duration"),
    interests: searchParams.get("interest"),
    location: searchParams.get("location"),
    includeDestination: searchParams.get("includeDestination"),
  };

  return (
    <Suspense fallback={<Loading />}>
      <Planner urlParams={queryParams} />
    </Suspense>
  );
};

// Component for path parameter based routing
interface PlannerProps {
  urlParams?: {
    duration: string | null | undefined;
    interests: string | null | undefined;
    location: string | null | undefined;
    includeDestination: string | null | undefined;
  };
}
const PlannerWithPathParams = () => {
  const { duration, interest, location, includeDestination } = useParams();
  
  const pathParams: PlannerProps['urlParams'] = {
    duration,
    interests: interest,
    location,
    includeDestination
  };

  return (
    <Suspense fallback={<Loading />}>
      <Planner urlParams={pathParams} />
    </Suspense>
  );
};

// Loading component for Suspense
const Loading = () => (
  <div className="flex justify-center items-center h-screen">Loading...</div>
);

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/destination",
        element: <DestinationPage />,
      },
      {
        path: "/destination/:id",
        element: <DestinationDetailPage />,
      },
      {
        path: "/post",
        element: <PostListPage />,
      },
      {
        path: "/schedule",
        element: (
          <div className="container mx-auto">
            <ScheduleBoard />,
          </div>
        ),
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<Loading />}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "/planner",
        element: <PlannerWithParams />,
      },
      {
        path: "/planner/:duration/:interest/:location/:includeDestination",
        element: <PlannerWithPathParams />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/admin",
        element: <AdminManagement />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/chat",
    element: (
      <Suspense fallback={<Loading />}>
        <Chat />
      </Suspense>
    ),
  },
];
