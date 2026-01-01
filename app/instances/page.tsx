"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockWorkflows, mockInstances } from "@/lib/mock-data"
import { Plus, ExternalLink, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function InstancesPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)

  return (
    <LayoutShell>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Workflow Instances
          </h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your workflow executions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                Workflow Definitions
              </CardTitle>
              <CardDescription>Click on a workflow to view its instances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Contract Address</TableHead>
                    <TableHead>Instances</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWorkflows.map((workflow, index) => (
                    <motion.tr
                      key={workflow.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedWorkflow(workflow.id)}
                    >
                      <TableCell className="font-medium">{workflow.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{workflow.version}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {workflow.contractAddress?.slice(0, 10)}...
                        {workflow.contractAddress?.slice(-8)}
                      </TableCell>
                      <TableCell>{mockInstances[workflow.id]?.length || 0}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {workflow.updatedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/instances/${workflow.id}`}>
                            View <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {selectedWorkflow && mockInstances[selectedWorkflow] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{mockWorkflows.find((w) => w.id === selectedWorkflow)?.name} - Instances</CardTitle>
                    <CardDescription>Active and completed workflow instances</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Instance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockInstances[selectedWorkflow].map((instance, index) => (
                    <motion.div
                      key={instance.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href={`/instances/${selectedWorkflow}/${instance.id}`}>
                        <Card className="hover:shadow-lg transition-all border-2 hover:border-orange-500/50 cursor-pointer h-full">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{instance.externalId}</CardTitle>
                                <CardDescription className="text-xs">{instance.assignee}</CardDescription>
                              </div>
                              <Badge
                                variant={
                                  instance.status === "completed"
                                    ? "default"
                                    : instance.status === "in-progress"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {instance.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex justify-between">
                                <span>Steps:</span>
                                <span className="font-medium text-foreground">{instance.steps.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Created:</span>
                                <span className="font-medium text-foreground">
                                  {instance.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </LayoutShell>
  )
}
