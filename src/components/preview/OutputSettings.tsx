import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useZodSmithStore } from '@/store/zodsmith.store';
import type { TypeOutputStyle } from '@/types/schema.types';

export function OutputSettings() {
  const { t } = useTranslation();
  const { outputConfig, setOutputConfig } = useZodSmithStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Settings className="size-4" />
          <span className="sr-only">{t('outputSettings.title')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-3">{t('outputSettings.title')}</h4>
            <p className="text-xs text-muted-foreground">
              {t('outputSettings.description')}
            </p>
          </div>

          <Separator />

          {/* Type Style */}
          <div className="space-y-2">
            <Label htmlFor="typeStyle" className="text-xs">{t('outputSettings.typeGeneration')}</Label>
            <Select
              value={outputConfig.typeStyle}
              onValueChange={(value) => setOutputConfig({ typeStyle: value as TypeOutputStyle })}
            >
              <SelectTrigger id="typeStyle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infer">
                  <div className="flex flex-col items-start">
                    <span>z.infer</span>
                    <span className="text-xs text-muted-foreground">{t('outputSettings.useZodInfer')}</span>
                  </div>
                </SelectItem>
                <SelectItem value="interface">
                  <div className="flex flex-col items-start">
                    <span>interface</span>
                    <span className="text-xs text-muted-foreground">{t('outputSettings.useInterface')}</span>
                  </div>
                </SelectItem>
                <SelectItem value="type">
                  <div className="flex flex-col items-start">
                    <span>type</span>
                    <span className="text-xs text-muted-foreground">{t('outputSettings.useType')}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Schema Name Suffix */}
          <div className="space-y-2">
            <Label htmlFor="schemaNameSuffix" className="text-xs">{t('outputSettings.schemaSuffix')}</Label>
            <Input
              id="schemaNameSuffix"
              value={outputConfig.schemaNameSuffix}
              onChange={(e) => setOutputConfig({ schemaNameSuffix: e.target.value })}
              placeholder="Schema"
            />
            <p className="text-xs text-muted-foreground">
              {t('outputSettings.schemaSuffixHint')}
            </p>
          </div>

          {/* Type Name Suffix */}
          <div className="space-y-2">
            <Label htmlFor="typeNameSuffix" className="text-xs">{t('outputSettings.typeSuffix')}</Label>
            <Input
              id="typeNameSuffix"
              value={outputConfig.typeNameSuffix}
              onChange={(e) => setOutputConfig({ typeNameSuffix: e.target.value })}
              placeholder="(empty)"
            />
            <p className="text-xs text-muted-foreground">
              {t('outputSettings.typeSuffixHint')}
            </p>
          </div>

          <Separator />

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeExports"
                checked={outputConfig.includeExports}
                onCheckedChange={(checked) =>
                  setOutputConfig({ includeExports: checked === true })
                }
              />
              <Label htmlFor="includeExports" className="text-sm cursor-pointer">
                {t('outputSettings.exportTypes')}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeComments"
                checked={outputConfig.includeComments}
                onCheckedChange={(checked) =>
                  setOutputConfig({ includeComments: checked === true })
                }
              />
              <Label htmlFor="includeComments" className="text-sm cursor-pointer">
                {t('outputSettings.includeComments')}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="semicolons"
                checked={outputConfig.semicolons}
                onCheckedChange={(checked) =>
                  setOutputConfig({ semicolons: checked === true })
                }
              />
              <Label htmlFor="semicolons" className="text-sm cursor-pointer">
                {t('outputSettings.includeSemicolons')}
              </Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
