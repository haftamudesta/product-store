import {create} from "zustand";
export const useThemeStore=create((set)=>({
        theme:"Light",
        setTheme:(theme)=>set(theme),
}))