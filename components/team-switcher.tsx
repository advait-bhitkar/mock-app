"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import supabase from "@/lib/supabase"

// Define Team type
type Team = {
  id: string
  name: string
  slug: string
  user_id: string
  created_at: string
  updated_at: string
}

interface TeamSwitcherProps {
  teams: Team[] 
  currentTeam: Team | null
  onTeamChange: (team: Team) => void
  forceCreate?: boolean
}

export function TeamSwitcher({
  teams,
  currentTeam,
  onTeamChange,
  forceCreate = false,
}: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [showDialog, setShowDialog] = React.useState(forceCreate)
  const [newTeamName, setNewTeamName] = React.useState("")
  const [isCreating, setIsCreating] = React.useState(false)
  const router = useRouter()

  // Update showDialog when forceCreate changes
  React.useEffect(() => {
    setShowDialog(forceCreate)
  }, [forceCreate])

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return

    setIsCreating(true)
    try {
      const slug = newTeamName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const { data: team, error } = await supabase
        .from("teams")
        .insert([
          {
            name: newTeamName,
            slug,
            user_id: user.id,
          },
        ])
        .select()
        .single()

      if (error) throw error

      if (team) {
        onTeamChange(team)
        
        // Dispatch an event to notify other components of the team change
        const teamChangedEvent = new CustomEvent('teamChanged', { 
          detail: { teamId: team.id }
        })
        window.dispatchEvent(teamChangedEvent)
        
        // Also store in localStorage
        localStorage.setItem('currentTeamId', team.id)
        
        setNewTeamName("")
        setIsCreating(false)
        if (!forceCreate) {
          setShowDialog(false)
        }
        router.refresh()
      }
    } catch (error) {
      console.error("Error creating team:", error)
      setIsCreating(false)
    }
  }

  // Memoize the team dropdown content
  const dropdownItems = React.useMemo(() => 
    teams.map((team) => (
      <DropdownMenuItem
        key={team.id}
        onClick={() => {
          onTeamChange(team)
          // Dispatch an event to notify other components of the team change
          const teamChangedEvent = new CustomEvent('teamChanged', { 
            detail: { teamId: team.id }
          })
          window.dispatchEvent(teamChangedEvent)
          
          // Also store in localStorage
          localStorage.setItem('currentTeamId', team.id)
        }}
        className="gap-2 p-2"
      >
        <div className="flex size-6 items-center justify-center rounded-md border">
          {team.name.charAt(0).toUpperCase()}
        </div>
        {team.name}
        <Check 
          className="ml-auto h-4 w-4 opacity-0" 
          style={{ opacity: currentTeam?.id === team.id ? 1 : 0 }} 
        />
      </DropdownMenuItem>
    )), [teams, currentTeam, onTeamChange])

  // If being used in force create mode or no current team
  if (forceCreate || !currentTeam) {
    const dialogContent = (
      <DialogContent onInteractOutside={e => {
        // Prevent closing the dialog when in force create mode
        if (forceCreate) {
          e.preventDefault()
        }
      }}>
        <DialogHeader>
          <DialogTitle>Create your first team</DialogTitle>
          <DialogDescription>
            Teams help you organize your mock APIs and collaborate with others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Team name</Label>
            <Input
              id="name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCreateTeam();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateTeam} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    )

    // If it's force create mode, just return the dialog content directly
    if (forceCreate) {
      return (
        <Dialog open={showDialog} onOpenChange={(open) => {
          if (!open && !forceCreate) {
            setShowDialog(false)
          }
        }}>
          {dialogContent}
        </Dialog>
      )
    }

    // Otherwise show the create team button with dialog
    return (
      <>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setShowDialog(true)}
              size="lg"
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create Team</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          {dialogContent}
        </Dialog>
      </>
    )
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {currentTeam.name.charAt(0).toUpperCase()}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentTeam.name}</span>
                  <span className="truncate text-xs">Owner</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {dropdownItems}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 p-2" 
                onClick={() => setShowDialog(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Create team</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Add a new team to organize your workspaces.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team name</Label>
              <Input
                id="name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateTeam();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTeam} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
