import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { EnumValidations as EnumValidationsType } from '@/types/schema.types';

interface EnumValidationsProps {
  validations: EnumValidationsType;
  onChange: (validations: EnumValidationsType) => void;
}

export function EnumValidations({ validations, onChange }: EnumValidationsProps) {
  const [newValue, setNewValue] = useState('');

  const addValue = () => {
    const trimmed = newValue.trim();
    if (trimmed && !validations.values.includes(trimmed)) {
      onChange({
        ...validations,
        values: [...validations.values, trimmed],
      });
      setNewValue('');
    }
  };

  const removeValue = (value: string) => {
    onChange({
      ...validations,
      values: validations.values.filter((v) => v !== value),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <div className="space-y-4">
      {/* Enum Values */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Allowed Values</h4>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newEnumValue" className="sr-only">New value</Label>
              <Input
                id="newEnumValue"
                placeholder="Enter a value..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addValue}
              disabled={!newValue.trim()}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {/* Values List */}
          {validations.values.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {validations.values.map((value) => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  <span className="font-mono text-xs">{value}</span>
                  <button
                    type="button"
                    onClick={() => removeValue(value)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="size-3" />
                    <span className="sr-only">Remove {value}</span>
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              No values defined. Add at least one value for the enum.
            </p>
          )}
        </div>
      </div>

      {/* Preview */}
      {validations.values.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Preview</h4>
          <div className="rounded-md bg-muted/50 p-3 font-mono text-xs">
            <span className="text-blue-500">z.enum</span>
            <span className="text-foreground">([</span>
            {validations.values.map((value, i) => (
              <span key={value}>
                <span className="text-green-600">'{value}'</span>
                {i < validations.values.length - 1 && <span className="text-foreground">, </span>}
              </span>
            ))}
            <span className="text-foreground">])</span>
          </div>
        </div>
      )}

      {/* Warning */}
      {validations.values.length === 0 && (
        <div className="rounded-md bg-yellow-500/10 border border-yellow-500/20 p-3 text-xs text-yellow-600 dark:text-yellow-500">
          <p>
            An enum must have at least one value. The schema will be invalid without values.
          </p>
        </div>
      )}
    </div>
  );
}
