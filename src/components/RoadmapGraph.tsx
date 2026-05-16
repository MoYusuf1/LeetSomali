import { useState, useRef, useCallback, useEffect } from 'react';
import type { GraphNode, GraphEdge } from '@/data/roadmapData';

interface RoadmapGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeSelect: (node: GraphNode) => void;
  selectedNode: GraphNode | null;
}

const LEVEL_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#3b82f6',
  3: '#eab308',
  4: '#a855f7',
  5: '#ef4444',
  6: '#22d3ee',
  7: '#ec4899',
  8: '#f59e0b',
};

export default function RoadmapGraph({ nodes, edges, onNodeSelect, selectedNode }: RoadmapGraphProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Zoom with mouse wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.3, Math.min(3, prev.scale * delta)),
    }));
  }, []);

  // Pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  }, [transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const fitToScreen = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const connectedNodeIds = new Set<string>();
  if (hoveredNode || selectedNode) {
    const targetId = hoveredNode || selectedNode?.id;
    edges.forEach(edge => {
      if (edge.source === targetId) connectedNodeIds.add(edge.target);
      if (edge.target === targetId) connectedNodeIds.add(edge.source);
    });
  }

  const handleNodeClick = (node: GraphNode) => {
    onNodeSelect(node);
  };

  const getNodeOpacity = (node: GraphNode) => {
    if (!hoveredNode && !selectedNode) return 1;
    const targetId = hoveredNode || selectedNode?.id;
    if (node.id === targetId) return 1;
    if (connectedNodeIds.has(node.id)) return 1;
    return 0.3;
  };

  const getEdgeOpacity = (edge: GraphEdge) => {
    if (!hoveredNode && !selectedNode) return 0.5;
    const targetId = hoveredNode || selectedNode?.id;
    if (edge.source === targetId || edge.target === targetId) return 1;
    return 0.1;
  };

  const getEdgeStrokeWidth = (edge: GraphEdge) => {
    if (!hoveredNode && !selectedNode) return edge.type === 'required' ? 2 : 1.5;
    const targetId = hoveredNode || selectedNode?.id;
    if (edge.source === targetId || edge.target === targetId) return 3;
    return 1;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] bg-[#161b22] rounded-2xl border border-[#30363d] overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #30363d33 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Fit to screen button */}
      <button
        onClick={fitToScreen}
        className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-[#1c2128] border border-[#30363d] text-xs text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
      >
        Fit to Screen
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
        <button
          onClick={() => setTransform(p => ({ ...p, scale: Math.min(3, p.scale * 1.2) }))}
          className="w-8 h-8 rounded-lg bg-[#1c2128] border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] flex items-center justify-center text-lg"
        >
          +
        </button>
        <button
          onClick={() => setTransform(p => ({ ...p, scale: Math.max(0.3, p.scale * 0.8) }))}
          className="w-8 h-8 rounded-lg bg-[#1c2128] border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] flex items-center justify-center text-lg"
        >
          −
        </button>
      </div>

      {/* SVG Graph */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
        }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#30363d" />
          </marker>
          <marker id="arrowhead-hover" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map(edge => {
          const source = nodes.find(n => n.id === edge.source);
          const target = nodes.find(n => n.id === edge.target);
          if (!source || !target) return null;

          const isHighlighted = hoveredNode === edge.source || hoveredNode === edge.target ||
            selectedNode?.id === edge.source || selectedNode?.id === edge.target;

          return (
            <line
              key={edge.id}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={isHighlighted ? '#f59e0b' : '#30363d'}
              strokeWidth={getEdgeStrokeWidth(edge)}
              strokeDasharray={edge.type === 'recommended' ? '6,4' : 'none'}
              opacity={getEdgeOpacity(edge)}
              markerEnd={isHighlighted ? 'url(#arrowhead-hover)' : 'url(#arrowhead)'}
              className="transition-all duration-200"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const color = LEVEL_COLORS[node.level] || '#8b949e';
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode === node.id;
          const opacity = getNodeOpacity(node);

          if (node.type === 'root') {
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer', opacity, transition: 'opacity 0.2s' }}
              >
                <circle
                  r={isSelected ? 30 : 26}
                  fill={node.status === 'locked' ? '#21262d' : `${color}20`}
                  stroke={node.status === 'locked' ? '#484f58' : color}
                  strokeWidth={isSelected ? 3 : 2}
                  strokeDasharray={node.status === 'locked' ? '6,4' : 'none'}
                  className="transition-all duration-200"
                />
                {node.status === 'completed' && (
                  <text textAnchor="middle" dominantBaseline="central" fill="#22c55e" fontSize="16">✓</text>
                )}
                {node.status !== 'completed' && node.status !== 'locked' && (
                  <text textAnchor="middle" dominantBaseline="central" fill={color} fontSize="14" fontWeight="bold">
                    L{node.level}
                  </text>
                )}
                {node.status === 'locked' && (
                  <text textAnchor="middle" dominantBaseline="central" fill="#484f58" fontSize="12">🔒</text>
                )}
                {isHovered && (
                  <text textAnchor="middle" y={-36} fill="#e6edf3" fontSize="12" fontWeight="500">
                    {node.label}
                  </text>
                )}
                {!isHovered && (
                  <text textAnchor="middle" y={38} fill="#8b949e" fontSize="11">
                    {node.label}
                  </text>
                )}
              </g>
            );
          }

          if (node.type === 'lesson') {
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer', opacity, transition: 'opacity 0.2s' }}
              >
                <rect
                  x={-42}
                  y={-18}
                  width={84}
                  height={36}
                  rx={8}
                  fill={node.status === 'locked' ? '#21262d' : `${color}10`}
                  stroke={node.status === 'locked' ? '#484f58' : isSelected ? '#f59e0b' : color}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray={node.status === 'locked' ? '4,3' : 'none'}
                  className="transition-all duration-200"
                />
                {node.status === 'completed' && (
                  <text x={-32} y={2} fill="#22c55e" fontSize="12">✓</text>
                )}
                {node.status === 'locked' && (
                  <text x={-34} y={2} fill="#484f58" fontSize="10">🔒</text>
                )}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={node.status === 'locked' ? '#484f58' : '#e6edf3'}
                  fontSize="10"
                  fontWeight="500"
                  x={node.status === 'completed' || node.status === 'locked' ? 4 : 0}
                >
                  {node.label.length > 12 ? node.label.slice(0, 11) + '…' : node.label}
                </text>
                {isHovered && (
                  <text textAnchor="middle" y={-26} fill="#e6edf3" fontSize="11" fontWeight="500">
                    {node.label}
                  </text>
                )}
              </g>
            );
          }

          // Concept node
          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer', opacity, transition: 'opacity 0.2s' }}
            >
              <circle
                r={isSelected ? 22 : 20}
                fill={node.status === 'locked' ? '#21262d' : `${color}20`}
                stroke={node.status === 'locked' ? '#484f58' : isSelected ? '#f59e0b' : color}
                strokeWidth={isSelected ? 3 : 2}
                strokeDasharray={node.status === 'locked' ? '5,3' : 'none'}
                className="transition-all duration-200"
              />
              {node.status === 'completed' && (
                <text textAnchor="middle" dominantBaseline="central" fill="#22c55e" fontSize="13">✓</text>
              )}
              {node.status === 'current' && (
                <text textAnchor="middle" dominantBaseline="central" fill={color} fontSize="12" fontWeight="bold">
                  {node.level}
                </text>
              )}
              {node.status === 'locked' && (
                <text textAnchor="middle" dominantBaseline="central" fill="#484f58" fontSize="10">🔒</text>
              )}
              {!isHovered && (
                <text textAnchor="middle" y={30} fill="#8b949e" fontSize="10">
                  {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
                </text>
              )}
              {isHovered && (
                <text textAnchor="middle" y={-28} fill="#e6edf3" fontSize="11" fontWeight="500">
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
