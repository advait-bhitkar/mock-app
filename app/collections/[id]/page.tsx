"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { Plus, ArrowLeft, Loader2, Copy, Check } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import supabase from "@/lib/supabase"

type Collection = {
  id: string
  name: string
  description: string
  team_id: string
  endpoint_count: number
  created_at: string
}

type API = {
  id: string
  name: string
  path: string
  method: string
  response_body: string
  status_code: number
  collection_id: string
  created_at: string
  updated_at: string
}

export default function CollectionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const collectionId = params.id as string
  
  const [collection, setCollection] = useState<Collection | null>(null)
  const [apis, setApis] = useState<API[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddApiDialog, setShowAddApiDialog] = useState(false)
  
  // New API form state
  const [newApiName, setNewApiName] = useState("")
  const [newApiPath, setNewApiPath] = useState("")
  const [newApiMethod, setNewApiMethod] = useState("GET")
  const [newApiResponseBody, setNewApiResponseBody] = useState(JSON.stringify({ message: "Success" }, null, 2))
  const [newApiStatusCode, setNewApiStatusCode] = useState(200)
  const [isCreatingApi, setIsCreatingApi] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Fetch collection details
  const fetchCollection = useCallback(async () => {
    if (!collectionId) return
    
    try {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("id", collectionId)
        .single()
        
      if (error) {
        console.error("Error fetching collection:", error)
        return
      }
      
      setCollection(data)
    } catch (error) {
      console.error("Error fetching collection:", error)
    }
  }, [collectionId])

  // Fetch APIs for the collection
  const fetchApis = useCallback(async () => {
    if (!collectionId) return
    
    try {
      const { data, error } = await supabase
        .from("endpoints")
        .select("*")
        .eq("collection_id", collectionId)
        .order('created_at', { ascending: false })
        
      if (error) {
        console.error("Error fetching APIs:", error)
        return
      }
      
      setApis(data || [])
    } catch (error) {
      console.error("Error fetching APIs:", error)
    } finally {
      setIsLoading(false)
    }
  }, [collectionId])

  // Load data on component mount
  useEffect(() => {
    fetchCollection()
    fetchApis()
  }, [fetchCollection, fetchApis])

  // Handle creating a new API
  const handleCreateApi = async () => {
    if (!newApiName.trim() || !collectionId) return
    
    setIsCreatingApi(true)
    try {
      // Validate JSON
      try {
        JSON.parse(newApiResponseBody)
      } catch (e) {
        alert("Invalid JSON response body")
        setIsCreatingApi(false)
        return
      }
      
      const { data: api, error } = await supabase
        .from("endpoints")
        .insert([
          {
            name: newApiName,
            path: newApiPath,
            method: newApiMethod,
            response_body: newApiResponseBody,
            status_code: newApiStatusCode,
            collection_id: collectionId
          }
        ])
        .select()
        .single()

      if (error) throw error

      if (api) {
        setApis(prev => [api, ...prev])
        
        // Update the endpoint count in the collection
        await supabase
          .from("collections")
          .update({ 
            endpoint_count: (collection?.endpoint_count || 0) + 1 
          })
          .eq("id", collectionId)
          
        // Update local state
        setCollection(prev => {
          if (!prev) return prev
          return {
            ...prev,
            endpoint_count: (prev.endpoint_count || 0) + 1
          }
        })
        
        // Reset form
        setNewApiName("")
        setNewApiPath("")
        setNewApiMethod("GET")
        setNewApiResponseBody(JSON.stringify({ message: "Success" }, null, 2))
        setNewApiStatusCode(200)
        setShowAddApiDialog(false)
      }
    } catch (error) {
      console.error("Error creating API:", error)
    } finally {
      setIsCreatingApi(false)
    }
  }

  // Add this function to handle copying API URL
  const handleCopyApiUrl = (api: API) => {
    // Construct the base URL for the mock endpoint
    const baseUrl = window.location.origin
    // Create the full mock API URL
    const apiUrl = `${baseUrl}/api/mock/${api.id}`
    
    // Copy to clipboard
    navigator.clipboard.writeText(apiUrl)
      .then(() => {
        setCopiedId(api.id)
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedId(null)
        }, 2000)
      })
      .catch(err => {
        console.error("Failed to copy URL:", err)
      })
  }

  // Memoized API list component
  const apiListContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }
    
    if (apis.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No APIs in this collection yet</h3>
          <p className="text-muted-foreground mt-1 mb-4">Create your first API endpoint to get started</p>
          <Button onClick={() => setShowAddApiDialog(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Add API Endpoint
          </Button>
        </div>
      )
    }
    
    return (
      <div className="grid gap-4">
        {apis.map(api => (
          <Card key={api.id} className="cursor-pointer hover:bg-accent/5">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{api.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2
                      ${api.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                        api.method === 'POST' ? 'bg-green-100 text-green-800' : 
                        api.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : 
                        api.method === 'DELETE' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {api.method}
                    </span>
                    <span className="font-mono text-sm">{api.path}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-muted-foreground">
                    Status: {api.status_code}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyApiUrl(api);
                    }}
                  >
                    {copiedId === api.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                        Copy URL
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }, [apis, isLoading, copiedId])

  // Add API Dialog
  const addApiDialog = useMemo(() => (
    <Dialog open={showAddApiDialog} onOpenChange={setShowAddApiDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add API Endpoint</DialogTitle>
          <DialogDescription>
            Create a new API endpoint in your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">API Name</Label>
            <Input
              id="name"
              value={newApiName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewApiName(e.target.value)}
              placeholder="Enter API name"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="method">Method</Label>
              <Select
                value={newApiMethod}
                onValueChange={setNewApiMethod}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2 col-span-3">
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                value={newApiPath}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewApiPath(e.target.value)}
                placeholder="/api/resource"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="statusCode">Status Code</Label>
            <Input
              id="statusCode"
              type="number"
              value={newApiStatusCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewApiStatusCode(parseInt(e.target.value))}
              placeholder="200"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="responseBody">Response Body (JSON)</Label>
            <textarea
              id="responseBody"
              value={newApiResponseBody}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewApiResponseBody(e.target.value)}
              placeholder="Enter JSON response"
              className="font-mono text-sm min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateApi} disabled={isCreatingApi}>
            {isCreatingApi ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create API"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ), [
    showAddApiDialog, 
    newApiName, 
    newApiPath, 
    newApiMethod, 
    newApiResponseBody, 
    newApiStatusCode, 
    isCreatingApi, 
    collectionId, 
    collection
  ])

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
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/collections">
                      Collections
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{collection?.name || 'Loading...'}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto pr-4">
              <Button 
                onClick={() => setShowAddApiDialog(true)}
                disabled={isLoading}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add API
              </Button>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{collection?.name || 'Loading...'}</h1>
                <p className="text-muted-foreground">
                  {collection?.description || 'Loading collection details...'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/collections')}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Collections
              </Button>
            </div>
            
            {apiListContent}
          </div>
        </SidebarInset>
      </SidebarProvider>

      {addApiDialog}
    </ProtectedRoute>
  )
} 