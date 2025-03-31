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
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function LogsPage() {
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
                    <BreadcrumbPage>Logs</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">API Request Logs</h1>
            <p className="text-muted-foreground">View detailed logs of all API requests.</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="w-full pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead className="text-right">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">2023-06-01 14:32:15</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">GET</span></TableCell>
                    <TableCell className="font-mono">/api/users</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">200</span></TableCell>
                    <TableCell>45ms</TableCell>
                    <TableCell className="text-right font-mono">192.168.1.105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2023-06-01 14:30:45</TableCell>
                    <TableCell><span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium">POST</span></TableCell>
                    <TableCell className="font-mono">/api/users/new</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">201</span></TableCell>
                    <TableCell>87ms</TableCell>
                    <TableCell className="text-right font-mono">192.168.1.105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2023-06-01 14:28:32</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">GET</span></TableCell>
                    <TableCell className="font-mono">/api/products</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">200</span></TableCell>
                    <TableCell>63ms</TableCell>
                    <TableCell className="text-right font-mono">192.168.1.108</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2023-06-01 14:25:18</TableCell>
                    <TableCell><span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 px-2 py-1 rounded-md text-xs font-medium">PUT</span></TableCell>
                    <TableCell className="font-mono">/api/products/5</TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">200</span></TableCell>
                    <TableCell>124ms</TableCell>
                    <TableCell className="text-right font-mono">192.168.1.108</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">2023-06-01 14:20:55</TableCell>
                    <TableCell><span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded-md text-xs font-medium">DELETE</span></TableCell>
                    <TableCell className="font-mono">/api/products/2</TableCell>
                    <TableCell><span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded-md text-xs font-medium">404</span></TableCell>
                    <TableCell>32ms</TableCell>
                    <TableCell className="text-right font-mono">192.168.1.110</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 