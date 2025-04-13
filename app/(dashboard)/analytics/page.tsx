"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
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
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData({
        totalRequests: 12583,
        avgResponseTime: 231,
        activeCollections: 8,
        errorRate: 2.1,
        comparisons: {
          requestsChange: 12.3,
          responseTimeChange: -8.5,
          newCollections: 2,
          errorRateChange: -0.5
        }
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
                  Dashboard
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
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Requests
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.totalRequests.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className={`mr-1 ${analyticsData?.comparisons.requestsChange && analyticsData.comparisons.requestsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData?.comparisons.requestsChange && analyticsData.comparisons.requestsChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    </span>
                    {analyticsData?.comparisons.requestsChange}% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Response Time
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.avgResponseTime} ms</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className={`mr-1 ${analyticsData?.comparisons.responseTimeChange && analyticsData.comparisons.responseTimeChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData?.comparisons.responseTimeChange && analyticsData.comparisons.responseTimeChange < 0 ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                    </span>
                    {Math.abs(analyticsData?.comparisons.responseTimeChange || 0)}% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Collections
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.activeCollections}</div>
                  <p className="text-xs text-muted-foreground">
                    +{analyticsData?.comparisons.newCollections} new this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Error Rate
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData?.errorRate}%</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className={`mr-1 ${analyticsData?.comparisons.errorRateChange && analyticsData.comparisons.errorRateChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {analyticsData?.comparisons.errorRateChange && analyticsData.comparisons.errorRateChange < 0 ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                    </span>
                    {Math.abs(analyticsData?.comparisons.errorRateChange || 0)}% from last week
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] bg-muted/50 rounded-md" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 bg-primary/20 p-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Collection "API Payments" updated
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 bg-primary/20 p-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          New mock endpoint added
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 bg-primary/20 p-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Error rate spike detected
                        </p>
                        <p className="text-sm text-muted-foreground">
                          3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  )
} 