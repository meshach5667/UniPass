import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-smooth hover:bg-muted/50",
        className
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Sun 
        className={cn(
          "h-4 w-4 transition-all duration-300 ease-in-out",
          theme === "dark" 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        )} 
      />
      <Moon 
        className={cn(
          "absolute h-4 w-4 transition-all duration-300 ease-in-out",
          theme === "light" 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        )} 
      />
    </Button>
  );
};