"use client"

import { use } from "react"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { Timeline } from "@/components/ui/timeline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockWorkflows, mockInstances } from "@/lib/mock-data"
import { Copy, ExternalLink, CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function InstanceDetailPage({
  params,
}: {
  params: Promise<{ workflowId: string; instanceId: string }>
}) {
  const { workflowId, instanceId } = use(params)
  const { toast } = useToast()

  const workflow = mockWorkflows.find((w) => w.id === workflowId)
  const instance = mockInstances[workflowId]?.find((i) => i.id === instanceId)

  if (!workflow || !instance) {
    return (
      <LayoutShell>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Instance not found</h2>
          <Link href="/instances">
            <Button className="mt-4">Back to Instances</Button>
          </Link>
        </div>
      </LayoutShell>
    )
  }

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    toast({
      title: "Copied!",
      description: "Evidence hash copied to clipboard",
    })
  }

  const timelineData = instance.steps.map((step) => ({
    title: step.stepName,
    content: (
      <div className="space-y-4 pb-8">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Actor:</span>
            <p className="font-mono text-xs mt-1">
              {step.actor.slice(0, 10)}...{step.actor.slice(-10)}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Timestamp:</span>
            <p className="font-medium mt-1">{step.timestamp.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Status:</span>
          <Badge
            variant={step.status === "completed" ? "default" : step.status === "failed" ? "destructive" : "secondary"}
            className="gap-1"
          >
            {step.status === "completed" && <CheckCircle2 className="h-3 w-3" />}
            {step.status === "failed" && <XCircle className="h-3 w-3" />}
            {step.status === "skipped" && <Clock className="h-3 w-3" />}
            {step.status}
          </Badge>
        </div>

        {step.evidenceHash && (
          <div className="space-y-2">
            <span className="text-muted-foreground text-sm">Evidence Hash:</span>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-2 p-3 bg-muted rounded-lg border border-border hover:border-orange-500/50 transition-colors"
            >
              <code className="text-xs font-mono flex-1 overflow-hidden text-ellipsis">{step.evidenceHash}</code>
              <Button size="icon" variant="ghost" onClick={() => copyHash(step.evidenceHash!)}>
                <Copy className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    ),
  }))

  return (
    <LayoutShell>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" asChild>
            <Link href="/instances">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Instances
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {instance.externalId}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {workflow.name} v{workflow.version}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    instance.status === "completed"
                      ? "default"
                      : instance.status === "in-progress"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-sm"
                >
                  {instance.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Assignee:</span>
                    <p className="font-medium">{instance.assignee}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Created:</span>
                    <p className="font-medium">{instance.createdAt.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Last Updated:</span>
                    <p className="font-medium">{instance.updatedAt.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">On-chain Status:</span>
                    <p className="font-medium text-green-600 dark:text-green-400 mt-1">
                      {instance.status === "completed"
                        ? "✓ Process complete and valid"
                        : instance.status === "violated"
                          ? "✗ Process violated: missing required step"
                          : "⧗ Process in progress"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10 hover:border-orange-500/50 transition-all"
                    onClick={() => window.open(`https://cspr.live/deploy/${workflow.contractAddress}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Verify on Casper Block Explorer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Timeline data={timelineData} />
        </motion.div>
      </div>
    </LayoutShell>
  )
}
