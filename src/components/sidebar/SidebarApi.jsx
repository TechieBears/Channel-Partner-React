import { Notebook } from "@phosphor-icons/react";
import { Element4, ElementPlus, Trade, Truck, User, Settings, Menu, Shop, SecurityUser, Book, TicketExpired, TicketDiscount, Profile2User, ClipboardTick, Bank, Setting2, Wallet, ShoppingCart, Headphone, Ticket, UserAdd } from "iconsax-react";
import { AlertTriangle, Bike, ChefHat, LayoutList, Megaphone, Settings2, Soup, User2 } from "lucide-react";
export const Admin = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/admin',
    },
    {
        title: 'Menus',
        icon: <Trade size="24" />,
        link: '/menu',
        subMenu: [
            {
                title: 'Menu',
                icon: <Menu size="24" />,
                link: '/menu',
            },
            {
                title: 'Restaurant Menu',
                icon: <Menu size="24" />,
                link: '/restaurantmenu',
            },
        ]
    },
    {
        title: 'Franchisee',
        icon: <Shop size="24" />,
        link: '/franchisee',
    },
    {
        title: 'Vendors',
        icon: <Bank size="24" />,
        link: '/vendors',
    },
    {
        title: 'Resturants',
        icon: <ChefHat />,
        link: '/resturants',
    },
    {
        title: 'Drivers',
        icon: <Bike size="24" />,
        link: '/drivers',
    },
    {
        title: 'User',
        icon: <User size="24" />,
        link: '/user',
    },
    {
        title: 'Orders',
        icon: <Book size="24" />,
        link: '/orders',
    },
    {
        title: 'Coupons',
        icon: <Ticket size="24" />,
        link: '/coupon',
    },
    {
        title: `Banners/Promo's`,
        icon: < TicketDiscount size="24" />,
        link: '/DashboardAssets',
    },
    {
        title: 'Settings',
        icon: <Setting2 size="24" />,
        link: '/settings',
    },
]


export const Seller = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
    {
        title: 'Orders',
        icon: <Soup size="24" />,
        link: '/vendor-orders',
    },
    {
        title: 'Menu List',
        icon: <LayoutList size="24" />,
        link: '/product-list',
    },
    {
        title: 'Register',
        icon: <UserAdd size="24" />,
        link: '/register',
    },
]



export const Franchise = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
    {
        title: 'menu',
        icon: <Menu size="24" />,
        link: '/menu',
    }, {
        title: 'Resturants',
        icon: <ChefHat />,
        link: '/resturants',
    },

    {
        title: 'Vendors',
        icon: <Notebook size="24" />,
        link: '/vendors',
    },
    {
        title: 'Delivery Boys',
        icon: <Wallet size="24" />,
        link: '/delivery',
    },

]

export const Restaurant = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
]