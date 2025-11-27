import {
  Braces,
  Code2,
  Copy,
  GripVertical,
  HelpCircle,
  Languages,
  LayoutTemplate,
  Moon,
  Palette,
  Plus,
  Save,
  Settings,
  Upload,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function HelpDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" title={t('common.help')}>
          <HelpCircle className="size-4" />
          <span className="sr-only">{t('common.help')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Braces className="size-5" />
            {t('helpDialog.title')}
          </DialogTitle>
          <DialogDescription>
            {t('helpDialog.description')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            {/* Getting Started */}
            <Section title={t('helpDialog.sections.gettingStarted.title')}>
              <Step
                icon={<Plus className="size-4" />}
                title={t('helpDialog.sections.gettingStarted.createSchema.title')}
                description={t('helpDialog.sections.gettingStarted.createSchema.description')}
              />
              <Step
                icon={<LayoutTemplate className="size-4" />}
                title={t('helpDialog.sections.gettingStarted.useTemplates.title')}
                description={t('helpDialog.sections.gettingStarted.useTemplates.description')}
              />
              <Step
                icon={<Upload className="size-4" />}
                title={t('helpDialog.sections.gettingStarted.importTs.title')}
                description={t('helpDialog.sections.gettingStarted.importTs.description')}
              />
            </Section>

            <Separator />

            {/* Building Schema */}
            <Section title={t('helpDialog.sections.buildingSchema.title')}>
              <Step
                icon={<Plus className="size-4" />}
                title={t('helpDialog.sections.buildingSchema.addFields.title')}
                description={t('helpDialog.sections.buildingSchema.addFields.description')}
              />
              <Step
                icon={<GripVertical className="size-4" />}
                title={t('helpDialog.sections.buildingSchema.reorderFields.title')}
                description={t('helpDialog.sections.buildingSchema.reorderFields.description')}
              />
              <Step
                icon={<Braces className="size-4" />}
                title={t('helpDialog.sections.buildingSchema.configureValidations.title')}
                description={t('helpDialog.sections.buildingSchema.configureValidations.description')}
              />
            </Section>

            <Separator />

            {/* Field Options */}
            <Section title={t('helpDialog.sections.fieldOptions.title')}>
              <Step
                icon={<Braces className="size-4" />}
                title={t('helpDialog.sections.fieldOptions.required.title')}
                description={t('helpDialog.sections.fieldOptions.required.description')}
              />
              <Step
                icon={<Braces className="size-4" />}
                title={t('helpDialog.sections.fieldOptions.nullable.title')}
                description={t('helpDialog.sections.fieldOptions.nullable.description')}
              />
              <Step
                icon={<Braces className="size-4" />}
                title={t('helpDialog.sections.fieldOptions.defaultValue.title')}
                description={t('helpDialog.sections.fieldOptions.defaultValue.description')}
              />
            </Section>

            <Separator />

            {/* Field Types */}
            <Section title={t('helpDialog.sections.fieldTypes.title')}>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <TypeInfo
                  type={t('fieldTypes.string')}
                  validations={t('helpDialog.sections.fieldTypes.string')}
                />
                <TypeInfo
                  type={t('fieldTypes.number')}
                  validations={t('helpDialog.sections.fieldTypes.number')}
                />
                <TypeInfo
                  type={t('fieldTypes.boolean')}
                  validations={t('helpDialog.sections.fieldTypes.boolean')}
                />
                <TypeInfo
                  type={t('fieldTypes.date')}
                  validations={t('helpDialog.sections.fieldTypes.date')}
                />
                <TypeInfo
                  type={t('fieldTypes.enum')}
                  validations={t('helpDialog.sections.fieldTypes.enum')}
                />
                <TypeInfo
                  type={t('fieldTypes.array')}
                  validations={t('helpDialog.sections.fieldTypes.array')}
                />
              </div>
            </Section>

            <Separator />

            {/* Code Output */}
            <Section title={t('helpDialog.sections.codeOutput.title')}>
              <Step
                icon={<Code2 className="size-4" />}
                title={t('helpDialog.sections.codeOutput.previewTabs.title')}
                description={t('helpDialog.sections.codeOutput.previewTabs.description')}
              />
              <Step
                icon={<Copy className="size-4" />}
                title={t('helpDialog.sections.codeOutput.copyCode.title')}
                description={t('helpDialog.sections.codeOutput.copyCode.description')}
              />
              <Step
                icon={<Settings className="size-4" />}
                title={t('helpDialog.sections.codeOutput.outputSettings.title')}
                description={t('helpDialog.sections.codeOutput.outputSettings.description')}
              />
            </Section>

            <Separator />

            {/* Saving */}
            <Section title={t('helpDialog.sections.saving.title')}>
              <Step
                icon={<Save className="size-4" />}
                title={t('helpDialog.sections.saving.saveSchema.title')}
                description={t('helpDialog.sections.saving.saveSchema.description')}
              />
              <Step
                icon={<Copy className="size-4" />}
                title={t('helpDialog.sections.saving.duplicate.title')}
                description={t('helpDialog.sections.saving.duplicate.description')}
              />
            </Section>

            <Separator />

            {/* Customization */}
            <Section title={t('helpDialog.sections.customization.title')}>
              <Step
                icon={<Moon className="size-4" />}
                title={t('helpDialog.sections.customization.theme.title')}
                description={t('helpDialog.sections.customization.theme.description')}
              />
              <Step
                icon={<Languages className="size-4" />}
                title={t('helpDialog.sections.customization.language.title')}
                description={t('helpDialog.sections.customization.language.description')}
              />
            </Section>

            <Separator />

            {/* Tips */}
            <Section title={t('helpDialog.sections.tips.title')}>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Braces className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{t('helpDialog.sections.tips.pascalCase')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Code2 className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{t('helpDialog.sections.tips.camelCase')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <GripVertical className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{t('helpDialog.sections.tips.dragDrop')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="size-4 mt-0.5 flex-shrink-0" />
                  <span>{t('helpDialog.sections.tips.realTime')}</span>
                </div>
              </div>
            </Section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TypeInfo({ type, validations }: { type: string; validations: string }) {
  return (
    <div className="rounded-md border p-2">
      <p className="font-medium">{type}</p>
      <p className="text-xs text-muted-foreground">{validations}</p>
    </div>
  );
}
