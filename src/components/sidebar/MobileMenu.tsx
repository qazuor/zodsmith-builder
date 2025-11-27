import { History, LayoutTemplate, Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SchemaList } from './SchemaList';
import { TemplateList } from './TemplateList';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>ZodSmith</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="schemas" className="flex-1 flex flex-col h-[calc(100%-60px)]">
          <div className="border-b px-2">
            <TabsList className="h-10 w-full bg-transparent p-0">
              <TabsTrigger
                value="schemas"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <History className="size-4 mr-1.5" />
                Schemas
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <LayoutTemplate className="size-4 mr-1.5" />
                Templates
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="schemas" className="flex-1 mt-0 overflow-hidden">
            <SchemaList />
          </TabsContent>

          <TabsContent value="templates" className="flex-1 mt-0 overflow-hidden">
            <TemplateList />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
