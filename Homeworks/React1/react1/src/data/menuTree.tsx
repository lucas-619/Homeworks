import type { MenuNode } from "./types/MenuNode.ts";

// Componentes simples (luego los mejoras)
const Home = () => <h2>Home</h2>;
const Products = () => <h2>Products</h2>;
const Shoes = () => <h2>Shoes</h2>;
const Clothes = () => <h2>Clothes</h2>;
const Contact = () => <h2>Contact</h2>;

export const menuTree: MenuNode = {
    title: "Menu",
    link: "/",
    component: <Home />,
    children: [
        {
            title: "Home",
            link: "/home",
            component: <Home />,
        },
        {
            title: "Products",
            link: "/products",
            component: <Products />,
            children: [
            {
                title: "Shoes",
                link: "/products/shoes",
                component: <Shoes />,
            },
            {
                title: "Clothes",
                link: "/products/clothes",
                component: <Clothes />,
            },
          ],
        },
        {
            title: "Contact",
            link: "/contact",
            component: <Contact />,
        },
    ],
};