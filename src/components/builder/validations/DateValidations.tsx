import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DateValidations as DateValidationsType } from '@/types/schema.types';

interface DateValidationsProps {
  validations: DateValidationsType;
  onChange: (validations: DateValidationsType) => void;
}

export function DateValidations({ validations, onChange }: DateValidationsProps) {
  const updateValidation = <K extends keyof DateValidationsType>(
    key: K,
    value: DateValidationsType[K]
  ) => {
    onChange({ ...validations, [key]: value });
  };

  const clearValidation = (key: keyof DateValidationsType) => {
    const updated = { ...validations };
    delete updated[key];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Date Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Date Range</h4>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="minDate" className="text-xs">Minimum Date</Label>
            <Input
              id="minDate"
              type="datetime-local"
              value={validations.min ? validations.min.slice(0, 16) : ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('min');
                } else {
                  updateValidation('min', new Date(val).toISOString());
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Date must be after this value
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="maxDate" className="text-xs">Maximum Date</Label>
            <Input
              id="maxDate"
              type="datetime-local"
              value={validations.max ? validations.max.slice(0, 16) : ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  clearValidation('max');
                } else {
                  updateValidation('max', new Date(val).toISOString());
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Date must be before this value
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
        <p>
          Dates will be validated as JavaScript Date objects. The generated Zod schema
          will use <code className="bg-muted px-1 rounded">z.date()</code> with min/max constraints.
        </p>
      </div>
    </div>
  );
}
