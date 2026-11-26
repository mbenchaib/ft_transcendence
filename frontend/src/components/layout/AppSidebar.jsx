import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import Logo from "@/assets/logo_lightMode.png"

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader> 
            <img
                src={Logo}
                alt="Miftah"
            />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar