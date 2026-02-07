import { CURATED_THEME_KEYS } from "@/lib/theme/curatedThemes";

const FONT_THEME_KEYS = ["font-a", "font-b", "font-c", "font-d"] as const;

const themeSeedScript = `(function(){
  try {
    var themeKeys = ${JSON.stringify(CURATED_THEME_KEYS)};
    var fontKeys = ${JSON.stringify(FONT_THEME_KEYS)};
    var root = document.documentElement;

    if (themeKeys && themeKeys.length) {
      var themeIndex = Math.floor(Math.random() * themeKeys.length);
      root.setAttribute("data-color-theme", themeKeys[themeIndex]);
    }

    if (fontKeys && fontKeys.length) {
      var fontIndex = Math.floor(Math.random() * fontKeys.length);
      root.setAttribute("data-font-theme", fontKeys[fontIndex]);
    }

    var isDark = Math.random() < 0.5;
    if (isDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  } catch (_) {}
})();`;

export default function ThemeSeedScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeSeedScript }} />;
}
