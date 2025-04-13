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
import { Search, Filter, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  endpoint_path: string;
  status_code: number;
  response_time: number;
  ip_address: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function LogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: pagination.page.toString(),
          limit: pagination.limit.toString()
        });
        
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }
        
        const response = await fetch(`/api/logs?${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch logs data');
        }
        
        const data = await response.json();
        setLogs(data.logs);
        setPagination(data.pagination);
        setError(null);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setError('Could not load logs data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchLogs();
  }, [pagination.page, pagination.limit, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchInput = target.elements.namedItem('search') as HTMLInputElement;
    setSearchQuery(searchInput.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  // Format date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get appropriate status badge style
  const getStatusBadgeClass = (status: number) => {
    if (status < 300) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (status < 400) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    if (status < 500) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  // Get appropriate method badge style
  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET': return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'POST': return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case 'PUT': return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case 'DELETE': return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case 'PATCH': return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

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
                <BreadcrumbPage>Logs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">API Request Logs</h1>
        <p className="text-muted-foreground">View detailed logs of all API requests.</p>
        
        <form onSubmit={handleSearch} className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search logs..."
              className="w-full pl-8"
              defaultValue={searchQuery}
            />
          </div>
          <Button variant="outline" size="icon" type="button">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </form>
        
        {loading ? (
          <div className="flex items-center justify-center h-80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">{error}</div>
        ) : (
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
                {logs.length > 0 ? (
                  logs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono">{formatDate(log.timestamp)}</TableCell>
                      <TableCell>
                        <span className={`${getMethodBadgeClass(log.method)} px-2 py-1 rounded-md text-xs font-medium`}>
                          {log.method}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono">{log.endpoint_path}</TableCell>
                      <TableCell>
                        <span className={`${getStatusBadgeClass(log.status_code)} px-2 py-1 rounded-md text-xs font-medium`}>
                          {log.status_code}
                        </span>
                      </TableCell>
                      <TableCell>{log.response_time}ms</TableCell>
                      <TableCell className="text-right font-mono">{log.ip_address}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {logs.length > 0 && pagination.pages > 1 && (
              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
} 