import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const getServerSnapshot = (): boolean => false;

const subscribe = (callback: () => void): (() => void) => {
   if (globalThis.window == null) return () => {};
   const mql = globalThis.matchMedia(query);
   mql.addEventListener("change", callback);
   return () => mql.removeEventListener("change", callback);
};

const mql =
   globalThis.window != null ? globalThis.matchMedia(query) : null;

const getSnapshot = (): boolean => mql?.matches ?? false;

const useReducedMotion = (): boolean => {
   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useReducedMotion;
