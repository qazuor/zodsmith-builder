import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StringValidations as StringValidationsType } from '@/types/schema.types';

interface StringValidationsProps {
  validations: StringValidationsType;
  onChange: (validations: StringValidationsType) => void;
}

export function StringValidations({ validations, onChange }: StringValidationsProps) {
  const updateValidation = <K extends keyof StringValidationsType>(
    key: K,
    value: StringValidationsType[K]
  ) => {
    onChange({ ...validations, [key]: value });
  };

  const toggleValidation = (key: keyof StringValidationsType) => {
    const current = validations[key];
    if (typeof current === 'boolean') {
      onChange({ ...validations, [key]: !current });
    } else {
      onChange({ ...validations, [key]: true });
    }
  };

  const clearValidation = (key: keyof StringValidationsType) => {
    const updated = { ...validations };
    delete updated[key];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Length Constraints */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Length Constraints</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="min" className="text-xs">Min Length</Label>
            <Input
              id="min"
              type="number"
              min={0}
              placeholder="No min"
              value={validations.min ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('min');
                } else {
                  updateValidation('min', Number.parseInt(val, 10));
                }
              }}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="max" className="text-xs">Max Length</Label>
            <Input
              id="max"
              type="number"
              min={0}
              placeholder="No max"
              value={validations.max ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('max');
                } else {
                  updateValidation('max', Number.parseInt(val, 10));
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="length" className="text-xs">Exact Length</Label>
          <Input
            id="length"
            type="number"
            min={0}
            placeholder="Any length"
            value={validations.length ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('length');
              } else {
                updateValidation('length', Number.parseInt(val, 10));
              }
            }}
          />
        </div>
      </div>

      {/* Format Validations */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Format</h4>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={validations.email ?? false}
              onCheckedChange={() => {
                if (validations.email) {
                  clearValidation('email');
                } else {
                  toggleValidation('email');
                }
              }}
            />
            <Label htmlFor="email" className="text-sm cursor-pointer">Email</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="url"
              checked={validations.url ?? false}
              onCheckedChange={() => {
                if (validations.url) {
                  clearValidation('url');
                } else {
                  toggleValidation('url');
                }
              }}
            />
            <Label htmlFor="url" className="text-sm cursor-pointer">URL</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="uuid"
              checked={validations.uuid ?? false}
              onCheckedChange={() => {
                if (validations.uuid) {
                  clearValidation('uuid');
                } else {
                  toggleValidation('uuid');
                }
              }}
            />
            <Label htmlFor="uuid" className="text-sm cursor-pointer">UUID</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="cuid"
              checked={validations.cuid ?? false}
              onCheckedChange={() => {
                if (validations.cuid) {
                  clearValidation('cuid');
                } else {
                  toggleValidation('cuid');
                }
              }}
            />
            <Label htmlFor="cuid" className="text-sm cursor-pointer">CUID</Label>
          </div>
        </div>
      </div>

      {/* Pattern Matching */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Pattern Matching</h4>

        <div className="space-y-1.5">
          <Label htmlFor="regex" className="text-xs">Regex Pattern</Label>
          <Input
            id="regex"
            placeholder="e.g., ^[a-z]+$"
            value={validations.regex ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('regex');
              } else {
                updateValidation('regex', val);
              }
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="startsWith" className="text-xs">Starts With</Label>
          <Input
            id="startsWith"
            placeholder="Prefix"
            value={validations.startsWith ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('startsWith');
              } else {
                updateValidation('startsWith', val);
              }
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="endsWith" className="text-xs">Ends With</Label>
          <Input
            id="endsWith"
            placeholder="Suffix"
            value={validations.endsWith ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('endsWith');
              } else {
                updateValidation('endsWith', val);
              }
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="includes" className="text-xs">Contains</Label>
          <Input
            id="includes"
            placeholder="Substring"
            value={validations.includes ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('includes');
              } else {
                updateValidation('includes', val);
              }
            }}
          />
        </div>
      </div>

      {/* Transformations */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Transformations</h4>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trim"
              checked={validations.trim ?? false}
              onCheckedChange={() => {
                if (validations.trim) {
                  clearValidation('trim');
                } else {
                  toggleValidation('trim');
                }
              }}
            />
            <Label htmlFor="trim" className="text-sm cursor-pointer">Trim</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="toLowerCase"
              checked={validations.toLowerCase ?? false}
              onCheckedChange={() => {
                if (validations.toLowerCase) {
                  clearValidation('toLowerCase');
                } else {
                  toggleValidation('toLowerCase');
                }
              }}
            />
            <Label htmlFor="toLowerCase" className="text-sm cursor-pointer">Lowercase</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="toUpperCase"
              checked={validations.toUpperCase ?? false}
              onCheckedChange={() => {
                if (validations.toUpperCase) {
                  clearValidation('toUpperCase');
                } else {
                  toggleValidation('toUpperCase');
                }
              }}
            />
            <Label htmlFor="toUpperCase" className="text-sm cursor-pointer">Uppercase</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
