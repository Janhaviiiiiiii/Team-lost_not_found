
import { Home, BarChart3, MessageCircle, User, TrendingUp, CreditCard, Target, FileBarChart } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Expenses", url: "/expenses", icon: CreditCard },
  { title: "Savings Goals", url: "/savings", icon: Target },
]

const otherItems = [
  { title: "AI Financial Report", url: "/financial-report", icon: FileBarChart },
  { title: "AI Assistant", url: "/chat", icon: MessageCircle },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "transition-colors",
      {
        "bg-primary text-primary-foreground hover:bg-primary/90 font-medium": isActive,
        "text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:text-sidebar-foreground": !isActive
      }
    )

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-64"} border-r border-sidebar-border bg-sidebar`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className={`font-bold text-xl text-sidebar-foreground ${isCollapsed ? 'hidden' : 'block'}`}>
            FinPal
          </h2>
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto py-4">
          <SidebarGroup>
            <SidebarGroupLabel className={`${isCollapsed ? 'hidden' : 'block'} text-sidebar-foreground/70 px-4 mb-2`}>
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2 space-y-1">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10 rounded-lg">
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="font-medium ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className={`${isCollapsed ? 'hidden' : 'block'} text-sidebar-foreground/70 px-4 mb-2`}>
              AI Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2 space-y-1">
                {otherItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10 rounded-lg">
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="font-medium ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
