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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Download } from "lucide-react"

export default function BillingPage() {
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
                    <BreadcrumbPage>Billing</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            <div>
              <h1 className="text-2xl font-bold">Billing & Subscription</h1>
              <p className="text-muted-foreground">Manage your subscription and billing information.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>You are currently on the Pro plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold">$29</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Next billing date: July 1, 2023</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Unlimited API collections</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Up to 5 team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>1 million requests per month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Advanced authentication options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Priority support</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline" className="text-destructive">Cancel Subscription</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-3 border rounded">
                    <CreditCard className="h-6 w-6" />
                    <div className="flex-1">
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardContent>
                <CardHeader className="pt-6">
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View and download your invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div>
                        <div className="font-medium">June 1, 2023</div>
                        <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">$29.00</div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div>
                        <div className="font-medium">May 1, 2023</div>
                        <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">$29.00</div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded">
                      <div>
                        <div className="font-medium">April 1, 2023</div>
                        <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">$29.00</div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 