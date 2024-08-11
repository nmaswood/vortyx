"use client";

import "reactflow/dist/style.css";

import { Separator } from "@radix-ui/react-separator";
import { assertNever } from "@vortyx/precedent-iso";
import { Plus } from "lucide-react";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BaseEdge,
  Connection,
  Controls,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  Handle,
  MarkerType,
  Node,
  OnEdgesChange,
  OnNodesChange,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  useStore,
} from "reactflow";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = (data: SarjNodeData) => {
    const newNode: CustomNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      data,
      position: {
        x: 200,
        y: 200,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onConnect = useCallback(
    (
      params: any, // eslint-disable-line
    ) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
          },

          eds,
        ),
      ), //  eslint-disable-line
    [setEdges],
  );

  return (
    <main className="size-screen relative flex size-full flex-col">
      <Card>
        <h1 className="absolute z-10 p-4 text-lg font-semibold">
          Selection criteria
        </h1>
      </Card>
      <div className="relative flex size-full flex-row gap-5">
        <ReactFlowProvider>
          <Flow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </ReactFlowProvider>
        <Separator />
        <div className="">
          <AddNodes addNode={addNode} />
        </div>
      </div>
    </main>
  );
}

interface CustomEdgeData {
  label: string;
}

type CustomNode = Node<SarjNodeData>;
type CustomEdge = Edge<CustomEdgeData>;

const initialNodes: CustomNode[] = [
  {
    id: "new_application",
    position: { x: 0, y: -200 },
    data: {
      type: "workflow",
      description: "New application",
    },
    type: "custom",
  },
  {
    id: "questionare",
    position: { x: 0, y: 0 },
    data: {
      type: "data-input",
      value: "Vendor Info & Risk Assessment",
    },

    type: "custom",
  },

  {
    id: "kyb",
    position: { x: 0, y: 200 },
    data: {
      type: "task",
      value: "kyb",
    },

    type: "custom",
  },

  {
    id: "revenue",
    position: { x: 0, y: 400 },
    data: {
      type: "condition",
      field: "revenue",
      value: 1000000,
    },
    type: "custom",
  },
  {
    id: "profitable",
    position: { x: -200, y: 600 },
    data: {
      type: "condition",
      field: "profitable",
      value: 3,
    },

    type: "custom",
  },

  {
    id: "cash_flow_positive",
    position: { x: 200, y: 600 },
    data: {
      type: "condition",
      field: "cash_flow_positive",
    },

    type: "custom",
  },

  {
    id: "notify",
    position: { x: 0, y: 1100 },
    data: {
      type: "task",
      value: "notify-via-email",
    },

    type: "custom",
  },
  {
    id: "profitable_approved",
    position: { x: -100, y: 800 },
    data: {
      type: "decision",
      value: "approved",
    },
    type: "custom",
  },
  {
    id: "profitable_rejected",
    position: { x: -300, y: 800 },
    data: {
      type: "decision",
      value: "rejected",
    },
    type: "custom",
  },
  {
    id: "cash_flow_positive_approved",
    position: { x: 300, y: 800 },
    data: {
      type: "decision",
      value: "approved",
    },
    type: "custom",
  },
  {
    id: "cash_flow_positive_rejected",
    position: { x: 100, y: 800 },
    data: {
      type: "decision",
      value: "rejected",
    },
    type: "custom",
  },
];

const initialEdges: Edge[] = [
  {
    id: "new_application->questionare",
    source: "new_application",
    target: "questionare",
    label: "Start",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "question->kyb",
    source: "questionare",
    target: "kyb",
  },
  {
    id: "kyb->revenue",
    source: "kyb",
    target: "revenue",
  },
  {
    id: "revenue->profitable",
    source: "revenue",
    target: "profitable",
    label: "No",
    data: {
      label: "No",
    },
    type: "custom",
  },

  {
    id: "revenue->cash_flow_positive",
    source: "revenue",
    target: "cash_flow_positive",
    label: "Yes",
    data: {
      label: "Yes",
    },
    type: "custom",
  },

  {
    id: "profitable->profitable_approved",
    source: "profitable",
    target: "profitable_approved",
    label: "Yes",
    data: { label: "Yes" },
    type: "custom",
  },
  {
    id: "profitable->profitable_rejected",
    source: "profitable",
    target: "profitable_rejected",
    label: "No",
    data: { label: "No" },
    type: "custom",
  },
  {
    id: "cash_flow_positive->cash_flow_positive_approved",
    source: "cash_flow_positive",
    target: "cash_flow_positive_approved",
    label: "Yes",
    data: { label: "Yes" },
    type: "custom",
  },
  {
    id: "cash_flow_positive->cash_flow_positive_rejected",
    source: "cash_flow_positive",
    target: "cash_flow_positive_rejected",
    label: "No",
    data: { label: "No" },
    type: "custom",
  },
  {
    id: "profitable_approved->notify",
    source: "profitable_approved",
    target: "notify",
    type: "smoothstep",
  },
  {
    id: "profitable_rejected->notify",
    source: "profitable_rejected",
    target: "notify",
    type: "smoothstep",
  },
  {
    id: "cash_flow_positive_approved->notify",
    source: "cash_flow_positive_approved",
    target: "notify",
    type: "smoothstep",
  },
  {
    id: "cash_flow_positive_rejected->notify",
    source: "cash_flow_positive_rejected",
    target: "notify",
    type: "smoothstep",
  },
];

const typeToColor = (node: SarjNodeData): string | undefined => {
  switch (node.type) {
    case "workflow":
      return "#00B5AD";
    case "data-input":
      return "#2185D0";
    case "condition":
      return "#F9C84E";
    case "task":
      return "#E03997";
    case "decision":
      return undefined;
    default:
      assertNever(node);
  }
};

const CustomNodeComponent: React.FC<{ data: SarjNodeData }> = React.memo(
  ({ data }) => {
    const RenderNode: React.FC<{ node: SarjNodeData }> = ({ node }) => {
      switch (node.type) {
        case "workflow":
          return (
            <CardHeader className="p-0">
              <CardDescription className="font-semibold uppercase">
                Request
              </CardDescription>
              <CardTitle className={cn("text-md font-medium")}>
                {node.description}
              </CardTitle>
            </CardHeader>
          );
        case "data-input":
          return (
            <CardHeader className="p-0">
              <CardDescription className="font-semibold uppercase">
                Questionare
              </CardDescription>
              <CardTitle className={cn("text-md font-medium")}>
                {node.value}
              </CardTitle>
            </CardHeader>
          );
        case "condition": {
          const message = () => {
            switch (node.field) {
              case "revenue": {
                if (!node.value) return "Revenue?";

                const formatted = formatSAR(node.value);

                return `Revenue over ${formatted}?`;
              }
              case "years_of_operation":
                return `Operated for over ${node.value} years?`;
              case "profitable":
                return `Profitable for the last ${node.value} years?`;
              case "cash_flow_positive":
                return "Cash flow positive?";
              default:
                assertNever(node.field);
            }
          };
          return (
            <CardHeader className="p-0">
              <CardDescription className="font-semibold uppercase">
                Condition
              </CardDescription>
              <CardTitle className={cn("text-md font-medium")}>
                {message()}
              </CardTitle>
            </CardHeader>
          );
        }
        case "task": {
          const displayForTask = () => {
            switch (node.value) {
              case "notify-via-sms":
                return "Notify via SMS";
              case "notify-via-email":
                return "Notify via Email";
              case "notify-via-call":
                return "Notify via Call";
              case "kyb":
                return "Perform KYB";
              default:
                assertNever(node);
            }
          };
          return (
            <CardHeader className="p-0">
              <CardDescription className="font-semibold uppercase">
                Task
              </CardDescription>
              <CardTitle className={cn("text-md font-medium")}>
                {displayForTask()}
              </CardTitle>
            </CardHeader>
          );
        }
        case "decision":
          return (
            <CardHeader className="p-0">
              <CardTitle
                className={cn(
                  "text-md font-medium",

                  node.value === "approved"
                    ? "text-green-800"
                    : "text-destructive",
                )}
              >
                {node.value === "approved" ? "Approved" : "Rejected"}
              </CardTitle>
            </CardHeader>
          );
        default:
          assertNever(node);
      }
    };

    const color = data.type ? typeToColor(data) : undefined;

    console.log(data);
    return (
      <div
        className="bg-white"
        style={{
          color: "#FFF",
          borderRadius: "8px",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{ borderRadius: 0 }}
        />
        {color && (
          <div
            className="h-5 w-full"
            style={{
              background: color ?? "gray",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              color: color,
            }}
          />
        )}

        <Card
          style={
            color
              ? {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }
              : undefined
          }
          className="p-3"
        >
          <RenderNode node={data} />
        </Card>

        <Handle
          type="source"
          position={Position.Bottom}
          style={{ borderRadius: 0 }}
        />
      </div>
    );
  },
);

CustomNodeComponent.displayName = "CustomNodeComponent";

const proOptions = { hideAttribution: true };
const Flow: React.FC<{
  nodes: CustomNode[];
  edges: CustomEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection | Edge<CustomEdgeData>) => void;
}> = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) => {
  const reactflow = useReactFlow();
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    if (reactflow && nodesInitialized) {
      reactflow.fitView();
    }
  }, [reactflow, nodesInitialized]);
  return (
    <>
      <ReactFlow
        minZoom={0.5}
        nodeOrigin={[0.5, 0.5]}
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </>
  );
};

const AddNodes: React.FC<{
  addNode: (node: SarjNodeData) => void;
}> = ({ addNode }) => {
  return (
    <Sheet modal={false}>
      <SheetTrigger>
        <div className="absolute right-4 top-4">
          <Button>Edit workflow</Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Credit Scoring Workflow</SheetTitle>
          <SheetDescription>
            Add rules to the workflow to customize the credit scoring process.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Conditions</h2>
          <AddCondition addNode={addNode} />
          <h2 className="text-lg font-semibold">Tasks</h2>
          <AddTask addNode={addNode} />
          <h2 className="text-lg font-semibold">Decisions</h2>
          <AddDecision addNode={addNode} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AddCondition: React.FC<{
  addNode: (node: SarjNodeData) => void;
}> = ({ addNode }) => {
  const [type, setType] = useState<
    "revenue" | "years_of_operation" | "cash_flow_positive"
  >("revenue");
  const [number, setNumber] = useState<number | null>(null);
  const handleSubmit = () => {
    if (type === "cash_flow_positive") {
      addNode({ type: "condition", field: type });

      return;
    }

    if (number) {
      addNode({ type: "condition", field: type, value: number });
      setNumber(null);
    }
  };

  return (
    <div className="flex w-full flex-row gap-3">
      <Select
        onValueChange={(value) =>
          setType(value as "revenue" | "years_of_operation")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Revenue" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="revenue">Revenue</SelectItem>
          <SelectItem value="years_of_operation">Years of Operation</SelectItem>
          <SelectItem value="cash_flow_positive">Cashflow Positive</SelectItem>
        </SelectContent>
      </Select>
      {type === "cash_flow_positive" ? null : (
        <>
          <Select disabled>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder=">=" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="is_greater_than">{">="}</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={number ?? ""}
            onChange={(e) => {
              setNumber(Number(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </>
      )}

      <Button
        type="submit"
        variant="outline"
        size="icon"
        onClick={handleSubmit}
        className="p-2"
      >
        <Plus />
      </Button>
    </div>
  );
};

const AddTask: React.FC<{
  addNode: (node: SarjNodeData) => void;
}> = ({ addNode }) => {
  const [task, setTask] = useState<
    "notify-via-sms" | "notify-via-email" | "notify-via-call"
  >("notify-via-sms");
  const handleSubmit = () => {
    addNode({ type: "task", value: task });
  };
  return (
    <div className="flex w-full flex-row gap-3">
      <Select
        value={task}
        onValueChange={(value) =>
          setTask(
            value as "notify-via-sms" | "notify-via-email" | "notify-via-call",
          )
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Notify via SMS" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="notify-via-sms">Notify via SMS</SelectItem>
          <SelectItem value="notify-via-email">Notify via Email</SelectItem>
          <SelectItem value="kyb">Perform KYB</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="submit"
        variant="outline"
        size="icon"
        onClick={handleSubmit}
        className="p-2"
      >
        <Plus />
      </Button>
    </div>
  );
};

const AddDecision: React.FC<{
  addNode: (node: SarjNodeData) => void;
}> = ({ addNode }) => {
  const [decision, setDecision] = useState<"approved" | "rejected">("approved");

  const handleSubmit = () => {
    addNode({ type: "decision", value: decision });
  };
  return (
    <div className="flex w-full flex-row gap-3">
      <Select
        value={decision}
        onValueChange={(value) => setDecision(value as "approved" | "rejected")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Approved" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="submit"
        variant="outline"
        size="icon"
        onClick={handleSubmit}
        className="p-2"
      >
        <Plus />
      </Button>
    </div>
  );
};

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  ...rest
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const nodes = useStore((store) => store.getNodes());

  const { setEdges } = useReactFlow();

  const updateEdgeLabel = (newLabel: string) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === id) {
          return { ...edge, data: { ...edge.data, label: newLabel } };
        }
        return edge;
      }),
    );
  };

  const sourceNode = nodes.find((n) => n.id === rest.source);

  const isCondition = sourceNode?.data.type === "condition";

  return (
    <>
      <BaseEdge id={id} path={edgePath} />

      {isCondition && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              padding: 10,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 700,
              pointerEvents: "all",
              cursor: "pointer",
            }}
            className="nodrag nopan"
          >
            <select
              onChange={(e) => updateEdgeLabel(e.target.value)}
              value={data?.label}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

type WorkflowNode = {
  type: "workflow";
  description: string;
};

type DataInput = {
  type: "data-input";
  value: "Vendor Info & Risk Assessment";
};

type Condition = {
  type: "condition";
  field: "revenue" | "years_of_operation" | "profitable" | "cash_flow_positive";
  value?: number;
};

type Task = {
  type: "task";
  value: "notify-via-sms" | "notify-via-email" | "notify-via-call" | "kyb";
};

type Decision = {
  type: "decision";
  value: "approved" | "rejected";
};

type SarjNodeData = WorkflowNode | DataInput | Condition | Task | Decision;

function formatSAR(value: number) {
  return new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
const NODE_TYPES = { custom: CustomNodeComponent };
const EDGE_TYPES = { custom: CustomEdge };
