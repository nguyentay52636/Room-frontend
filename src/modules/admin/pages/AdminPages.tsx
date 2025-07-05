import { PropsWithChildren, useEffect, useState } from 'react';
import Siderbar from '../components/SiderBar/SiderbarNavigate'
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';


export default function AdminPages({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return (

        <SidebarProvider>
            {/* <Header /> */}
            <Siderbar >
                <main className="overflow-y-auto bg-background theme-transition">
                    {children || <Outlet />}
                </main>
            </Siderbar>
        </SidebarProvider>
    )
}