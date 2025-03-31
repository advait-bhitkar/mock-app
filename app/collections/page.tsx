"use client"

import { AppSidebar } from "@/components/app-sidebar"
import ProtectedRoute from "@/components/protected-route"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function CollectionsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      MockAPI
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Collections</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">API Collections</h1>
            <p className="text-muted-foreground">Manage your API collections and endpoints.</p>
            
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">User Management API</h3>
                <p className="text-sm text-muted-foreground mb-4">Authentication and user management endpoints</p>
                <div className="text-xs text-muted-foreground">12 endpoints</div>
              </div>
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">Product Catalog</h3>
                <p className="text-sm text-muted-foreground mb-4">Product listing and inventory management</p>
                <div className="text-xs text-muted-foreground">8 endpoints</div>
              </div>
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">Payment Gateway</h3>
                <p className="text-sm text-muted-foreground mb-4">Payment processing and transactions</p>
                <div className="text-xs text-muted-foreground">6 endpoints</div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 