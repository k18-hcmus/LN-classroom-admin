import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import UserPage from '../core/user-management';
import AdminPage from '../core/admin-management';
import UserProfile from '../core/user-profile';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export interface IRoute {
    name: RouteName,
    component: any,
    path: string,
    exactPath: boolean,
    unselectedIcon: any,
    selectedIcon: any,
};

export enum RouteName {
    USER = 'Users',
    ADMIN = 'Admin',
    PROFILE = 'Profile'
}

const RouteList: IRoute[] = [
    {
        name: RouteName.USER,
        component: UserPage,
        path: "/",
        exactPath: true,
        unselectedIcon: ManageAccountsOutlinedIcon,
        selectedIcon: ManageAccountsIcon,
    },
    {
        name: RouteName.ADMIN,
        component: AdminPage,
        path: "/admin",
        exactPath: true,
        unselectedIcon: ManageAccountsOutlinedIcon,
        selectedIcon: ManageAccountsIcon,
    },
    {
        name: RouteName.PROFILE,
        component: UserProfile,
        path: "/profile",
        exactPath: true,
        unselectedIcon: PersonOutlineIcon,
        selectedIcon: PersonIcon,
    },
]

export default RouteList;