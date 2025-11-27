import {
  Calendar,
  Hash,
  List,
  ListOrdered,
  ToggleLeft,
  Type,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useZodSmithStore } from '@/store/zodsmith.store';
import type {
  ArrayValidations as ArrayValidationsType,
  DateValidations as DateValidationsType,
  EnumValidations as EnumValidationsType,
  FieldDefinition,
  FieldType,
  FieldValidations,
  NumberValidations as NumberValidationsType,
  StringValidations as StringValidationsType,
} from '@/types/schema.types';

import {
  ArrayValidations,
  DateValidations,
  EnumValidations,
  NumberValidations,
  StringValidations,
} from './validations';

const fieldTypeOptions: { value: FieldType; labelKey: string; icon: React.ReactNode; color: string }[] = [
  { value: 'string', labelKey: 'fieldTypes.string', icon: <Type className="size-4" />, color: 'text-blue-500' },
  { value: 'number', labelKey: 'fieldTypes.number', icon: <Hash className="size-4" />, color: 'text-green-500' },
  { value: 'boolean', labelKey: 'fieldTypes.boolean', icon: <ToggleLeft className="size-4" />, color: 'text-purple-500' },
  { value: 'date', labelKey: 'fieldTypes.date', icon: <Calendar className="size-4" />, color: 'text-orange-500' },
  { value: 'enum', labelKey: 'fieldTypes.enum', icon: <ListOrdered className="size-4" />, color: 'text-yellow-600' },
  { value: 'array', labelKey: 'fieldTypes.array', icon: <List className="size-4" />, color: 'text-pink-500' },
];

export function FieldEditor() {
  const { t } = useTranslation();
  const { currentSchema, selectedFieldId, selectField, updateField } = useZodSmithStore();

  const selectedField = currentSchema?.fields.find((f) => f.id === selectedFieldId);

  const [localField, setLocalField] = useState<FieldDefinition | null>(null);

  // Sync local state with selected field
  useEffect(() => {
    if (selectedField) {
      setLocalField({ ...selectedField });
    } else {
      setLocalField(null);
    }
  }, [selectedField]);

  const handleClose = () => {
    selectField(null);
  };

  const handleFieldChange = <K extends keyof FieldDefinition>(
    key: K,
    value: FieldDefinition[K]
  ) => {
    if (!localField || !selectedFieldId) return;

    const updated = { ...localField, [key]: value };
    setLocalField(updated);
    updateField(selectedFieldId, { [key]: value });
  };

  const handleValidationsChange = (validations: FieldValidations) => {
    if (!localField || !selectedFieldId) return;

    setLocalField({ ...localField, validations });
    updateField(selectedFieldId, { validations });
  };

  const currentTypeOption = fieldTypeOptions.find((t) => t.value === localField?.type);

  const renderValidations = () => {
    if (!localField) return null;

    switch (localField.type) {
      case 'string':
        return (
          <StringValidations
            validations={localField.validations as StringValidationsType}
            onChange={handleValidationsChange}
          />
        );
      case 'number':
        return (
          <NumberValidations
            validations={localField.validations as NumberValidationsType}
            onChange={handleValidationsChange}
          />
        );
      case 'date':
        return (
          <DateValidations
            validations={localField.validations as DateValidationsType}
            onChange={handleValidationsChange}
          />
        );
      case 'array':
        return (
          <ArrayValidations
            validations={localField.validations as ArrayValidationsType}
            onChange={handleValidationsChange}
          />
        );
      case 'enum':
        return (
          <EnumValidations
            validations={localField.validations as EnumValidationsType}
            onChange={handleValidationsChange}
          />
        );
      case 'boolean':
        return (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4 text-sm text-muted-foreground">
              {t('validations.boolean.noValidations')}{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">true</code> {t('validations.boolean.trueOrFalse')}{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">false</code>.
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={!!selectedFieldId} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" size="lg" className="p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            {currentTypeOption && (
              <span className={cn(currentTypeOption.color)}>{currentTypeOption.icon}</span>
            )}
            {t('fieldEditor.title')}
          </SheetTitle>
          <SheetDescription>
            {t('fieldEditor.description')}
          </SheetDescription>
        </SheetHeader>

        {localField && (
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="p-6 space-y-8">
              {/* Section: Identity */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t('fieldOptions.identity')}</h3>
                  <Separator className="flex-1" />
                </div>

                <div className="grid gap-4">
                  {/* Field Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fieldName" className="text-sm font-medium">
                      {t('field.name')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fieldName"
                      value={localField.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder={t('field.namePlaceholder')}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('field.nameHint')}
                    </p>
                  </div>

                  {/* Field Type */}
                  <div className="space-y-2">
                    <Label htmlFor="fieldType" className="text-sm font-medium">
                      {t('field.type')} <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={localField.type}
                      onValueChange={(value) => handleFieldChange('type', value as FieldType)}
                    >
                      <SelectTrigger id="fieldType" className="h-11">
                        <SelectValue placeholder={t('field.selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="py-2.5">
                            <div className="flex items-center gap-3">
                              <span className={cn(option.color)}>{option.icon}</span>
                              <span className="font-medium">{t(option.labelKey)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      {t('field.description')}
                    </Label>
                    <Input
                      id="description"
                      value={localField.description ?? ''}
                      onChange={(e) => handleFieldChange('description', e.target.value || undefined)}
                      placeholder={t('field.descriptionPlaceholder')}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('field.descriptionHint')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: Options */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t('fieldOptions.options')}</h3>
                  <Separator className="flex-1" />
                </div>

                <div className="grid gap-3">
                  {/* Required */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="required" className="text-sm font-medium cursor-pointer">
                          {t('fieldOptions.required')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('fieldOptions.requiredHint')}
                        </p>
                      </div>
                      <Switch
                        id="required"
                        checked={localField.required}
                        onCheckedChange={(checked) => handleFieldChange('required', checked)}
                      />
                    </div>
                    {localField.required && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {t('fieldOptions.requiredBadge')}
                      </Badge>
                    )}
                  </Card>

                  {/* Nullable */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="nullable" className="text-sm font-medium cursor-pointer">
                          {t('fieldOptions.nullable')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('fieldOptions.nullableHint')}
                        </p>
                      </div>
                      <Switch
                        id="nullable"
                        checked={localField.nullable}
                        onCheckedChange={(checked) => handleFieldChange('nullable', checked)}
                      />
                    </div>
                    {localField.nullable && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Type: {localField.type} | null
                      </Badge>
                    )}
                  </Card>

                  {/* Default Value */}
                  <Card className="p-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="defaultValue" className="text-sm font-medium">
                          {t('field.defaultValue')}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('field.defaultValueHint')}
                        </p>
                      </div>
                      <Input
                        id="defaultValue"
                        value={localField.defaultValue ?? ''}
                        onChange={(e) => handleFieldChange('defaultValue', e.target.value || undefined)}
                        placeholder={t(`defaults.${localField.type}`)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </Card>
                </div>
              </section>

              {/* Section: Validations */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('fieldOptions.validations')}
                  </h3>
                  <Separator className="flex-1" />
                </div>

                {renderValidations()}
              </section>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
