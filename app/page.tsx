"use client"

import { useState, useRef } from "react"
import type { Node } from "reactflow"
import { LayoutShell } from "@/components/layout-shell"
import { WorkflowCanvas } from "@/components/workflow-canvas"
import { NodeProperties } from "@/components/node-properties"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Shield, Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function WorkflowDesigner() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()
  const canvasRef = useRef<any>(null)

  const handleValidate = () => {
    setIsValidating(true)
    setValidationStatus("idle")

    setTimeout(() => {
      // Check if workflow has at least start and end nodes
      const hasStart = nodes.some((n) => n.data.type === "start")
      const hasEnd = nodes.some((n) => n.data.type === "end")

      if (!hasStart || !hasEnd) {
        setValidationStatus("error")
        toast({
          title: "Validation Failed",
          description: "Workflow must have at least one Start and one End node.",
          variant: "destructive",
        })
        setIsValidating(false)
        return
      }

      if (nodes.length < 2) {
        setValidationStatus("error")
        toast({
          title: "Validation Failed",
          description: "Workflow must have at least 2 nodes.",
          variant: "destructive",
        })
        setIsValidating(false)
        return
      }

      setValidationStatus("success")
      toast({
        title: "Validation Successful",
        description: `Your workflow with ${nodes.length} nodes is valid and ready to be published.`,
      })
      setIsValidating(false)
    }, 1500)
  }

  const handlePublish = async () => {
    if (validationStatus !== "success") {
      toast({
        title: "Validation Required",
        description: "Please validate your workflow before publishing.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)

    toast({
      title: "Preparing Workflow...",
      description: "Generating smart contract and preparing deployment.",
    })

    setTimeout(() => {
      toast({
        title: "Deploying to Casper Blockchain...",
        description: "Transaction is being processed.",
      })
    }, 1500)

    setTimeout(() => {
      const contractAddress = `casper:${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`

      toast({
        title: "Successfully Published!",
        description: `Workflow deployed at ${contractAddress}`,
      })
      setIsPublishing(false)
      setValidationStatus("idle")
    }, 4000)
  }

  const handleNodeUpdate = (nodeId: string, data: any) => {
    console.log("[v0] App updating node:", nodeId, data)

    if (canvasRef.current) {
      canvasRef.current.updateNode(nodeId, data)
    }

    // Update selected node to reflect changes immediately
    setSelectedNode((prev) => (prev?.id === nodeId ? { ...prev, data } : prev))
  }

  return (
    <LayoutShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Workflow Designer
            </h1>
            <p className="text-muted-foreground mt-1">Design and publish blockchain-verified workflows</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleValidate}
              disabled={isValidating || nodes.length === 0}
              className="border-2 relative overflow-hidden group bg-transparent"
            >
              <AnimatePresence mode="wait">
                {isValidating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Validating...
                  </motion.div>
                ) : validationStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center text-green-500"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Validated
                  </motion.div>
                ) : validationStatus === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center text-red-500"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Failed
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Validate Workflow
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing || validationStatus !== "success"}
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 border-0 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              <AnimatePresence mode="wait">
                {isPublishing ? (
                  <motion.div
                    key="publishing"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Publishing...
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Publish to Casper
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <div className="h-[calc(100vh-16rem)] flex gap-4">
          <WorkflowCanvas ref={canvasRef} onNodeSelect={setSelectedNode} onNodesUpdate={setNodes} />
          <NodeProperties node={selectedNode} onNodeUpdate={handleNodeUpdate} />
        </div>
      </div>
    </LayoutShell>
  )
}
