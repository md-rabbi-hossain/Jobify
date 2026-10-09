import React from "react";
import Link from "next/link";

interface Props {
  text: string;
  url: string;
  variant?: "primary" | "secondary" | "accent";
}

const styles = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
  accent: "bg-accent text-ink hover:bg-[#e9a02a]",
};

const Button: React.FC<Props> = ({ text, url, variant = "primary" }) => {
  return (
    <Link
      href={url}
      className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${styles[variant]}`}
    >
      {text}
    </Link>
  );
};

export default Button;
