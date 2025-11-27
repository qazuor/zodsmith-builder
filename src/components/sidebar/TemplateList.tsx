import {
  FileText,
  Globe,
  LogIn,
  Mail,
  MapPin,
  Package,
  Settings,
  User,
} from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useZodSmithStore } from '@/store/zodsmith.store';
import { getTranslatedTemplates } from '@/templates/schemas';

const iconMap: Record<string, React.ReactNode> = {
  User: <User className="size-4" />,
  Package: <Package className="size-4" />,
  MapPin: <MapPin className="size-4" />,
  Globe: <Globe className="size-4" />,
  FileText: <FileText className="size-4" />,
  Mail: <Mail className="size-4" />,
  LogIn: <LogIn className="size-4" />,
  Settings: <Settings className="size-4" />,
};

export function TemplateList() {
  const { t } = useTranslation();
  const { loadTemplate } = useZodSmithStore();

  const templates = useMemo(() => getTranslatedTemplates(t), [t]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="p-3 pr-4 border-b">
        <h3 className="font-medium text-sm truncate">{t('templates.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {t('templates.description')}
        </p>
      </div>

      {/* Template List */}
      <ScrollArea className="flex-1">
        <div className="p-2 pr-4 space-y-1 w-full">
          {templates.map((template) => (
            <Button
              key={template.id}
              variant="ghost"
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => loadTemplate(template)}
            >
              <div className="flex items-start gap-3 w-full min-w-0">
                <div className="text-muted-foreground mt-0.5 shrink-0">
                  {iconMap[template.icon] || <FileText className="size-4" />}
                </div>
                <div className="flex-1 text-left min-w-0 overflow-hidden">
                  <div className="font-medium text-sm truncate">{template.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {template.description}
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">
                    {template.schema.fields.length} {t('sidebar.fields')}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
