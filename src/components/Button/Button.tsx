import clsx from "clsx";

export interface ButtonProps {
  // Define your button props here
  children?: React.ReactNode;

  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  theme?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "ghost";
  disabled?: boolean;
}

const Button = ({
  onClick = () => {},
  className,
  type = "button",
  theme = "primary",
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const mainClasseName = clsx(
    className,
    "px-4 py-2 rounded font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
    {
      [`btn-${theme}`]: !!theme,
    }
  );
  return (
    <button
      type={type}
      className={mainClasseName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
