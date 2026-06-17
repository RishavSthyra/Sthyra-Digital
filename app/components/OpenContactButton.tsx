"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { openContactNotebook } from "@/lib/contact-notebook";

type OpenContactButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function OpenContactButton({
  children,
  onClick,
  type = "button",
  ...props
}: OpenContactButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    openContactNotebook();
  };

  return (
    <button type={type} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
