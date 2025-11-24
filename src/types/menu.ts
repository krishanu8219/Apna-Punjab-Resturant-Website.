export type MenuCategoryId =
  | 'antipasti'
  | 'pizze'
  | 'pollo'
  | 'agnello'
  | 'pollo_tandoori'
  | 'pollo_curry'
  | 'agnello_curry'
  | 'gamberi'
  | 'riso'
  | 'pane'
  | 'varie'
  | 'contorni'
  | 'dolci'
  | 'bevande'
  | 'birre';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: MenuCategoryId;
  isTopSeller?: boolean;
  tags?: string[];
  image?: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  name: string;
  items: MenuItem[];
}