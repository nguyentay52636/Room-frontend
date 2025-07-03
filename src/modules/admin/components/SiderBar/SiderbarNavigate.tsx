
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/modules/admin/components/SiderBar/components/app-sidebar';


export default function Siderbar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className='flex h-screen w-full'>
                <AppSidebar />
                <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}