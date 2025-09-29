import React from 'react'
import { create } from 'zustand'

export const  useThemeStore = create((set) =>({
    theme : localStorage.getItem("speakEasy-theme")||"coffee",
    setTheme  : (theme) => {
        localStorage.setItem("speakEasy-theme",theme),
        set({theme})
    }
}));
