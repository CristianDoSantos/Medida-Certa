import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/sidebar/sidebar";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="cursor-pointer" />
      <main className="min-h-screen flex flex-col items-center justify-start py-4 px-0 w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}