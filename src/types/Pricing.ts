export interface Pricing {
  pack: 'business' | 'developer' | 'startup';
  postage: number;
  service: number;
  total: number;
}