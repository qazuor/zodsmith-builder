import {
  Calendar,
  Hash,
  List,
  ListOrdered,
  Plus,
  ToggleLeft,
  Type,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useZodSmithStore } from '@/store/zodsmith.store';
import { getDefaultValidations, type FieldType } from '@/types/schema.types';

interface FieldTypeOption {
  type: FieldType;
  labelKey: string;
  icon: React.ReactNode;
  descriptionKey: string;
}

const fieldTypeOptions: FieldTypeOption[] = [
  {
    type: 'string',
    labelKey: 'fieldTypes.string',
    icon: <Type className="size-4" />,
    descriptionKey: 'fieldTypeDesc.string',
  },
  {
    type: 'number',
    labelKey: 'fieldTypes.number',
    icon: <Hash className="size-4" />,
    descriptionKey: 'fieldTypeDesc.number',
  },
  {
    type: 'boolean',
    labelKey: 'fieldTypes.boolean',
    icon: <ToggleLeft className="size-4" />,
    descriptionKey: 'fieldTypeDesc.boolean',
  },
  {
    type: 'date',
    labelKey: 'fieldTypes.date',
    icon: <Calendar className="size-4" />,
    descriptionKey: 'fieldTypeDesc.date',
  },
  {
    type: 'enum',
    labelKey: 'fieldTypes.enum',
    icon: <ListOrdered className="size-4" />,
    descriptionKey: 'fieldTypeDesc.enum',
  },
  {
    type: 'array',
    labelKey: 'fieldTypes.array',
    icon: <List className="size-4" />,
    descriptionKey: 'fieldTypeDesc.array',
  },
];

export function AddFieldButton() {
  const { t } = useTranslation();
  const { currentSchema, addField } = useZodSmithStore();
  const [open, setOpen] = useState(false);

  if (!currentSchema) {
    return null;
  }

  const handleAddField = (type: FieldType) => {
    const existingNames = currentSchema.fields.map((f) => f.name);
    const baseName = type === 'boolean' ? 'is' : type;
    let name = baseName;
    let counter = 1;

    // Generate unique name
    while (existingNames.includes(name)) {
      name = `${baseName}${counter}`;
      counter++;
    }

    addField({
      name,
      type,
      required: true,
      nullable: false,
      validations: getDefaultValidations(type),
    });

    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="size-4" />
          {t('builder.addField')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>{t('field.selectType')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fieldTypeOptions.map((option) => (
          <DropdownMenuItem
            key={option.type}
            onClick={() => handleAddField(option.type)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-muted-foreground">{option.icon}</span>
            <div className="flex flex-col">
              <span className="font-medium">{t(option.labelKey)}</span>
              <span className="text-xs text-muted-foreground">{t(option.descriptionKey)}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
