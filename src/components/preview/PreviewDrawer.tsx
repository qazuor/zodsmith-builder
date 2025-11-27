import { Braces, Code2, FileCode2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import { CopyButton } from '@/components/common/CopyButton';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  generateFullModule,
  generateTypeScript,
  generateZodSchema,
} from '@/generators';
import { useZodSmithStore } from '@/store/zodsmith.store';

import { CodeBlock } from './CodeBlock';
import { OutputSettings } from './OutputSettings';

export function PreviewDrawer() {
  const { t } = useTranslation();
  const { currentSchema, outputConfig } = useZodSmithStore();
  const [open, setOpen] = useState(false);

  const zodCode = useMemo(() => {
    if (!currentSchema || currentSchema.fields.length === 0) return '';
    return generateZodSchema(currentSchema, outputConfig);
  }, [currentSchema, outputConfig]);

  const typeCode = useMemo(() => {
    if (!currentSchema || currentSchema.fields.length === 0) return '';
    return generateTypeScript(currentSchema, outputConfig);
  }, [currentSchema, outputConfig]);

  const fullCode = useMemo(() => {
    if (!currentSchema || currentSchema.fields.length === 0) return '';
    return generateFullModule(currentSchema, outputConfig);
  }, [currentSchema, outputConfig]);

  const hasContent = currentSchema && currentSchema.fields.length > 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 size-12 rounded-full shadow-lg border-2"
          title={t('preview.viewCode')}
        >
          <Code2 className="size-5" />
          <span className="sr-only">{t('preview.viewCode')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" size="full" className="p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between pr-8">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Code2 className="size-5" />
                {t('preview.title')}
              </SheetTitle>
              <SheetDescription>
                {currentSchema ? currentSchema.name : t('preview.noSchema')}
              </SheetDescription>
            </div>
            {hasContent && <OutputSettings />}
          </div>
        </SheetHeader>

        {!hasContent ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] px-6">
            <Braces className="size-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('preview.noCode')}</h3>
            <p className="text-muted-foreground text-sm text-center max-w-[280px]">
              {currentSchema
                ? t('preview.addFieldsHint')
                : t('preview.selectSchemaHint')}
            </p>
          </div>
        ) : (
          <Tabs defaultValue="zod" className="flex-1 flex flex-col h-[calc(100%-80px)]">
            <div className="px-6 py-3">
              <TabsList>
                <TabsTrigger value="zod">
                  <Braces className="size-4" />
                  {t('preview.zodSchema')}
                </TabsTrigger>
                <TabsTrigger value="typescript">
                  <Code2 className="size-4" />
                  {t('preview.typescript')}
                </TabsTrigger>
                <TabsTrigger value="full">
                  <FileCode2 className="size-4" />
                  {t('preview.fullModule')}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContents className="flex-1">
              <TabsContent value="zod">
                <div className="flex flex-col">
                  <div className="flex justify-end px-6 py-3 border-b bg-muted/30">
                    <CopyButton text={zodCode} />
                  </div>
                  <div className="max-h-[calc(100vh-280px)] overflow-auto">
                    <CodeBlock code={zodCode} className="px-6 py-4" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="typescript">
                <div className="flex flex-col">
                  <div className="flex justify-end px-6 py-3 border-b bg-muted/30">
                    <CopyButton text={typeCode} />
                  </div>
                  <div className="max-h-[calc(100vh-280px)] overflow-auto">
                    <CodeBlock code={typeCode} className="px-6 py-4" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="full">
                <div className="flex flex-col">
                  <div className="flex justify-end px-6 py-3 border-b bg-muted/30">
                    <CopyButton text={fullCode} />
                  </div>
                  <div className="max-h-[calc(100vh-280px)] overflow-auto">
                    <CodeBlock code={fullCode} className="px-6 py-4" />
                  </div>
                </div>
              </TabsContent>
            </TabsContents>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
}
