
import React from 'react';
import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';

export default function Siderbar({ children }: { children: React.ReactNode }) {
    const { setOpen, isMobile } = useSidebar();
    return (
        <SidebarProvider>
            <div className='flex h-screen w-full'>
                <AppSidebar />
                <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {isMobile && (
                        <SidebarTrigger className='md:hidden' onClick={() => setOpen(true)}></SidebarTrigger>
                    )}
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}