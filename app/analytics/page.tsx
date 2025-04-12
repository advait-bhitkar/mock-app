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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ArrowUpRight, ArrowDownRight, Activity, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface AnalyticsData {
  totalRequests: number;
  avgResponseTime: number;
  activeCollections: number;
  errorRate: number;
  comparisons: {
    requestsChange: number;
    responseTimeChange: number;
    newCollections: number;
    errorRateChange: number;
  };
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        
        const analyticsData = await response.json();
        setData(analyticsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Could not load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalytics();
  }, []);

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
                    <BreadcrumbPage>Analytics</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">API Analytics</h1>
            <p className="text-muted-foreground">Track usage and performance metrics for your APIs.</p>
            
            {loading ? (
              <div className="flex items-center justify-center h-80">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-8">{error}</div>
            ) : data && (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.totalRequests.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        {data.comparisons.requestsChange > 0 ? (
                          <>
                            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                            <span className="text-green-500">{data.comparisons.requestsChange}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                            <span className="text-red-500">{Math.abs(data.comparisons.requestsChange)}%</span>
                          </>
                        )}
                        {' '}from last month
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.avgResponseTime}ms</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        {data.comparisons.responseTimeChange <= 0 ? (
                          <>
                            <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                            <span className="text-green-500">{Math.abs(data.comparisons.responseTimeChange)}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="mr-1 h-3 w-3 text-red-500" />
                            <span className="text-red-500">{data.comparisons.responseTimeChange}%</span>
                          </>
                        )}
                        {' '}from last month
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Collections</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.activeCollections}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">{data.comparisons.newCollections}</span> new this month
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.errorRate}%</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        {data.comparisons.errorRateChange <= 0 ? (
                          <>
                            <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                            <span className="text-green-500">{Math.abs(data.comparisons.errorRateChange)}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="mr-1 h-3 w-3 text-red-500" />
                            <span className="text-red-500">{data.comparisons.errorRateChange}%</span>
                          </>
                        )}
                        {' '}from last month
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-card p-6 rounded-xl border shadow-sm h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">API usage chart will be displayed here</p>
                </div>
              </>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
} 