// styles/buttonVariants.ts
import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", // Base styles
  {
    variants: {
      intent: {
        primary: "bg-main-purple text-white hover:bg-main-purple-hover",
        add:" bg-lines-light text-main-purple hover:bg-light-grey font-semibold text-heading-m",
        secondary: "bg-lines text-white hover:bg-medium-grey",
        x: "text-heading-xl font-thin   text-medium-grey hover:text-lines",
        destructive: "bg-red text-white hover:bg-red-hover",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6 py-3",
      },
      disabled: true,
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

const Buttons = ({ intent, size, disabled, className, children, ...props }) => {
  return (
    <button
      className={button({ intent, size, className, disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Buttons;
