import { Element4, ElementPlus, Trade, Truck, User, Settings, Menu, Shop, SecurityUser, Book, TicketExpired, TicketDiscount, Profile2User, ClipboardTick, Bank, Setting2 } from "iconsax-react";
import { Bike, ChefHat, Megaphone, User2 } from "lucide-react";

export const SidebarAdminApi = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
    {
        title: 'Menu',
        icon: <Menu size="24" />,
        link: '/menu',
    },
    {
        title: 'Vendors',
        icon: <Shop size="24" />,
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
        title: 'Sub-Admin',
        icon: <SecurityUser size="24" />,
        link: '/subadmin',
    },
    {
        title: 'Orders',
        icon: <Book size="24" />,
        link: '/orders',
    },
    {
        title: 'Banners',
        icon: <TicketDiscount size="24" />,
        link: '/DashboardAssets',
    },
    {
        title: 'Promotions',
        icon: <Megaphone size="24" />,
        link: '/promotions',
    },
    {
        title: 'Reports',
        icon: <ClipboardTick size="24" />,
        link: '/reports',
    },
    {
        title: 'Account Statement',
        icon: <Bank size="24" />,
        link: '/accountStatement',
    },
    {
        title: 'Settings',
        icon: <Setting2 size="24" />,
        link: '/settings',
    },
]

export const Franchise_Management = [
    {
        title: 'Dashboard',
        icon: <Element4 size={24} />,
        link: '/flexiDashboard',
    },
    {
        title: 'My Orders',
        icon: <Truck size="24" />,
        link: '/flexiStoreOrders',
    },
    {
        title: 'Products',
        icon: <Trade size="24" />,
        link: '/flexiProduct',
    },
]


export const BackOffice = [
    {
        title: 'Dashboard',
        icon: <Element4 size={24} />,
        link: '/flexiDashboard',
    },
    {
        title: 'My Orders',
        icon: <Truck size="24" />,
        link: '/flexiStoreOrders',
    },
    {
        title: 'Products',
        icon: <Trade size="24" />,
        link: '/flexiProduct',
    },
]

