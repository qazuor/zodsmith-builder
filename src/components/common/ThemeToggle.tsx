import { useTranslation } from "react-i18next";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Moon } from "@/components/animate-ui/icons/moon";
import { Sun } from "@/components/animate-ui/icons/sun";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AnimateIcon animateOnHover asChild>
          <Button variant="outline" size="icon">
            <Sun
              size={18}
              className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              size={18}
              className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">{t("theme.toggle")}</span>
          </Button>
        </AnimateIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>{t("theme.light")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>{t("theme.system")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
