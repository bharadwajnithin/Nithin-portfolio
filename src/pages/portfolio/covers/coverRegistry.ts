import type { ComponentType } from "react";
import { lazy } from "react";


export interface SceneCoverProps {
   tint: string;
   variant?: string;
}

type SceneComponent = ComponentType<SceneCoverProps>;

// Animated SVG scenes (undeployed projects) -- lazy so the Projects chunk
// stays lean; they only load when the section renders.
const MlScene = lazy(() => import("./MlScene"));
const AutomationScene = lazy(() => import("./AutomationScene"));
const WebAppScene = lazy(() => import("./WebAppScene"));

export type ProjectCover =
   | { kind: "image"; src: string }
   | { kind: "scene"; Scene: SceneComponent; variant?: string };

/**
 * Cover per project id (ids from data/projects.json).
 * Deployed -> live screenshot. Not deployed -> themed animated scene.
 */
const COVER_BY_ID: Record<number, ProjectCover> = {
   1: { kind: "scene", Scene: WebAppScene },
   2: { kind: "scene", Scene: AutomationScene },
   3: { kind: "scene", Scene: MlScene },
};

export const getProjectCover = (
   id: number,
   _title: string,
): ProjectCover | undefined => COVER_BY_ID[id];
