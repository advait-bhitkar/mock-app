"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Folders,
  BarChart,
  ScrollText,
  Users,
  CreditCard,
  Settings,
  Loader2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
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

// Navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Collections",
      url: "/collections",
      icon: Folders,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: ScrollText,
    },
    {
      title: "Members",
      url: "/members",
      icon: Users,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [teams, setTeams] = React.useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [forceCreateTeam, setForceCreateTeam] = React.useState(false)

  const loadTeams = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsLoading(false)
        return
      }

      // Get teams for the user
      const { data: teamsData, error } = await supabase
        .rpc('get_user_teams')

      if (error) {
        console.error("Error loading teams:", error)
        setIsLoading(false)
        return
      }

      if (teamsData && teamsData.length > 0) {
        setTeams(teamsData)
        
        // Check if there's a saved team in localStorage
        const savedTeamId = localStorage.getItem('currentTeamId')
        if (savedTeamId) {
          const savedTeam = teamsData.find(t => t.id === savedTeamId)
          if (savedTeam) {
            setCurrentTeam(savedTeam)
            setForceCreateTeam(false)
            setIsLoading(false)
            return
          }
        }
        
        // If no saved team or saved team not found, use the first team
        setCurrentTeam(teamsData[0])
        localStorage.setItem('currentTeamId', teamsData[0].id)
        setForceCreateTeam(false)
      } else {
        setTeams([])
        setCurrentTeam(null)
        setForceCreateTeam(true)
      }
    } catch (error) {
      console.error("Error loading teams:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadTeams()
  }, [loadTeams])

  const handleTeamChange = React.useCallback((team: Team) => {
    if (team) {
      setCurrentTeam(team)
      
      // Store the current team in localStorage
      localStorage.setItem('currentTeamId', team.id)
      
      // If this is a new team not in the list, add it
      if (!teams.some(t => t.id === team.id)) {
        setTeams(prev => [team, ...prev])
      }
      
      setForceCreateTeam(false)
    }
  }, [teams])

  // Force team creation modal
  if (forceCreateTeam && !isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="w-full max-w-md p-6 bg-background border rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Create Your First Team</h2>
          <p className="text-muted-foreground mb-6">
            You need to create a team to use MockIt. Teams help you organize your mock APIs and collaborate with others.
          </p>
          <TeamSwitcher 
            teams={teams} 
            currentTeam={null} 
            onTeamChange={handleTeamChange} 
            forceCreate={true}
          />
        </div>
      </div>
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TeamSwitcher 
            teams={teams} 
            currentTeam={currentTeam} 
            onTeamChange={handleTeamChange}
            forceCreate={false}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
