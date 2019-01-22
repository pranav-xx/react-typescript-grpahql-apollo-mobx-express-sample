import { LoginPage } from "./features/login/login.page";
import { TradePage } from "./features/trade/trade-page";

export const routes = [
    {
        path: "/login",
        exact: true,
        component: LoginPage
    },
    {
        path: "/trade",
        exact: true,
        component: TradePage
    }
];
