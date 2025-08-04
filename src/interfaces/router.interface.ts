import type { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  element: ReactElement;
  children?: RouteConfig[];
  index?: boolean;
}
