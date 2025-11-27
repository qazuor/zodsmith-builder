import { Braces, Code2, FileCode2 } from 'lucide-react';
import { useMemo } from 'react';

import { CopyButton } from '@/components/common/CopyButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  generateFullModule,
  generateTypeScript,
  generateZodSchema,
} from '@/generators';
import { useZodSmithStore } from '@/store/zodsmith.store';

import { CodeBlock } from './CodeBlock';
import { OutputSettings } from './OutputSettings';

export function CodePreview() {
  const { currentSchema, outputConfig } = useZodSmithStore();

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

  if (!currentSchema) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <Code2 className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Preview Available</h3>
          <p className="text-muted-foreground text-sm text-center max-w-[250px]">
            Create a schema and add fields to see the generated code preview.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (currentSchema.fields.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <Braces className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">Add Fields</h3>
          <p className="text-muted-foreground text-sm text-center max-w-[250px]">
            Add fields to your schema to generate Zod and TypeScript code.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="size-5" />
            Code Preview
          </CardTitle>
          <OutputSettings />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <Tabs defaultValue="zod" className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-10 bg-transparent p-0 gap-4">
              <TabsTrigger
                value="zod"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2"
              >
                <Braces className="size-4 mr-1.5" />
                Zod Schema
              </TabsTrigger>
              <TabsTrigger
                value="typescript"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2"
              >
                <Code2 className="size-4 mr-1.5" />
                TypeScript
              </TabsTrigger>
              <TabsTrigger
                value="full"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2"
              >
                <FileCode2 className="size-4 mr-1.5" />
                Full Module
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="zod" className="flex-1 mt-0 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-end p-2 border-b">
                <CopyButton text={zodCode} />
              </div>
              <ScrollArea className="flex-1">
                <CodeBlock code={zodCode} />
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="typescript" className="flex-1 mt-0 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-end p-2 border-b">
                <CopyButton text={typeCode} />
              </div>
              <ScrollArea className="flex-1">
                <CodeBlock code={typeCode} />
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="full" className="flex-1 mt-0 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-end p-2 border-b">
                <CopyButton text={fullCode} />
              </div>
              <ScrollArea className="flex-1">
                <CodeBlock code={fullCode} />
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
