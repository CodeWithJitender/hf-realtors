import Link from "next/link";

export default function Button({
    className,
    variant = "solid",
    href,
    children,
    onClick,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 uppercase tracking-[0.2em] text-xs font-semibold rounded-theme-pill transition-all duration-300";

    const variants = {
        solid: "bg-transparent text-[#F9F8F6] border border-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]",
        ghost: "bg-transparent text-[#F9F8F6] border border-transparent hover:border-[#F9F8F6]",
        dark: "bg-transparent text-[#F9F8F6] border border-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]",
        outline: "bg-transparent text-[#F9F8F6] border border-[#F9F8F6]/30 hover:border-[#F9F8F6] hover:bg-[#F9F8F6]/5",
    };
    const combinedClassName = `${baseStyles} ${variants[variant]} ${className || ""}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
