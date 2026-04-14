import { Route } from "react-router-dom";
import type { MenuNode } from "../data/types/MenuNode";
import type { JSX } from "react";

export function renderRoutes(node: MenuNode): JSX.Element[] {
  let routes: JSX.Element[] = [];

  // Crear ruta del nodo actual
  if (node.link !== "/") {
    routes.push(
      <Route key={node.link} path={node.link} element={node.component} />
    );
  }

  // Recorrer hijos (recursividad)
  if (node.children) {
    node.children.forEach((child) => {
      routes = [...routes, ...renderRoutes(child)];
    });
  }

  return routes;
}