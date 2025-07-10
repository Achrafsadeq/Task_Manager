"use client"

import { create } from "zustand"

interface NavigationState {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const useNavigation = create<NavigationState>((set) => ({
  activeSection: "dashboard",
  setActiveSection: (section) => set({ activeSection: section }),
}))
