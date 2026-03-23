import { create } from "zustand";

type ThemeState = {
  dark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => {

  const isDark = localStorage.getItem("theme") === "dark";


  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    dark: isDark,

    toggleTheme: () =>
      set((state) => {
        const newTheme = !state.dark;

        if (newTheme) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }

        return { dark: newTheme };
      }),
  };
});