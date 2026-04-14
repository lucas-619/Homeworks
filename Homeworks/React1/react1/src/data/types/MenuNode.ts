import type { ReactNode } from "react";

export type MenuNode = {
    title: string;
    link: string;
    component: ReactNode;
    children?: MenuNode[];
};