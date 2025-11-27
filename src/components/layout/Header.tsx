import { useTranslation } from "react-i18next";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Link } from "@/components/animate-ui/icons/link";

import { HelpDialog } from "@/components/common/HelpDialog";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MobileMenu } from "@/components/sidebar";
import { siteConfig } from "@/config/site.config";

export function Header() {
  const { t } = useTranslation();
  const AppIcon = siteConfig.app.icon;

  return (
    <header className="header-gradient border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <MobileMenu />

          <div className="flex items-center gap-2">
            <AppIcon className="text-primary h-6 w-6" />
            <h1 className="text-xl font-bold">{t("app.title")}</h1>
          </div>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <AnimateIcon animateOnHover asChild>
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hidden items-center gap-1 text-sm transition-colors sm:flex"
            >
              by {siteConfig.author.name}
              <Link size={12} />
            </a>
          </AnimateIcon>
        </div>
        <div className="flex items-center gap-2">
          <HelpDialog />
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
