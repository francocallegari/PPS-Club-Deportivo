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
import ActivitiesGrid from "./components/activitiesGrid/ActivitiesGrid";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";

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
      path: "/activities",
      element: (
        <MainLayout>
          <ActivitiesGrid />
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
