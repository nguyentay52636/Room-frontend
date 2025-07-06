import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import HomePage from '@/modules/home/pages/HomePage';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './components/language-provider';
import Login from './modules/auth/components/Login/Login';
import Register from './modules/auth/components/Register/Register';
import SkeletonLoading from './components/SkeletonLoading/SkeletonLoading';
import ProductDetails from './modules/home/components/Products/components/ProductDetails/ProductDetails';
import News from './modules/home/components/News/News';
import PostNew from './modules/home/post/PostNew';
import AdminPages from './modules/admin/pages/AdminPages';
import ManagerCustomers from './modules/admin/components/Customer/ManagerCustomers';
import DashBoard from './modules/admin/components/Dashboard/ManagerDashBoard';
import Revenue from './modules/admin/components/Revenue/ManagerRevenue';
import ManagerRealEstate from './modules/admin/components/RealEstate/ManagerRealEstate';
import ManagerAccount from './modules/admin/components/Account/ManagerAccount';
import NotFound from './components/NotFound404/NotFound';
import ManagerHome from './modules/admin/components/Home/ManagerHome';
import ManagerEmployee from './modules/admin/components/Employee/ManagerEmployee';

function App() {
  const router = createBrowserRouter([
    // Main layout
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/',
      element: <MainLayout />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
          ],
        },
        {
          path: 'products',
          element: <ProductDetails params={{ id: '1' }} />,
        },
        {
          path: 'news',
          element: <News />
        },
        {
          path: 'create-post-news',
          element: <PostNew />
        },

      ],
    },
    {
      path: 'admin',
      element: <AdminPages />,
      children: [
        {
          index: true,
          element: <ManagerHome />

        },
        {
          path: 'account',
          element: <ManagerAccount />
        },
        {
          path: 'customers',
          element: <ManagerCustomers />
        },
        {
          path: 'employee',
          element: <ManagerEmployee />
        },
        {
          path: 'dashboard',
          element: <DashBoard />

        },
        {
          path: 'revenue',
          element: <Revenue />
        },
        {
          path: 'realestate',
          element: <ManagerRealEstate />
        },
        {
          path: 'accounts',
          element: <ManagerAccount />
        }


      ]
    }
  ]);
  return (
    <SkeletonLoading loadingTime={2000} loadingText="Đang tải ứng dụng...">

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LanguageProvider>
          <>
            <RouterProvider router={router} />
          </>
        </LanguageProvider>
      </ThemeProvider>

    </SkeletonLoading>
  );
}

export default App;
