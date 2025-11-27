import { ChevronLeft, ChevronRight, History, LayoutTemplate } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { SchemaList } from './SchemaList';
import { TemplateList } from './TemplateList';

export function Sidebar() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'relative h-full transition-all duration-300 ease-in-out',
        collapsed ? 'w-12' : 'w-80'
      )}
    >
      {/* Collapse Button - Outside Card to avoid overflow clipping */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 z-50 size-6 rounded-full border bg-background shadow-sm"
      >
        {collapsed ? (
          <ChevronRight className="size-3" />
        ) : (
          <ChevronLeft className="size-3" />
        )}
        <span className="sr-only">
          {collapsed ? t('sidebar.expandSidebar') : t('sidebar.collapseSidebar')}
        </span>
      </Button>

      <Card className="h-full overflow-hidden w-full">
        {/* Content */}
        {collapsed ? (
          <CollapsedSidebar onExpand={() => setCollapsed(false)} />
        ) : (
          <ExpandedSidebar />
        )}
      </Card>
    </div>
  );
}

function CollapsedSidebar({ onExpand }: { onExpand: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onExpand}
        className="size-8"
        title={t('sidebar.savedSchemas')}
      >
        <History className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onExpand}
        className="size-8"
        title={t('sidebar.templates')}
      >
        <LayoutTemplate className="size-4" />
      </Button>
    </div>
  );
}

function ExpandedSidebar() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="schemas" className="h-full w-full flex flex-col overflow-hidden">
      <div className="border-b px-2 shrink-0">
        <TabsList>
          <TabsTrigger value="schemas">
            <History className="size-4" />
            {t('sidebar.schemas')}
          </TabsTrigger>
          <TabsTrigger value="templates">
            <LayoutTemplate className="size-4" />
            {t('sidebar.templates')}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContents className="flex-1 w-full overflow-hidden">
        <TabsContent value="schemas" className="h-full w-full overflow-hidden">
          <SchemaList />
        </TabsContent>

        <TabsContent value="templates" className="h-full w-full overflow-hidden">
          <TemplateList />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
