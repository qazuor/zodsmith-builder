import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCheck } from "@/components/animate-ui/icons/check-check";
import { Clipboard } from "@/components/animate-ui/icons/clipboard";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
}

export function CopyButton({ text, onCopy }: CopyButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="dynamic-accent w-full">
            <AnimateIcon animateOnHover asChild>
              <Button onClick={handleCopy} variant="default" className="w-full shadow-dynamic-md">
                {copied ? (
                  <>
                    <CheckCheck size={16} animate className="mr-2" />
                    {t("actions.copied")}
                  </>
                ) : (
                  <>
                    <Clipboard size={16} className="mr-2" />
                    {t("actions.copy")}
                  </>
                )}
              </Button>
            </AnimateIcon>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? t("actions.copied") : t("actions.copy")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
