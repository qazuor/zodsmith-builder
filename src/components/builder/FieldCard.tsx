import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Calendar,
  GripVertical,
  Hash,
  List,
  ListOrdered,
  ToggleLeft,
  Trash2,
  Type,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useZodSmithStore } from '@/store/zodsmith.store';
import type {
  ArrayValidations,
  EnumValidations,
  FieldDefinition,
  FieldType,
  NumberValidations,
  StringValidations,
} from '@/types/schema.types';

interface FieldCardProps {
  field: FieldDefinition;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const fieldTypeIcons: Record<FieldType, React.ReactNode> = {
  string: <Type className="size-4" />,
  number: <Hash className="size-4" />,
  boolean: <ToggleLeft className="size-4" />,
  date: <Calendar className="size-4" />,
  enum: <ListOrdered className="size-4" />,
  array: <List className="size-4" />,
};

const fieldTypeColors: Record<FieldType, string> = {
  string: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  number: 'bg-green-500/10 text-green-500 border-green-500/20',
  boolean: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  date: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  enum: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  array: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

export function FieldCard({ field, isDragging, dragHandleProps }: FieldCardProps) {
  const { selectedFieldId, selectField, removeField } = useZodSmithStore();
  const isSelected = selectedFieldId === field.id;

  const handleSelect = () => {
    selectField(isSelected ? null : field.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeField(field.id);
  };

  // Get validation summary
  const validationBadges = getValidationBadges(field);

  return (
    // biome-ignore lint/a11y/useSemanticElements: div is needed for drag-and-drop functionality
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect();
        }
      }}
      className={cn(
        'group flex items-start gap-3 rounded-lg border p-3 transition-all cursor-pointer',
        'hover:bg-accent/50',
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border bg-card/50',
        isDragging && 'opacity-50 shadow-lg ring-2 ring-primary/30'
      )}
    >
      {/* Drag Handle */}
      <div
        {...dragHandleProps}
        className="text-muted-foreground/50 cursor-grab active:cursor-grabbing touch-none mt-1"
      >
        <GripVertical className="size-4" />
      </div>

      {/* Type Icon */}
      <div
        className={cn(
          'flex size-9 items-center justify-center rounded-md border flex-shrink-0',
          fieldTypeColors[field.type]
        )}
      >
        {fieldTypeIcons[field.type]}
      </div>

      {/* Field Info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Name and Flags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium font-mono text-sm">{field.name}</span>
          {!field.required && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
              optional
            </Badge>
          )}
          {field.nullable && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
              nullable
            </Badge>
          )}
        </div>

        {/* Type Info */}
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="font-medium">{field.type}</span>
          {field.type === 'array' && 'itemType' in field.validations && (
            <span className="text-muted-foreground/70">
              {'<'}{(field.validations as ArrayValidations).itemType}{'>'}
            </span>
          )}
          {field.type === 'enum' && 'values' in field.validations && (
            <span className="text-muted-foreground/70 truncate">
              [{(field.validations as EnumValidations).values.slice(0, 3).join(', ')}
              {(field.validations as EnumValidations).values.length > 3 && '...'}]
            </span>
          )}
        </div>

        {/* Description */}
        {field.description && (
          <p className="text-xs text-muted-foreground/70 truncate italic">
            {field.description}
          </p>
        )}

        {/* Validation Badges */}
        {validationBadges.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {validationBadges.slice(0, 5).map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-5 font-mono font-normal"
              >
                {badge}
              </Badge>
            ))}
            {validationBadges.length > 5 && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-5 font-normal"
              >
                +{validationBadges.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Default Value */}
        {field.defaultValue && (
          <div className="text-xs text-muted-foreground/70 pt-0.5">
            default: <span className="font-mono">{field.defaultValue}</span>
          </div>
        )}
      </div>

      {/* Delete Action */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleRemove}
          className="size-7 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Get validation badges to display
 */
function getValidationBadges(field: FieldDefinition): string[] {
  const badges: string[] = [];
  const v = field.validations;

  switch (field.type) {
    case 'string': {
      const sv = v as StringValidations;
      if (sv.min !== undefined) badges.push(`min:${sv.min}`);
      if (sv.max !== undefined) badges.push(`max:${sv.max}`);
      if (sv.length !== undefined) badges.push(`len:${sv.length}`);
      if (sv.email) badges.push('email');
      if (sv.url) badges.push('url');
      if (sv.uuid) badges.push('uuid');
      if (sv.cuid) badges.push('cuid');
      if (sv.regex) badges.push('regex');
      if (sv.startsWith) badges.push(`starts:"${sv.startsWith}"`);
      if (sv.endsWith) badges.push(`ends:"${sv.endsWith}"`);
      if (sv.includes) badges.push(`has:"${sv.includes}"`);
      if (sv.trim) badges.push('trim');
      if (sv.toLowerCase) badges.push('lower');
      if (sv.toUpperCase) badges.push('upper');
      break;
    }
    case 'number': {
      const nv = v as NumberValidations;
      if (nv.min !== undefined) badges.push(`min:${nv.min}`);
      if (nv.max !== undefined) badges.push(`max:${nv.max}`);
      if (nv.int) badges.push('int');
      if (nv.positive) badges.push('>0');
      if (nv.negative) badges.push('<0');
      if (nv.nonnegative) badges.push('>=0');
      if (nv.nonpositive) badges.push('<=0');
      if (nv.multipleOf !== undefined) badges.push(`×${nv.multipleOf}`);
      if (nv.finite) badges.push('finite');
      break;
    }
    case 'array': {
      const av = v as ArrayValidations;
      if (av.min !== undefined) badges.push(`min:${av.min}`);
      if (av.max !== undefined) badges.push(`max:${av.max}`);
      if (av.length !== undefined) badges.push(`len:${av.length}`);
      if (av.nonempty) badges.push('nonempty');
      break;
    }
    case 'date': {
      const dv = v as { min?: string; max?: string };
      if (dv.min) badges.push('min-date');
      if (dv.max) badges.push('max-date');
      break;
    }
  }

  return badges;
}

/**
 * Sortable wrapper for FieldCard
 */
export function SortableFieldCard({ field }: { field: FieldDefinition }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FieldCard
        field={field}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
}
