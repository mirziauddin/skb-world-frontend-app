// src/store/useHomeStore.ts
import create from "zustand";

interface HomeState {
  animate: boolean;
  setAnimate: (animate: boolean) => void;
}

const useHomeStore = create<HomeState>((set) => ({
  animate: false,
  setAnimate: (animate: boolean) => set({ animate }),
}));

export default useHomeStore;
