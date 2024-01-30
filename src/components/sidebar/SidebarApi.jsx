import { Element4, ElementPlus, Trade, Truck, User } from "iconsax-react";

export const SidebarAdminApi = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" />,
        link: '/',
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
    {
        title: 'App Assets',
        icon: <ElementPlus size="24" />,
        link: '/DashboardAssets',
    },
    {
        title: 'User',
        icon: <User size="24" />,
        link: '/user',
    }
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

