"use client"

import type React from "react"
import { useCallback, useImperativeHandle, forwardRef } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Connection,
  useNodesState,
  useEdgesState,
  type NodeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

function CustomNode({ data }: { data: any }) {
  const getNodeColor = (type: string) => {
    const colors: Record<string, string> = {
      start: "bg-green-500/20 border-green-500",
      end: "bg-red-500/20 border-red-500",
      approval: "bg-blue-500/20 border-blue-500",
      review: "bg-purple-500/20 border-purple-500",
      audit: "bg-orange-500/20 border-orange-500",
      manual: "bg-yellow-500/20 border-yellow-500",
    }
    return colors[type] || "bg-muted border-border"
  }

  return (
    <Card
      className={`min-w-[180px] p-4 border-2 ${getNodeColor(data.type)} shadow-lg hover:shadow-xl transition-all cursor-pointer`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs capitalize">
            {data.type}
          </Badge>
        </div>
        <div className="font-semibold text-sm">{data.label}</div>
        {data.description && <div className="text-xs text-muted-foreground line-clamp-2">{data.description}</div>}
        {data.roles && data.roles.length > 0 && (
          <div className="text-xs text-muted-foreground">Role: {data.roles.join(", ")}</div>
        )}
        {data.sla && <div className="text-xs text-muted-foreground">SLA: {data.sla}h</div>}
      </div>
    </Card>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 50 },
    data: { label: "Start", type: "start", description: "Workflow start point" },
  },
]

const initialEdges: Edge[] = []

export const WorkflowCanvas = forwardRef(function WorkflowCanvas(
  {
    onNodeSelect,
    onNodesUpdate,
  }: {
    onNodeSelect: (node: Node | null) => void
    onNodesUpdate?: (nodes: Node[]) => void
  },
  ref,
) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      console.log("[v0] Node clicked:", node.id)
      onNodeSelect(node)
    },
    [onNodeSelect],
  )

  const updateNode = useCallback(
    (nodeId: string, newData: any) => {
      console.log("[v0] Canvas updating node:", nodeId, newData)
      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: newData }
          }
          return node
        })
        if (onNodesUpdate) {
          onNodesUpdate(updatedNodes)
        }
        return updatedNodes
      })
    },
    [setNodes, onNodesUpdate],
  )

  useImperativeHandle(ref, () => ({
    updateNode,
    getNodes: () => nodes,
  }))

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "custom",
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        type: type,
        description: `New ${type} step`,
        roles: [],
        sla: 24,
      },
    }
    const updatedNodes = [...nodes, newNode]
    setNodes(updatedNodes)
    if (onNodesUpdate) {
      onNodesUpdate(updatedNodes)
    }
  }

  const stepTypes = [
    { type: "start", icon: "●", color: "from-green-500 to-emerald-500" },
    { type: "approval", icon: "✓", color: "from-blue-500 to-cyan-500" },
    { type: "review", icon: "◆", color: "from-purple-500 to-pink-500" },
    { type: "audit", icon: "▲", color: "from-orange-500 to-red-500" },
    { type: "manual", icon: "■", color: "from-yellow-500 to-amber-500" },
    { type: "end", icon: "●", color: "from-red-500 to-rose-500" },
  ]

  return (
    <div className="flex gap-4 h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Step Types</h3>
        </div>
        <div className="space-y-2">
          {stepTypes.map((step, index) => (
            <motion.button
              key={step.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addNode(step.type)}
              className="w-full p-3 text-left border-2 rounded-lg hover:bg-muted transition-all group relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {step.icon}
                </div>
                <span className="font-medium text-sm capitalize">{step.type}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 border-2 rounded-xl overflow-hidden bg-muted/30 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </motion.div>
    </div>
  )
})

export type { Node }
