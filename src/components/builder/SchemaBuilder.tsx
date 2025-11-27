import { FileCode, Pencil, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useZodSmithStore } from '@/store/zodsmith.store';

import { AddFieldButton } from './AddFieldButton';
import { FieldEditor } from './FieldEditor';
import { FieldList } from './FieldList';

export function SchemaBuilder() {
  const { t } = useTranslation();
  const {
    currentSchema,
    isEditing,
    createSchema,
    saveSchema,
    updateSchemaName,
    updateSchemaDescription,
  } = useZodSmithStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync local state with store - only when schema ID changes, not on every name/description update
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally only sync when schema ID changes
  useEffect(() => {
    if (currentSchema) {
      setNameValue(currentSchema.name);
      setDescValue(currentSchema.description || '');
    }
  }, [currentSchema?.id]);

  // Focus name input when editing
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  // Create new schema if none exists
  const handleCreateNew = () => {
    createSchema('NewSchema', '');
  };

  const handleNameSubmit = () => {
    if (nameValue.trim()) {
      updateSchemaName(nameValue.trim());
    } else {
      setNameValue(currentSchema?.name || 'Schema');
    }
    setIsEditingName(false);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescValue(e.target.value);
    updateSchemaDescription(e.target.value);
  };

  // No schema state
  if (!currentSchema) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <FileCode className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">{t('preview.noSchema')}</h3>
          <p className="text-muted-foreground text-sm text-center mb-6 max-w-[250px]">
            {t('preview.selectSchemaHint')}
          </p>
          <Button onClick={handleCreateNew}>
            <FileCode className="size-4" />
            {t('newSchema.title')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Schema Name */}
            {isEditingName ? (
              <Input
                ref={nameInputRef}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={handleNameSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSubmit();
                  if (e.key === 'Escape') {
                    setNameValue(currentSchema.name);
                    setIsEditingName(false);
                  }
                }}
                className="text-xl font-semibold h-auto py-1 px-2 -ml-2"
                placeholder={t('builder.schemaName')}
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-2 group text-left"
              >
                <CardTitle className="text-xl">{currentSchema.name}</CardTitle>
                <Pencil className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}

            {/* Schema Description */}
            <Input
              value={descValue}
              onChange={handleDescriptionChange}
              placeholder={t('builder.schemaDescriptionPlaceholder')}
              className="mt-2 text-sm text-muted-foreground border-none bg-transparent px-0 h-auto py-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <Button onClick={saveSchema} size="sm">
              <Save className="size-4" />
              {t('common.save')}
            </Button>
          )}
        </div>

        {/* Field Count */}
        <div className="text-xs text-muted-foreground mt-2">
          {currentSchema.fields.length} {t('sidebar.fields')}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-4">
            <FieldList />
            <AddFieldButton />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Field Editor Sheet */}
      <FieldEditor />
    </Card>
  );
}
