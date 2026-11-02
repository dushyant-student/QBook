"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ label = "Print", className = "" }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`no-print flex items-center justify-center gap-2 px-4 py-1 rounded-sm bg-violet-100 text-violet-700 hover:bg-violet-200 transition-all disabled:opacity-50 ${className}`}
    >
      <Printer size={18} />
      {label}
    </button>
  );
}
