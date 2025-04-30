import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("", "layouts/authlayout.tsx", [
        route('login', 'pages/login.tsx'),
        route('register', 'pages/register.tsx'),
        index("pages/home.tsx"),
        route('products', 'pages/products.tsx'),
        route('cart', 'pages/cart.tsx'),
    ]),
] satisfies RouteConfig;
