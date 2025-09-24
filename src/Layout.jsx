import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Home, Calendar, Award, MapPin, User, Heart, Building, Shield, MessageCircle } from "lucide-react";
import Logo from "./components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
    color: "text-emerald-600"
  },
  {
    title: "Schedule Pickup",
    url: createPageUrl("SchedulePickup"),
    icon: Calendar,
    color: "text-blue-600"
  },
  {
    title: "Rewards",
    url: createPageUrl("Rewards"),
    icon: Award,
    color: "text-amber-600"
  },
  {
    title: "Find Bins",
    url: createPageUrl("FindBins"),
    icon: MapPin,
    color: "text-purple-600"
  },
  {
    title: "Community",
    url: createPageUrl("Community"),
    icon: Building,
    color: "text-pink-600"
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
    color: "text-gray-600"
  },
  {
    title: "Admin Portal",
    url: createPageUrl("Admin"),
    icon: Shield,
    color: "text-red-600"
  },
  {
    title: "Contact & Support",
    url: createPageUrl("Contact"),
    icon: MessageCircle,
    color: "text-cyan-600"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  // If it's the Landing page, don't wrap it with the standard app layout
  if (currentPageName === "Landing") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --primary-emerald: #10b981;
            --primary-emerald-light: #34d399;
            --primary-emerald-dark: #047857;
            --accent-amber: #f59e0b;
            --accent-blue: #3b82f6;
            --neutral-warm: #fef7f0;
            --text-primary: #1f2937;
            --text-secondary: #6b7280;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .mascot-bounce {
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .eco-gradient {
            background: linear-gradient(135deg, var(--primary-emerald) 0%, var(--primary-emerald-light) 100%);
          }
        `}
      </style>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-emerald-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-emerald-100 p-6">
            <Link to={createPageUrl("Landing")} className="flex items-center gap-3">
              <Logo size="medium" className="shadow-lg" />
              <div>
                <h2 className="font-bold text-xl text-gray-900">OpenBin</h2>
                <p className="text-sm text-emerald-600 font-medium">Recycling Made Joyful</p>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`rounded-xl p-4 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 ${
                          location.pathname === item.url 
                            ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200' 
                            : 'text-gray-700 hover:text-emerald-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-4">
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-8 p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200">
              <div className="text-center">
                <div className="text-4xl mb-2 mascot-bounce">🐕</div>
                <p className="text-sm font-medium text-emerald-700">Your Eco Buddy says:</p>
                <p className="text-xs text-gray-600 mt-1">"Every small step makes our planet cleaner!"</p>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-emerald-50 p-2 rounded-lg transition-colors duration-200" />
              <Link to={createPageUrl("Landing")} className="flex items-center gap-2">
                <Logo size="small" />
                <h1 className="text-xl font-bold text-gray-900">OpenBin</h1>
              </Link>
            </div>
          </header>

          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}