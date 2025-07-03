import { PropsWithChildren, useState } from 'react';
import Siderbar from '../components/SiderBar/SiderbarNavigate'
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export default function AdminPages({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (

        <SidebarProvider>
            {/* <Header /> */}
            <Siderbar>
                <main className=" overflow-y-auto bg-gray-100">
                    {children || <Outlet />}
                </main>
            </Siderbar>
        </SidebarProvider>
    )
}