import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import Sports from "./components/sports/Sports";
import ProfilePage from "./components/profilePage/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import NewsDetail from "./components/newsDetail/NewsDetail";
import ActivitiesGrid from "./components/activitiesGrid/ActivitiesGrid";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import SessionsList from "./components/sessionsList/SessionsList";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Director from "./components/director/Director";
import Register from "./components/login/Register";
import ClubInfo from "./components/club/Club";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import CalendarEvents from "./components/calendarEvents/CalendarEvents";
import Admin from "./components/admin/Admin";
import Protected from "./components/protectedRoute/Protected";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      ),
    },
    {
      path: "/sports",
      element: (
        <MainLayout>
          <Sports />
        </MainLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <MainLayout>
          <ProfilePage />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      ),
    },
    {
      path: "/password",
      element: (
        <MainLayout>
          <ResetPassword />
        </MainLayout>
      ),
    },
    {
      path: "/noticia/:id",
      element: (
        <MainLayout>
          <NewsDetail />
        </MainLayout>
      ),
    },
    {
      path: "/activities",
      element: (
        <MainLayout>
          <CalendarEvents />
        </MainLayout>
      ),
    },
    {
      path: "/payment",
      element: (
        <MainLayout>
          <PaymentMethod />
        </MainLayout>
      ),
    },
    {
      path: "/sessions",
      element: (
        <MainLayout>
          <SessionsList />
        </MainLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      ),
    },
    {
      path: "/director",
      element: (
        <MainLayout>
          <Director />
        </MainLayout>
      ),
    },
    {
      path: "/club",
      element: (
        <MainLayout>
          <ClubInfo />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <PageNotFound />
        </MainLayout>
      ),
    },
    {
      path: "/admin",
      element: (
        <MainLayout>
          <Admin />
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
