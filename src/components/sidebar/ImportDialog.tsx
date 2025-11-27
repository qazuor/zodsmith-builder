import { AlertCircle, FileCode, Upload } from 'lucide-react';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useZodSmithStore } from '@/store/zodsmith.store';

interface ImportDialogProps {
  trigger?: React.ReactNode;
}

const exampleCode = `interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  isActive: boolean;
  role: 'admin' | 'user' | 'guest';
  tags: string[];
  createdAt: Date;
}`;

export function ImportDialog({ trigger }: ImportDialogProps) {
  const { t } = useTranslation();
  const { importFromTypeScript } = useZodSmithStore();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    setError(null);

    if (!code.trim()) {
      setError(t('import.errorEmpty'));
      return;
    }

    const success = importFromTypeScript(code);

    if (success) {
      setCode('');
      setOpen(false);
    } else {
      setError(t('import.errorParse'));
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setCode('');
      setError(null);
    }
    setOpen(newOpen);
  };

  const loadExample = () => {
    setCode(exampleCode);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Upload className="size-4 mr-2" />
            {t('common.import')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCode className="size-5" />
            {t('import.title')}
          </DialogTitle>
          <DialogDescription>
            {t('import.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="tsCode" className="text-sm font-medium">
                TypeScript
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={loadExample}
                className="h-7 text-xs"
              >
                {t('import.loadExample')}
              </Button>
            </div>
            <Textarea
              id="tsCode"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              placeholder={t('import.placeholder')}
              className="font-mono text-sm min-h-[200px] resize-none"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground space-y-2">
            <p className="font-medium">{t('import.supportedSyntax')}:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Interface: <code>interface Name {'{ ... }'}</code></li>
              <li>Type: <code>type Name = {'{ ... }'}</code></li>
              <li>Optional: <code>field?: type</code></li>
              <li>Nullable: <code>field: type | null</code></li>
              <li>Arrays: <code>field: type[]</code></li>
              <li>Enums: <code>'a' | 'b' | 'c'</code></li>
            </ul>
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
          <Button onClick={handleImport} disabled={!code.trim()}>
            <Upload className="size-4 mr-2" />
            {t('import.button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
