import React from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}

const Field = ({ label, htmlFor, hint, children }: FieldProps) => (
  <div>
    <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
      {label}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-sm text-ink/60">{hint}</p>}
  </div>
);

export default Field;
