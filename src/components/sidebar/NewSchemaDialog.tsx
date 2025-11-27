import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useZodSmithStore } from '@/store/zodsmith.store';

interface NewSchemaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewSchemaDialog({ open, onOpenChange }: NewSchemaDialogProps) {
  const { t } = useTranslation();
  const { createSchema } = useZodSmithStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    createSchema(name.trim(), description.trim() || undefined);
    setName('');
    setDescription('');
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setName('');
      setDescription('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('newSchema.title')}</DialogTitle>
            <DialogDescription>
              {t('newSchema.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schemaName">{t('builder.schemaName')}</Label>
              <Input
                id="schemaName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('newSchema.namePlaceholder')}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                {t('field.nameHint')}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schemaDescription">{t('newSchema.schemaDescription')}</Label>
              <Input
                id="schemaDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('newSchema.schemaDescriptionPlaceholder')}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
