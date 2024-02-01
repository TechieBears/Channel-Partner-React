import { Element4, ElementPlus, Trade, Truck, User, Settings, Menu, Shop, SecurityUser } from "iconsax-react";

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
        title: 'Drivers',
        icon: <Element4 size="24" />,
        link: '/drivers',
    },
    {
        title: 'User',
        icon: <User size="24" />,
        link: '/user',
    },
    {
        title: 'SubAdmin',
        icon: <SecurityUser size="24" />,
        link: '/subadmin',
    },
    {
        title: 'Orders',
        icon: <Element4 size="24" />,
        link: '/orders',
    },
    {
        title: 'Banners',
        icon: <Element4 size="24" />,
        link: '/DashboardAssets',
    },
    // {
    //     title: 'App Assets',
    //     icon: <ElementPlus size="24" />,
    //     link: '/DashboardAssets',
    // },
    {
        title: 'Promotions',
        icon: <Element4 size="24" />,
        link: '/promotions',
    },
    // {
    //     title: 'User Data',
    //     icon: <Element4 size="24" />,
    //     link: '/userdata',
    // },
  
    
    {
        title: 'Reports',
        icon: <Element4 size="24" />,
        link: '/reports',
    },
    {
        title: 'Account Statement',
        icon: <Element4 size="24" />,
        link: '/accountStatement',
    },
    {
        title: 'Settings',
        icon: <Settings size="24" />,
        link: '/settings',
    },
    // {
    //     title: 'Storages',
    //     icon: <Trade size="24" />,
    //     link: '/storages',
    //     subMenu: [
    //         {
    //             title: 'All Storages',
    //             icon: <Cup size="24" />,
    //             link: '/storages',
    //         },
    //         {
    //             title: 'Availability',
    //             icon: <Cup size="24" />,
    //             link: '/storage-availability',
    //         },
    //         // {
    //         //     title: 'Bookings',
    //         //     icon: <MenuBoard size="24" />,
    //         //     link: '/storage-bookings',
    //         // },
    //         {
    //             title: 'Visiting',
    //             icon: <MessageFavorite size="24" />,
    //             link: '/storage-visit',
    //         },
    //         {
    //             title: 'Master',
    //             icon: <Cup size="24" />,
    //             link: '/storageMaster',
    //         },

    //     ]
    // },

  
]

export const VendorSidebarApi = [
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

