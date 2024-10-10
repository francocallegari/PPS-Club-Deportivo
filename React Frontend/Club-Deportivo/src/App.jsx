import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import Sports from "./components/sports/Sports";
import ProfilePage from "./components/profilePage/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import NewsGrid from "./components/newsGrid/NewsGrid";
import NewsDetail from "./components/newsDetail/NewsDetail";
import CalendarEvents from "./components/calendarEvents/CalendarEvents";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Register from "./components/login/Register"

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
      path: "/news",
      element: (
        <MainLayout>
          <NewsGrid />
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
      path: "/calendar",
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
      path: "/register",
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      ),
    },
    {
      path: "/*",
      element: (
        <MainLayout>
          <PageNotFound />
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
