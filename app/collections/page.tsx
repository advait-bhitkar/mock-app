"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Plus, Loader2 } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"
import React from "react"

type Collection = {
  id: string
  name: string
  description: string
  team_id: string
  endpoint_count: number
  created_at: string
}

type Team = {
  id: string
  name: string
  slug: string
  user_id: string
  created_at: string
  updated_at: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const router = useRouter()

  // Function to fetch collections for a specific team
  const fetchCollectionsForTeam = useCallback(async (teamId: string) => {
    setIsLoading(true)
    try {
      const { data: collections, error } = await supabase
        .from("collections")
        .select("*")
        .eq("team_id", teamId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Error fetching collections:", error)
        return
      }

      setCollections(collections || [])
    } catch (error) {
      console.error("Error fetching collections:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Function to load the current team
  const loadCurrentTeam = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Get current team from localStorage if available
      const savedTeamId = localStorage.getItem('currentTeamId')
      if (savedTeamId) {
        const { data: team, error } = await supabase
          .from("teams")
          .select("*")
          .eq("id", savedTeamId)
          .eq("user_id", user.id)
          .single()

        if (team) {
          setCurrentTeam(team)
          fetchCollectionsForTeam(team.id)
          return team
        }
      }

      // Fallback to first team if no saved team
      const { data: teams, error } = await supabase
        .from("teams")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (teams) {
        setCurrentTeam(teams)
        localStorage.setItem('currentTeamId', teams.id)
        fetchCollectionsForTeam(teams.id)
        return teams
      }

      return null
    } catch (error) {
      console.error("Error loading current team:", error)
      setIsLoading(false)
      return null
    }
  }, [fetchCollectionsForTeam])

  // Handle team changed event
  const handleTeamChanged = useCallback((e: Event) => {
    // @ts-ignore
    const teamId = e.detail?.teamId
    if (teamId) {
      // Get team details if not already in state
      const getTeam = async () => {
        try {
          const { data: team } = await supabase
            .from("teams")
            .select("*")
            .eq("id", teamId)
            .single()
            
          if (team && team.id !== currentTeam?.id) {
            setCurrentTeam(team)
            fetchCollectionsForTeam(teamId)
          }
        } catch (error) {
          console.error("Error fetching team:", error)
        }
      }
      
      getTeam()
    }
  }, [fetchCollectionsForTeam, currentTeam])

  // Load teams and collections when component mounts
  useEffect(() => {
    loadCurrentTeam()
  }, [loadCurrentTeam])

  // Set up event listener for team changes
  useEffect(() => {
    // Listen for team changes from other components
    window.addEventListener('teamChanged', handleTeamChanged)
    
    return () => {
      window.removeEventListener('teamChanged', handleTeamChanged)
    }
  }, [handleTeamChanged])

  const handleCreateCollection = useCallback(async () => {
    if (!newCollectionName.trim() || !currentTeam) return

    setIsCreating(true)
    try {
      const { data: collection, error } = await supabase
        .from("collections")
        .insert([
          {
            name: newCollectionName,
            description: newCollectionDescription,
            team_id: currentTeam.id,
            endpoint_count: 0
          }
        ])
        .select()
        .single()

      if (error) throw error

      if (collection) {
        setCollections(prev => [collection, ...prev])
        setNewCollectionName("")
        setNewCollectionDescription("")
        setShowDialog(false)
        // Don't refresh the router as it causes a full page reload
        // router.refresh()
      }
    } catch (error) {
      console.error("Error creating collection:", error)
    } finally {
      setIsCreating(false)
    }
  }, [newCollectionName, newCollectionDescription, currentTeam])

  // Memoize the collections list to prevent unnecessary re-renders
  const collectionsContent = React.useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }
    
    if (!currentTeam) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No workspace selected</h3>
          <p className="text-muted-foreground mt-1 mb-4">Please create or select a workspace to view collections</p>
        </div>
      )
    }
    
    if (collections.length > 0) {
      return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map(collection => (
            <div 
              key={collection.id} 
              className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/collections/${collection.id}`)}
            >
              <h3 className="font-semibold mb-2">{collection.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
              <div className="text-xs text-muted-foreground">{collection.endpoint_count} endpoints</div>
            </div>
          ))}
        </div>
      )
    }
    
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No collections yet</h3>
        <p className="text-muted-foreground mt-1 mb-4">Create your first collection to get started</p>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Create Collection
        </Button>
      </div>
    )
  }, [collections, currentTeam, isLoading, setShowDialog, router])

  // Memoize the page title and description
  const pageHeaderContent = React.useMemo(() => (
    <>
      <h1 className="text-2xl font-bold">API Collections</h1>
      <p className="text-muted-foreground">
        {currentTeam ? 
          `Manage your API collections in the "${currentTeam.name}" workspace.` : 
          'Select or create a workspace to manage collections.'}
      </p>
    </>
  ), [currentTeam])
  
  // Memoize the dialog to prevent re-renders
  const createCollectionDialog = useMemo(() => (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>
            Add a new API collection to "{currentTeam?.name}".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Collection Name</Label>
            <Input
              id="name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Enter collection name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCreateCollection();
                }
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
              placeholder="Enter collection description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateCollection} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Collection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ), [
    showDialog, 
    setShowDialog, 
    newCollectionName, 
    newCollectionDescription, 
    currentTeam, 
    handleCreateCollection, 
    isCreating
  ])

  // Memoize the header
  const pageHeader = useMemo(() => (
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
                {currentTeam?.name || 'MockAPI'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Collections</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto pr-4">
        <Button 
          onClick={() => setShowDialog(true)}
          disabled={!currentTeam}
        >
          <Plus className="mr-1 h-4 w-4" />
          Create Collection
        </Button>
      </div>
    </header>
  ), [currentTeam, setShowDialog])

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {pageHeader}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {pageHeaderContent}
            {collectionsContent}
          </div>
        </SidebarInset>
      </SidebarProvider>

      {createCollectionDialog}
    </ProtectedRoute>
  )
} 