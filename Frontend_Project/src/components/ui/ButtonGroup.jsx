import { Plus } from 'lucide-react';

export default function ButtonGroup({ onClick, children, className = "", ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-secondary ${className}`}
      {...props}>
      <Plus className="h-4 w-4 text-red-600" strokeWidth={2.5} />
      <span>{children || "Create New"}</span>
    </button>
  );
}
