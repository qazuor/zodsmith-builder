import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { NumberValidations as NumberValidationsType } from '@/types/schema.types';

interface NumberValidationsProps {
  validations: NumberValidationsType;
  onChange: (validations: NumberValidationsType) => void;
}

export function NumberValidations({ validations, onChange }: NumberValidationsProps) {
  const updateValidation = <K extends keyof NumberValidationsType>(
    key: K,
    value: NumberValidationsType[K]
  ) => {
    onChange({ ...validations, [key]: value });
  };

  const toggleValidation = (key: keyof NumberValidationsType) => {
    const current = validations[key];
    if (typeof current === 'boolean') {
      onChange({ ...validations, [key]: !current });
    } else {
      onChange({ ...validations, [key]: true });
    }
  };

  const clearValidation = (key: keyof NumberValidationsType) => {
    const updated = { ...validations };
    delete updated[key];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Range Constraints */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Range</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="min" className="text-xs">Minimum</Label>
            <Input
              id="min"
              type="number"
              placeholder="No min"
              value={validations.min ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('min');
                } else {
                  updateValidation('min', Number.parseFloat(val));
                }
              }}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="max" className="text-xs">Maximum</Label>
            <Input
              id="max"
              type="number"
              placeholder="No max"
              value={validations.max ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('max');
                } else {
                  updateValidation('max', Number.parseFloat(val));
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="multipleOf" className="text-xs">Multiple Of</Label>
          <Input
            id="multipleOf"
            type="number"
            step="any"
            placeholder="Any"
            value={validations.multipleOf ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                clearValidation('multipleOf');
              } else {
                updateValidation('multipleOf', Number.parseFloat(val));
              }
            }}
          />
        </div>
      </div>

      {/* Type Constraints */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Type</h4>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="int"
              checked={validations.int ?? false}
              onCheckedChange={() => {
                if (validations.int) {
                  clearValidation('int');
                } else {
                  toggleValidation('int');
                }
              }}
            />
            <Label htmlFor="int" className="text-sm cursor-pointer">Integer</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="finite"
              checked={validations.finite ?? false}
              onCheckedChange={() => {
                if (validations.finite) {
                  clearValidation('finite');
                } else {
                  toggleValidation('finite');
                }
              }}
            />
            <Label htmlFor="finite" className="text-sm cursor-pointer">Finite</Label>
          </div>
        </div>
      </div>

      {/* Sign Constraints */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Sign</h4>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="positive"
              checked={validations.positive ?? false}
              onCheckedChange={() => {
                if (validations.positive) {
                  clearValidation('positive');
                } else {
                  // Clear conflicting validations
                  const updated = { ...validations };
                  delete updated.negative;
                  delete updated.nonpositive;
                  onChange({ ...updated, positive: true });
                }
              }}
            />
            <Label htmlFor="positive" className="text-sm cursor-pointer">Positive (&gt;0)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="nonnegative"
              checked={validations.nonnegative ?? false}
              onCheckedChange={() => {
                if (validations.nonnegative) {
                  clearValidation('nonnegative');
                } else {
                  // Clear conflicting validations
                  const updated = { ...validations };
                  delete updated.negative;
                  delete updated.nonpositive;
                  onChange({ ...updated, nonnegative: true });
                }
              }}
            />
            <Label htmlFor="nonnegative" className="text-sm cursor-pointer">Non-negative (&ge;0)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="negative"
              checked={validations.negative ?? false}
              onCheckedChange={() => {
                if (validations.negative) {
                  clearValidation('negative');
                } else {
                  // Clear conflicting validations
                  const updated = { ...validations };
                  delete updated.positive;
                  delete updated.nonnegative;
                  onChange({ ...updated, negative: true });
                }
              }}
            />
            <Label htmlFor="negative" className="text-sm cursor-pointer">Negative (&lt;0)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="nonpositive"
              checked={validations.nonpositive ?? false}
              onCheckedChange={() => {
                if (validations.nonpositive) {
                  clearValidation('nonpositive');
                } else {
                  // Clear conflicting validations
                  const updated = { ...validations };
                  delete updated.positive;
                  delete updated.nonnegative;
                  onChange({ ...updated, nonpositive: true });
                }
              }}
            />
            <Label htmlFor="nonpositive" className="text-sm cursor-pointer">Non-positive (&le;0)</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
