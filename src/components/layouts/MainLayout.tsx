import { Footer } from '@/components/Footer';

import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children || <Outlet />}
      <Footer />
    </div>
  );
}
