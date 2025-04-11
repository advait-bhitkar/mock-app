"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, Check } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROLE_OPTIONS, ROLE_DESCRIPTIONS, MemberRole } from "@/lib/types/member"
import { addTeamMember, updateMemberRole } from "@/lib/members"

interface MemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamId: string
  member?: {
    id: string
    email: string
    role: string
  }
}

export function MemberDialog({
  open,
  onOpenChange,
  teamId,
  member,
}: MemberDialogProps) {
  const router = useRouter()
  const [email, setEmail] = React.useState(member?.email || "")
  const [role, setRole] = React.useState<MemberRole>(member?.role as MemberRole || "viewer")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<'idle' | 'invited' | 'added'>('idle')

  React.useEffect(() => {
    if (open) {
      setEmail(member?.email || "")
      setRole(member?.role as MemberRole || "viewer")
      setError(null)
      setStatus('idle')
    }
  }, [open, member])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      if (member) {
        // Update existing member
        await updateMemberRole(member.id, role)
        onOpenChange(false)
        router.refresh()
      } else {
        // Add new member
        const result = await addTeamMember(teamId, email, role)
        if (result.success) {
          setStatus('invited')
          onOpenChange(false)
          router.refresh()
        } else {
          setError(result.message)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {member ? "Update Team Member" : "Add Team Member"}
          </DialogTitle>
          <DialogDescription>
            {member
              ? "Update the role of an existing team member."
              : "Add a new member to your team by entering their email address."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!member && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  disabled={status === 'invited'}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value: MemberRole) => setRole(value)}
                disabled={status === 'invited'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {ROLE_DESCRIPTIONS[option.value]}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
            {status === 'invited' && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>Invitation sent to {email}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            {status === 'invited' ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {member ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  member ? "Update Member" : "Add Member"
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 