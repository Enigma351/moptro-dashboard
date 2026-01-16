import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `
          w-[350px]
          h-[45px]

          flex
          items-center
          justify-center

          bg-[#0075FF]
          text-white
          text-[14px]
          font-bold

          rounded-[12px]

          backdrop-blur-[50px]
          transition-colors
          hover:bg-[#0068E0]

          focus:outline-none
          disabled:opacity-50
          disabled:pointer-events-none
          `,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
