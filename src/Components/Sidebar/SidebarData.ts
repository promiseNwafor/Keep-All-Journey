import { ISidebarData } from "../../utils/interfaces";

export const SidebarData: ISidebarData[] = [
    {
        id: 0,
        title: 'Home',
        path: '/',
        iconClass: 'fas fa-home',
    },
    {
        id: 1,
        title: 'Add Item',
        path: '/add',
        iconClass: 'fas fa-folder-plus',
    },
    {
        id: 2,
        title: 'All Items',
        path: '/',
        iconClass: 'fas fa-border-all',
    },
]