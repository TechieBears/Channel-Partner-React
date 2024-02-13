import { Notebook } from "@phosphor-icons/react";
import { Element4, ElementPlus, Trade, Truck, User, Settings, Menu, Shop, SecurityUser, Book, TicketExpired, TicketDiscount, Profile2User, ClipboardTick, Bank, Setting2, Wallet } from "iconsax-react";
import { Bike, ChefHat, LayoutList, Megaphone, Soup, User2 } from "lucide-react";

export const Admin = [
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


export const Seller = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
    {
        title: 'Orders',
        icon: <Soup size="24" />,
        link: '/orders',
    },
    {
        title: 'Product List',
        icon: <LayoutList size="24" />,
        link: '/product-list',
    },
    {
        title: 'Paid Plans',
        icon: <Notebook size="24" />,
        link: '/paid-plans',
    },
    {
        title: 'Wallet',
        icon: <Wallet size="24" />,
        link: '/wallet',
    },
]



export const Franchise = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
    },
    {
        title: 'Analytics',
        icon: <Soup size="24" />,
        link: '/analytics',
    },
    {
        title: 'Orders',
        icon: <LayoutList size="24" />,
        link: '/orders',
    },
    {
        title: 'Vendors',
        icon: <Notebook size="24" />,
        link: '/franchisevendors',
    },
    {
        title: 'Delivery Boys',
        icon: <Wallet size="24" />,
        link: '/delivery',
    },
    {
        title: 'Settings',
        icon: <Wallet size="24" />,
        link: '/settings',
    },
]
