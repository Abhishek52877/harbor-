import { NGOCause, WasteCategory } from '../types';

export const CAUSE_MATERIAL_MAPPING: Record<NGOCause, WasteCategory[]> = {
  environment: ['plastic', 'e-waste', 'metal', 'glass', 'batteries', 'organic'],
  education: ['books', 'paper', 'e-waste'],
  health: ['medical', 'textiles', 'plastic'],
  community: ['textiles', 'books', 'paper', 'plastic', 'metal'],
};

export function getMaterialsForCause(cause: NGOCause): WasteCategory[] {
  return CAUSE_MATERIAL_MAPPING[cause] || [];
}

export function doesListingMatchNGO(
  listingMaterials: WasteCategory[],
  ngoCause: NGOCause,
  ngoAcceptedMaterials?: WasteCategory[]
): boolean {
  const causeMaterials = ngoAcceptedMaterials || getMaterialsForCause(ngoCause);
  return listingMaterials.some((material) => causeMaterials.includes(material));
}

export const NGO_CAUSE_DESCRIPTIONS: Record<NGOCause, string> = {
  environment: 'Focused on environmental protection and sustainability',
  education: 'Supporting education through resource reuse and recycling',
  health: 'Promoting health and sanitation through proper waste management',
  community: 'Building stronger communities through collaborative recycling',
};
