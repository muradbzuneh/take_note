import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, iconOnly = false, size = "md" }: LogoProps) => {
  const iconSizes = {
    sm: "size-7",
    md: "size-8.5",
    lg: "size-10",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight select-none", className)}>
      <div className={cn("relative overflow-hidden rounded-md bg-white border border-border/80 shrink-0 p-0.5", iconSizes[size])}>
        <Image
          src="/logo-icon.png"
          alt="Notebook Logo"
          width={48}
          height={48}
          className="size-full object-contain"
          priority
        />
      </div>

      {!iconOnly && (
        <span className={cn("leading-none font-bold tracking-tight", textSizes[size])}>
          <span className="text-foreground">Note</span>
          <span className="text-primary">book</span>
        </span>
      )}
    </div>
  );
};

export const LogoIcon = ({ className }: { className?: string; uniColor?: boolean }) => {
  return (
    <div className={cn("relative size-8 overflow-hidden rounded-md bg-white border border-border/80 shrink-0 p-0.5", className)}>
      <Image
        src="/logo-icon.png"
        alt="Notebook Logo"
        width={36}
        height={36}
        className="size-full object-contain"
        priority
      />
    </div>
  );
};

export default Logo;
