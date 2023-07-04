// createTheme.tsx
import { createCreateTheme } from "@arwes/theme";
import {
  ThemeSettings,
  Theme,
  themeStructure,
  themeDefaults,
} from "../ThemeSettings";

export const createTheme = createCreateTheme<ThemeSettings, Theme>(
  themeStructure,
  themeDefaults
);
