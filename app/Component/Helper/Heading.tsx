import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

const Heading = ({ title, subtitle, href, linkText }: Props) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-ink/70">{subtitle}</p>}
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default Heading;
