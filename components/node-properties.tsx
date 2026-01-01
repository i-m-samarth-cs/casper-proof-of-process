"use client"

import { useState, useEffect } from "react"
import type { Node } from "reactflow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Save, Settings } from "lucide-react"
import { motion } from "framer-motion"

export function NodeProperties({
  node,
  onNodeUpdate,
}: {
  node: Node | null
  onNodeUpdate?: (nodeId: string, data: any) => void
}) {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    roles: "",
    sla: "",
    requiresEvidence: false,
  })

  useEffect(() => {
    if (node) {
      setFormData({
        label: node.data.label || "",
        description: node.data.description || "",
        roles: node.data.roles?.join(", ") || "",
        sla: node.data.sla?.toString() || "",
        requiresEvidence: node.data.requiresEvidence || false,
      })
    }
  }, [node])

  const handleSave = () => {
    if (node && onNodeUpdate) {
      const updatedData = {
        ...node.data,
        label: formData.label,
        description: formData.description,
        roles: formData.roles
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
        sla: Number.parseInt(formData.sla) || 24,
        requiresEvidence: formData.requiresEvidence,
      }
      onNodeUpdate(node.id, updatedData)
    }
  }

  if (!node) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Card className="w-80 h-full border-2">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                <Settings className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-80 h-full overflow-auto border-2">
        <CardHeader className="border-b bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Node Properties
            </span>
            <Badge variant="secondary" className="capitalize">
              {node.data.type}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="label">Step Name</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="Enter step name"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe this step"
              rows={3}
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roles">Required Role(s)</Label>
            <Input
              id="roles"
              value={formData.roles}
              onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              placeholder="e.g., Manager, Approver"
              className="border-2"
            />
            <p className="text-xs text-muted-foreground">Comma-separated roles</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sla">SLA (hours)</Label>
            <Input
              id="sla"
              type="number"
              value={formData.sla}
              onChange={(e) => setFormData({ ...formData, sla: e.target.value })}
              placeholder="24"
              className="border-2"
            />
          </div>

          <div className="flex items-center space-x-2 p-3 rounded-lg border-2 bg-muted/30">
            <Checkbox
              id="evidence"
              checked={formData.requiresEvidence}
              onCheckedChange={(checked) => setFormData({ ...formData, requiresEvidence: checked as boolean })}
            />
            <Label htmlFor="evidence" className="text-sm cursor-pointer">
              Requires off-chain evidence hash
            </Label>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
