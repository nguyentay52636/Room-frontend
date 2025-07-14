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
import ChatManager from './modules/admin/components/Chat/ChatManager';
import ReviewsManager from './modules/admin/components/Reviews/ReviewsManager';
import TestProperties from './modules/admin/components/RealEstate/TestProperties';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './modules/auth/components/Profile/Profile';
import ChatHome from './modules/home/components/chat/ChatHome';
import Products from './modules/home/components/Products/Products';
import Success from './modules/auth/components/Facebook/success';
import Failure from './modules/auth/components/Facebook/Failure';
import { Component, ReactNode } from 'react';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />,
    },
    // Add top-level routes for Facebook auth callbacks
    {
      path: '/success',
      element: <Success />,
    },
    {
      path: '/failure',
      element: <Failure />,
    },
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <div className="p-8 text-center"><h2>Lỗi routing</h2><p>Có lỗi xảy ra khi điều hướng.</p></div>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'profile',
          element: <Profile />
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
            {
              path: 'facebook/success',
              element: <Success />,
            },
            {
              path: 'facebook/failure',
              element: <Failure />,
            },
          ],
        },
        {
          path: 'products',
          children: [
            {
              index: true,
              element: <Products />
            },
            {
              path: ':id',
              element: <ProductDetails />
            }
          ]
        },
        {
          path: 'news',
          element: <News />
        },
        {
          path: 'create-post-news',
          element: <PostNew />
        },
        {
          path: 'chat',
          element: <ChatHome />
        },

      ],
    },
    {
      path: 'admin',
      element: <AdminPages />,
      errorElement: <div className="p-8 text-center"><h2>Lỗi admin</h2><p>Có lỗi xảy ra trong trang quản trị.</p></div>,
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
        },
        {
          path: 'chat',
          element: <ChatManager />
        },
        {
          path: 'reviews',
          element: <ReviewsManager />
        },
        {
          path: 'test',
          element: <TestProperties />
        }


      ]
    }
  ]);

  return (
    <ErrorBoundary>
      <SkeletonLoading loadingTime={2000} loadingText="Đang tải ứng dụng...">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <LanguageProvider>
            <>
              <RouterProvider router={router} />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="custom-toast"
              />
            </>
          </LanguageProvider>
        </ThemeProvider>
      </SkeletonLoading>
    </ErrorBoundary>
  );
}

export default App;
