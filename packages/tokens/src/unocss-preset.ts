/**
 * @majalengka/tokens - UnoCSS Preset
 * Allows UnoCSS users to use Majalengka Design System tokens seamlessly:
 * e.g., bg-mjl-primary-700, text-mjl-primary-500, p-mjl-4, text-mjl-2xl, rounded-mjl-md, shadow-mjl-lg
 */

import colorData from "./global/color.json";
import spacingData from "./global/spacing.json";
import typographyData from "./global/typography.json";
import elevationData from "./global/elevation.json";

export interface PresetMajalengkaOptions {}

export interface MajalengkaTheme {
  colors: Record<string, any>;
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, string]>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
}

export function presetMajalengka(_options: PresetMajalengkaOptions = {}) {
  const primaryColors: Record<string, string> = {};
  for (const [step, obj] of Object.entries(colorData.color.primary)) {
    primaryColors[step] = obj.$value;
  }

  const neutralColors: Record<string, string> = {};
  for (const [step, obj] of Object.entries(colorData.color.neutral)) {
    neutralColors[step] = obj.$value;
  }

  const spacingGrid: Record<string, string> = {};
  for (const [step, obj] of Object.entries(spacingData.spacing.grid)) {
    spacingGrid[`mjl-${step}`] = obj.$value;
  }
  spacingGrid["mjl-touch"] = spacingData.spacing.touchTarget.min.$value;
  spacingGrid["mjl-touch-lg"] = spacingData.spacing.touchTarget.large.$value;

  const fontSizeScale: Record<string, [string, string]> = {};
  for (const [step, obj] of Object.entries(typographyData.typography.scale)) {
    fontSizeScale[`mjl-${step}`] = [obj.fontSize.$value, String(obj.lineHeight.$value)];
  }

  const breakpoints: Record<string, string> = {};
  for (const [step, obj] of Object.entries(spacingData.spacing.breakpoint)) {
    breakpoints[`mjl-${step}`] = obj.$value;
  }

  return {
    name: "unocss-preset-majalengka",
    theme: {
      colors: {
        "mjl-primary": primaryColors,
        "mjl-neutral": neutralColors,
        "mjl-mango": colorData.color.status.mango.fg.$value,
        "mjl-status": {
          "success-bg": colorData.color.status.success.bg.$value,
          "success-border": colorData.color.status.success.border.$value,
          "success-fg": colorData.color.status.success.fg.$value,
          "warning-bg": colorData.color.status.warning.bg.$value,
          "warning-border": colorData.color.status.warning.border.$value,
          "warning-fg": colorData.color.status.warning.fg.$value,
          "danger-bg": colorData.color.status.danger.bg.$value,
          "danger-border": colorData.color.status.danger.border.$value,
          "danger-fg": colorData.color.status.danger.fg.$value,
          "info-bg": colorData.color.status.info.bg.$value,
          "info-border": colorData.color.status.info.border.$value,
          "info-fg": colorData.color.status.info.fg.$value,
        },
      },
      fontFamily: {
        "mjl-title": [typographyData.typography.fontFamily.title.$value, "sans-serif"],
        "mjl-body": [typographyData.typography.fontFamily.body.$value, "sans-serif"],
        "mjl-mono": [typographyData.typography.fontFamily.mono.$value, "monospace"],
      },
      fontSize: fontSizeScale,
      spacing: spacingGrid,
      breakpoints: breakpoints,
      borderRadius: {
        "mjl-none": spacingData.spacing.radius.none?.$value || "0px",
        "mjl-sm": spacingData.spacing.radius.sm.$value,
        "mjl-md": spacingData.spacing.radius.md.$value,
        "mjl-lg": spacingData.spacing.radius.lg.$value,
        "mjl-full": spacingData.spacing.radius.full.$value,
      },
      boxShadow: {
        "mjl-sm": elevationData.elevation.shadow.sm.$value,
        "mjl-md": elevationData.elevation.shadow.md.$value,
        "mjl-lg": elevationData.elevation.shadow.lg.$value,
        "mjl-xl": elevationData.elevation.shadow.xl?.$value || "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
    },
    shortcuts: {
      // Container
      "mjl-container": "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

      // Skip link
      "mjl-skip-link": "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-mjl-primary-700 focus:text-white focus:rounded-mjl-md focus:shadow-mjl-md",

      // Button Shortcuts
      "mjl-btn-base": "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "mjl-btn-sm": "h-8 px-3 text-xs rounded-mjl-sm gap-1.5",
      "mjl-btn-md": "h-10 px-4 text-sm rounded-mjl-md gap-2",
      "mjl-btn-lg": "h-12 px-6 text-base rounded-mjl-md gap-2.5",
      "mjl-btn-primary": "bg-mjl-primary-700 text-white hover:bg-mjl-primary-800 active:bg-mjl-primary-900 focus-visible:ring-mjl-primary-500",
      "mjl-btn-secondary": "bg-mjl-neutral-200 text-mjl-neutral-900 hover:bg-mjl-neutral-300 active:bg-mjl-neutral-400 focus-visible:ring-mjl-neutral-400",
      "mjl-btn-outline": "border border-mjl-primary-700 text-mjl-primary-700 hover:bg-mjl-primary-50 active:bg-mjl-primary-100 focus-visible:ring-mjl-primary-500",

      // Form Controls
      "mjl-input": "w-full h-10 px-3 py-2 text-sm bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-300 dark:border-mjl-neutral-700 rounded-mjl-md focus:outline-none focus:ring-2 focus:ring-mjl-primary-500 focus:border-mjl-primary-500 transition-colors",
      "mjl-label": "block text-sm font-medium text-mjl-neutral-700 dark:text-mjl-neutral-200 mb-1.5",

      // Badges
      "mjl-badge": "inline-flex items-center font-medium px-2.5 py-0.5 rounded-mjl-full text-xs gap-1",
      "mjl-badge-success": "bg-mjl-status-success-bg text-mjl-status-success-fg border border-mjl-status-success-border",
      "mjl-badge-warning": "bg-mjl-status-warning-bg text-mjl-status-warning-fg border border-mjl-status-warning-border",
      "mjl-badge-danger": "bg-mjl-status-danger-bg text-mjl-status-danger-fg border border-mjl-status-danger-border",
      "mjl-badge-info": "bg-mjl-status-info-bg text-mjl-status-info-fg border border-mjl-status-info-border",

      // Cards
      "mjl-card-base": "bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-200 dark:border-mjl-neutral-800 rounded-mjl-lg p-6 shadow-mjl-sm",
    },
  };
}

export default presetMajalengka;
