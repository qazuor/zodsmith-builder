import {
  Calendar,
  Hash,
  List,
  ListOrdered,
  ToggleLeft,
  Type,
} from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ArrayValidations as ArrayValidationsType, FieldType } from '@/types/schema.types';

interface ArrayValidationsProps {
  validations: ArrayValidationsType;
  onChange: (validations: ArrayValidationsType) => void;
}

const itemTypeOptions: { value: FieldType; label: string; icon: React.ReactNode }[] = [
  { value: 'string', label: 'String', icon: <Type className="size-4" /> },
  { value: 'number', label: 'Number', icon: <Hash className="size-4" /> },
  { value: 'boolean', label: 'Boolean', icon: <ToggleLeft className="size-4" /> },
  { value: 'date', label: 'Date', icon: <Calendar className="size-4" /> },
  { value: 'enum', label: 'Enum', icon: <ListOrdered className="size-4" /> },
  { value: 'array', label: 'Array', icon: <List className="size-4" /> },
];

export function ArrayValidations({ validations, onChange }: ArrayValidationsProps) {
  const updateValidation = <K extends keyof ArrayValidationsType>(
    key: K,
    value: ArrayValidationsType[K]
  ) => {
    onChange({ ...validations, [key]: value });
  };

  const clearValidation = (key: keyof ArrayValidationsType) => {
    const updated = { ...validations };
    if (key !== 'itemType') {
      delete updated[key];
    }
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Item Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Item Type</h4>

        <div className="space-y-1.5">
          <Label htmlFor="itemType" className="text-xs">Array Element Type</Label>
          <Select
            value={validations.itemType}
            onValueChange={(value) => updateValidation('itemType', value as FieldType)}
          >
            <SelectTrigger id="itemType">
              <SelectValue placeholder="Select item type" />
            </SelectTrigger>
            <SelectContent>
              {itemTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Type of elements in the array
          </p>
        </div>
      </div>

      {/* Length Constraints */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Length Constraints</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="minLength" className="text-xs">Min Items</Label>
            <Input
              id="minLength"
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
            <Label htmlFor="maxLength" className="text-xs">Max Items</Label>
            <Input
              id="maxLength"
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
          <Label htmlFor="exactLength" className="text-xs">Exact Length</Label>
          <Input
            id="exactLength"
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

      {/* Non-empty */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Options</h4>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="nonempty"
            checked={validations.nonempty ?? false}
            onCheckedChange={(checked) => {
              if (checked) {
                updateValidation('nonempty', true);
              } else {
                clearValidation('nonempty');
              }
            }}
          />
          <Label htmlFor="nonempty" className="text-sm cursor-pointer">
            Non-empty (at least 1 item)
          </Label>
        </div>
      </div>
    </div>
  );
}
