import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
function Input({ className, type = "text", ...props }) {
    return (_jsx("input", { type: type, className: cn(`
        w-[350px]
        h-[50px]

        px-[18px]
        text-[14px]
        leading-[19px]
        text-white

        placeholder:text-white/60
        placeholder:text-[14px]

        border-2
        border-white
        rounded-[20px]

        bg-transparent
        outline-none

        transition
        `, className), style: {
            background: 'rgba(148,163,184,0.18)',
            backdropFilter: "blur(42px)",
            WebkitBackdropFilter: "blur(42px)",
        }, ...props }));
}
export { Input };
