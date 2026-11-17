import { X_HANDLE, X_URL } from "../config";
import { XIcon } from "./XIcon";

interface XLinkProps {
  /** "button": outlined control. "plain": inline text link. */
  variant?: "button" | "plain";
  label?: string;
}

export function XLink({ variant = "button", label = `Follow ${X_HANDLE}` }: XLinkProps) {
  return (
    <a
      className={variant === "button" ? "btn btn--secondary" : "link"}
      href={X_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <XIcon />
      <span>{label}</span>
    </a>
  );
}
