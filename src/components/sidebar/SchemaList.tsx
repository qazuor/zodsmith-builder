import { Copy, FileCode, MoreVertical, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useZodSmithStore } from '@/store/zodsmith.store';
import type { SchemaDefinition } from '@/types/schema.types';

import { ImportDialog } from './ImportDialog';
import { NewSchemaDialog } from './NewSchemaDialog';

export function SchemaList() {
  const { t } = useTranslation();
  const {
    savedSchemas,
    currentSchema,
    loadSchema,
    deleteSchema,
    duplicateSchema,
  } = useZodSmithStore();

  const [dialogOpen, setDialogOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 pr-4 border-b">
        <h3 className="font-medium text-sm">{t('sidebar.savedSchemas')}</h3>
        <div className="flex items-center gap-1">
          <ImportDialog
            trigger={
              <Button variant="ghost" size="icon-sm" title={t('import.title')}>
                <Upload className="size-4" />
                <span className="sr-only">{t('common.import')}</span>
              </Button>
            }
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDialogOpen(true)}
            title={t('newSchema.title')}
          >
            <Plus className="size-4" />
            <span className="sr-only">{t('newSchema.title')}</span>
          </Button>
        </div>
      </div>

      {/* Schema List */}
      <ScrollArea className="flex-1">
        {savedSchemas.length === 0 ? (
          <div className="p-4 pr-4 text-center w-full">
            <FileCode className="size-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{t('sidebar.noSavedSchemas')}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {t('sidebar.createSchemaHint')}
            </p>
          </div>
        ) : (
          <div className="p-2 pr-4 space-y-1 w-full">
            {savedSchemas.map((schema) => (
              <SchemaListItem
                key={schema.id}
                schema={schema}
                isActive={currentSchema?.id === schema.id}
                onLoad={() => loadSchema(schema.id)}
                onDuplicate={() => duplicateSchema(schema.id)}
                onDelete={() => deleteSchema(schema.id)}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* New Schema Dialog */}
      <NewSchemaDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

interface SchemaListItemProps {
  schema: SchemaDefinition;
  isActive: boolean;
  onLoad: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  formatDate: (date: string) => string;
}

function SchemaListItem({
  schema,
  isActive,
  onLoad,
  onDuplicate,
  onDelete,
  formatDate,
}: SchemaListItemProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-md p-2 cursor-pointer transition-colors overflow-hidden',
        isActive
          ? 'bg-primary/10 border border-primary/20'
          : 'hover:bg-accent/50'
      )}
    >
      <button
        type="button"
        onClick={onLoad}
        className="flex-1 min-w-0 text-left overflow-hidden"
      >
        <div className="font-medium text-sm truncate max-w-full">{schema.name}</div>
        <div className="text-xs text-muted-foreground truncate max-w-full">
          <span>{schema.fields.length} {t('sidebar.fields')}</span>
          <span> • </span>
          <span>{formatDate(schema.updatedAt)}</span>
        </div>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="size-4" />
            <span className="sr-only">{t('common.actions')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onLoad}>
            <FileCode className="size-4 mr-2" />
            {t('common.load')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="size-4 mr-2" />
            {t('common.duplicate')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="size-4 mr-2" />
            {t('common.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
