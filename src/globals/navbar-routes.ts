import { theme } from "./theme";

const BaseRoutes = [
    { icon: theme.icons.File, label: "Dashboard", path: "/market" },
    { icon: theme.icons.Coins, label: "Mercados", path: "/", disabled: true },
    { icon: theme.icons.Bank, label: "Meus Investimentos", path: "/", disabled: true },
]

const UserRoutes = BaseRoutes

export const routes = {
    ROLE_USER: UserRoutes
}