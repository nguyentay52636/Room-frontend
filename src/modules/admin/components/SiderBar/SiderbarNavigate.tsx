
import React, { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/modules/admin/components/SiderBar/components/AppSider/app-sidebar';
import { ThemeProvider, useTheme } from '@/components/theme-provider';


export default function Siderbar({ children }: { children: React.ReactNode }) {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("light");
    }, [setTheme]);

    return (
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
            <SidebarProvider>
                <div className='flex h-screen w-full'>
                    <AppSidebar />
                    <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
}