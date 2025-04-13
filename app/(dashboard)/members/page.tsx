"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreHorizontal, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MemberDialog } from "@/components/member-dialog"
import { getTeamMembers, removeTeamMember, searchMembers } from "@/lib/members"
import { Member } from "@/lib/types/member"
import supabase from "@/lib/supabase"

export default function MembersPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTeam, setCurrentTeam] = useState<{ id: string } | null>(null)

  // Load current team
  useEffect(() => {
    const loadCurrentTeam = async () => {
      const savedTeamId = localStorage.getItem('currentTeamId')
      if (savedTeamId) {
        setCurrentTeam({ id: savedTeamId })
      }
    }
    loadCurrentTeam()
  }, [])

  // Load members
  const loadMembers = useCallback(async () => {
    if (!currentTeam) return

    setIsLoading(true)
    try {
      const members = await getTeamMembers(currentTeam.id)
      setMembers(members)
    } catch (error) {
      console.error("Error loading members:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentTeam])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    if (!currentTeam) return

    setSearchQuery(query)
    if (query.trim() === "") {
      loadMembers()
      return
    }

    try {
      const results = await searchMembers(currentTeam.id, query)
      setMembers(results)
    } catch (error) {
      console.error("Error searching members:", error)
    }
  }, [currentTeam, loadMembers])

  // Handle member removal
  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeTeamMember(memberId)
      setMembers(prev => prev.filter(m => m.id !== memberId))
    } catch (error) {
      console.error("Error removing member:", error)
    }
  }

  // Handle member update
  const handleUpdateMember = (member: Member) => {
    setSelectedMember(member)
    setShowDialog(true)
  }

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
                <BreadcrumbPage>Members</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Team Members</h1>
            <p className="text-muted-foreground">Manage your team members and their access.</p>
          </div>
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : members.length > 0 ? (
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="bg-card p-4 rounded-xl border shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar_url} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground capitalize">{member.role}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdateMember(member)}>
                        Update Role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No members yet</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              {searchQuery
                ? "No members found matching your search"
                : "Add your first team member to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowDialog(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add Member
              </Button>
            )}
          </div>
        )}
      </div>

      {currentTeam && (
        <MemberDialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open)
            if (!open) {
              setSelectedMember(null)
            }
          }}
          teamId={currentTeam.id}
          member={selectedMember ? {
            id: selectedMember.id,
            email: selectedMember.email,
            role: selectedMember.role,
          } : undefined}
        />
      )}
    </>
  )
} 