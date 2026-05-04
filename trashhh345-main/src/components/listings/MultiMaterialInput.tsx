import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { WasteMaterial, WasteCategory } from '../../types';
import { Button } from '../ui/button';

interface MultiMaterialInputProps {
  materials: WasteMaterial[];
  onChange: (materials: WasteMaterial[]) => void;
}

const WASTE_CATEGORIES: WasteCategory[] = [
  'plastic',
  'e-waste',
  'metal',
  'paper',
  'glass',
  'organic',
  'books',
  'textiles',
  'batteries',
  'medical',
];

const UNITS = ['kg', 'pieces', 'liters', 'tons'];

export function MultiMaterialInput({ materials, onChange }: MultiMaterialInputProps) {
  const addMaterial = () => {
    onChange([
      ...materials,
      { type: 'plastic', quantity: 1, unit: 'kg' },
    ]);
  };

  const removeMaterial = (index: number) => {
    onChange(materials.filter((_, i) => i !== index));
  };

  const updateMaterial = (index: number, field: keyof WasteMaterial, value: any) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-semibold">Materials</label>
        <Button
          type="button"
          onClick={addMaterial}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Material
        </Button>
      </div>

      <div className="space-y-3">
        {materials.map((material, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 border border-border rounded-lg bg-card relative"
          >
            <div className="flex-1 grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Type</label>
                <select
                  value={material.type}
                  onChange={(e) => updateMaterial(index, 'type', e.target.value as WasteCategory)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  {WASTE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Quantity</label>
                <input
                  type="number"
                  value={material.quantity}
                  onChange={(e) => updateMaterial(index, 'quantity', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Unit</label>
                <select
                  value={material.unit}
                  onChange={(e) => updateMaterial(index, 'unit', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  {UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {materials.length > 1 && (
              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {materials.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-3">No materials added yet</p>
          <Button
            type="button"
            onClick={addMaterial}
            variant="outline"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First Material
          </Button>
        </div>
      )}
    </div>
  );
}
