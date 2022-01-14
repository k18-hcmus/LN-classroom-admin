import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UserPage from '../core/user-management';
import AdminPage from '../core/admin-management';
import ClassroomPage from '../core/classroom-management';
import UserProfile from '../core/user-profile';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

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
    ADMIN = 'Admins',
    CLASSROOM = 'Classrooms',
    PROFILE = 'Profile'
}

const RouteList: IRoute[] = [
    {
        name: RouteName.USER,
        component: UserPage,
        path: "/",
        exactPath: true,
        unselectedIcon: SupervisorAccountOutlinedIcon,
        selectedIcon: SupervisorAccountIcon,
    },
    {
        name: RouteName.ADMIN,
        component: AdminPage,
        path: "/admin",
        exactPath: true,
        unselectedIcon: AdminPanelSettingsOutlinedIcon,
        selectedIcon: AdminPanelSettingsIcon,
    },
    {
        name: RouteName.CLASSROOM,
        component: ClassroomPage,
        path: "/classroom",
        exactPath: true,
        unselectedIcon: SchoolOutlinedIcon,
        selectedIcon: SchoolIcon,
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