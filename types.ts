
export type TShirtColor = {
  id: string;
  name: string;
  hex: string;
  imageFront: string;
  imageBack: string;
};

export type FontOption = {
  id: string;
  name: string;
  cssValue: string;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
};

export enum Placement {
  FRONT = 'front',
  BACK = 'back',
}

export interface CustomizedProduct {
  id: string;
  color: TShirtColor;
  customText: string;
  font: FontOption;
  uploadedImage: string | null;
  placement: Placement;
  price: number;
  dateAdded: number;
}
