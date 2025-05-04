
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useToast } from "@/components/ui/use-toast";
import { Bell, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  navigationItems: Array<{
    title: string;
    url: string;
    icon: React.ElementType;
  }>;
  userName: string;
  userRole: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  role, 
  navigationItems, 
  userName, 
  userRole 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New announcement posted', read: false },
    { id: 2, title: 'Assignment deadline updated', read: false }
  ]);

  const handleLogout = () => {
    logout(); // Use the AuthContext's logout method
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications marked as read",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                SMS
              </div>
              <div>
                <h2 className="font-semibold">School MS</h2>
              </div>
            </div>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </Sidebar>
        
        <div className="flex-1">
          <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold capitalize">{role} Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="link" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-auto">
                    {notifications.length > 0 ? notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-md ${notification.read ? 'bg-muted/50' : 'bg-secondary'}`}
                      >
                        <p className="text-sm">{notification.title}</p>
                      </div>
                    )) : (
                      <p className="text-sm text-muted-foreground text-center py-2">No notifications</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Avatar className="h-8 w-8" />
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
