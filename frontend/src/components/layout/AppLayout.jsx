import AppSidebar from "@/components/layout/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
        </SidebarProvider>
    )
}

export default AppLayout