import { PropsWithChildren, useState } from 'react';
import Siderbar from '../components/Sider/Siderbar'
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export default function AdminPages({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <SidebarProvider>
            <Siderbar>
                <Header />
                <main className=" overflow-y-auto bg-gray-100">
                    {children || <Outlet />}
                </main>
            </Siderbar>
        </SidebarProvider>
    )
}