import clsx from "clsx";

export interface ButtonProps {
  // Define your button props here
  children?: React.ReactNode;

  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?:
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
  variant = "primary",
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const mainClasseName = clsx(
    className,
    "px-4 py-2 rounded font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ",
    {
      [`btn-${variant}`]: !!variant,
      "opacity-50 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
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
