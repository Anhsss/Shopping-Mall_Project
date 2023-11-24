//import { lazy } from "react";
import GlobalLayout from "../src/pages/_layout";
import Index from '../src/pages/index';
import PoroductsIndex from '../src/pages/products/index';
import ProductsId from '../src/pages/products/[id]';

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index />, index: true },
      { path: "/products", element: <PoroductsIndex />, index: true },
      { path: "/products/:id", element: <ProductsId />, index: true },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/payment" },
  { route: "/products" },
  { route: "/products/:id" },
];