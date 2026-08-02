import type { ReactNode } from "react";

/**
 * Returns null when an official institution mark is not supplied. Cards retain
 * their existing generic icon fallback.
 */
export const getOrgLogo = (_name: string, _size = 18): ReactNode => null;
