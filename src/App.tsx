import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import HomePage from '@/modules/home/pages/HomePage';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './components/language-provider';
import Login from './modules/auth/components/Login/Login';
import Register from './modules/auth/components/Register/Register';

function App() {
  const router = createBrowserRouter([
    // Main layout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <h1>About</h1>,
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
      ],
    },
  ]);
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <>
          <RouterProvider router={router} />
        </>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
