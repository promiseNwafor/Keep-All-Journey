import { ISidebarData } from "../../../utils/interfaces";
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';

export const SidebarData: ISidebarData[] = [
    {
        id: 0,
        title: 'Home',
        path: '/',
        icon: HomeIcon,
    },
    {
        id: 1,
        title: 'Add Item',
        path: '/add',
        icon: AddCardIcon,
    },
]