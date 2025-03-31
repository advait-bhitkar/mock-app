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

      const { data: teams, error } = await supabase
        .from("teams")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Error loading teams:", error)
        setIsLoading(false)
        return
      }

      if (teams && teams.length > 0) {
        setTeams(teams)
        setCurrentTeam(teams[0])
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
