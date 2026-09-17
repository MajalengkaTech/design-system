/**
 * @majalengka/tokens - UnoCSS Preset
 * Allows UnoCSS users to use Majalengka Design System tokens seamlessly:
 * e.g., bg-mjl-primary-700, text-mjl-primary-500, rounded-mjl-md, shadow-mjl-lg
 */

import colorData from "./src/global/color.json";
import spacingData from "./src/global/spacing.json";
import typographyData from "./src/global/typography.json";
import elevationData from "./src/global/elevation.json";

export function presetMajalengka() {
  const primaryColors: Record<string, string> = {};
  for (const [step, obj] of Object.entries(colorData.color.primary)) {
    primaryColors[step] = obj.$value;
  }

  const neutralColors: Record<string, string> = {};
  for (const [step, obj] of Object.entries(colorData.color.neutral)) {
    neutralColors[step] = obj.$value;
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
      borderRadius: {
        "mjl-none": spacingData.spacing.radius.none.$value,
        "mjl-sm": spacingData.spacing.radius.sm.$value,
        "mjl-md": spacingData.spacing.radius.md.$value,
        "mjl-lg": spacingData.spacing.radius.lg.$value,
        "mjl-full": spacingData.spacing.radius.full.$value,
      },
      boxShadow: {
        "mjl-sm": elevationData.elevation.shadow.sm.$value,
        "mjl-md": elevationData.elevation.shadow.md.$value,
        "mjl-lg": elevationData.elevation.shadow.lg.$value,
        "mjl-xl": elevationData.elevation.shadow.xl.$value,
      },
    },
    shortcuts: {
      // Button Shortcuts
      "mjl-btn-base": "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "mjl-btn-sm": "h-8 px-3 text-xs rounded-mjl-sm gap-1.5",
      "mjl-btn-md": "h-10 px-4 text-sm rounded-mjl-md gap-2",
      "mjl-btn-lg": "h-12 px-6 text-base rounded-mjl-md gap-2.5",
      "mjl-btn-primary": "bg-mjl-primary-700 text-white hover:bg-mjl-primary-800 active:bg-mjl-primary-900 focus-visible:ring-mjl-primary-500",
      "mjl-btn-secondary": "bg-mjl-neutral-200 text-mjl-neutral-900 hover:bg-mjl-neutral-300 active:bg-mjl-neutral-400 focus-visible:ring-mjl-neutral-400",
      "mjl-btn-outline": "border border-mjl-primary-700 text-mjl-primary-700 hover:bg-mjl-primary-50 active:bg-mjl-primary-100 focus-visible:ring-mjl-primary-500",
      // Card Shortcut
      "mjl-card-base": "bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-200 dark:border-mjl-neutral-800 rounded-mjl-lg p-6 shadow-mjl-sm",
    },
  };
}

export default presetMajalengka;
