import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FileQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useZodSmithStore } from '@/store/zodsmith.store';

import { SortableFieldCard } from './FieldCard';

export function FieldList() {
  const { t } = useTranslation();
  const { currentSchema, reorderFields } = useZodSmithStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!currentSchema) {
    return null;
  }

  const { fields } = currentSchema;

  if (fields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileQuestion className="size-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground text-sm">{t('builder.noFields')}</p>
        <p className="text-muted-foreground/70 text-xs mt-1">
          {t('builder.noFieldsHint')}
        </p>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      reorderFields(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {fields.map((field) => (
            <SortableFieldCard key={field.id} field={field} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
