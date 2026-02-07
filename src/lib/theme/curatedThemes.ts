export const CURATED_THEME_KEYS = [
  "ink",
  "sand",
  "forest",
  "ocean",
  "ember",
  "slate",
  "dawn",
  "mist",
  "mint",
  "rose",
] as const;

export type CuratedThemeKey = (typeof CURATED_THEME_KEYS)[number];

export const DEFAULT_THEME_KEY: CuratedThemeKey = "ink";
