import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

import { siteConfig } from "@/config/site.config";

export function Footer() {
  const { t } = useTranslation();
  const { author, socialLinks, freelanceLinks, techStack, mobileTechStack } = siteConfig;

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-2 md:py-3">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-2 md:hidden">
          {/* Row 1: Name + Social Links */}
          <div className="flex items-center justify-between">
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {author.name}
            </a>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
              {freelanceLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={link.name}
                >
                  {link.icon ? <link.icon className="h-4 w-4" /> : link.name}
                </a>
              ))}
            </div>
          </div>
          {/* Row 2: Made with love */}
          <div className="flex items-center justify-center gap-1">
            <span className="text-muted-foreground text-xs">{t("footer.madeWith")}</span>
            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
            <span className="text-muted-foreground text-xs">{t("footer.using")}</span>
            {mobileTechStack.map((tech, index) => (
              <span key={tech} className="text-muted-foreground text-xs">
                {tech}
                {index < mobileTechStack.length - 1 && " · "}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-4">
          {/* Author & Location - Left */}
          <div className="flex flex-col items-start gap-1">
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-medium transition-colors"
            >
              {author.name}
            </a>
            <span className="text-muted-foreground text-xs">{author.location}</span>
          </div>

          {/* Made with love + Tech Stack - Center */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <span>{t("footer.madeWith")}</span>
              <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              <span>{t("footer.using")}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-1">
              {techStack.map((tech, index) => (
                <span key={tech} className="text-muted-foreground text-xs">
                  <span className="hover:text-primary transition-colors">{tech}</span>
                  {index < techStack.length - 1 && <span className="mx-0.5">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links - Right */}
          <div className="flex items-center justify-end gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
            {freelanceLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={link.name}
              >
                {link.icon ? <link.icon className="h-5 w-5" /> : link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
