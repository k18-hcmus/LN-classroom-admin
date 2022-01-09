import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import RouteList from '../../app/routes';

const drawerWidth = 240;

const SidebarLabel = styled(Typography)(({ theme, }) => ({
    fontWeight: 'bold',
    fontSize: theme.fontSizes.default,
    color: theme.colors.texting.sideBarLabel,
    padding: theme.spacing(0, 4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
}));

const StyledListItemText = styled(Typography)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    color: theme.colors.texting.sideBarLabel,
    fontWeight: isSelected ? "bold" : 500,
    fontSize: theme.fontSizes.default,
}));

export default function SideBar() {
    const currentSelected = useAppSelector((state) => state.routeReducer.currentSelected)
    const enrolledClassrooms = useAppSelector(({ classroomReducer }) => classroomReducer.enrolledClassrooms)
    const teachingClassrooms = useAppSelector(({ classroomReducer }) => classroomReducer.teachingClassrooms)

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }} >
                <List>
                    <SidebarLabel > General </SidebarLabel>
                    {RouteList && RouteList.map((route, index) => (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to={route.path}
                            selected={currentSelected === index}
                        >
                            <ListItemIcon>
                                {currentSelected === index ? <route.selectedIcon /> : <route.unselectedIcon />}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={<StyledListItemText isSelected={currentSelected === index}>
                                    {route.name}
                                </StyledListItemText>} />
                        </ListItem>
                    ))}
                </List>
                {enrolledClassrooms.length > 0 &&
                    (<>
                        <Divider />
                        <SidebarLabel > Enrolled </SidebarLabel>
                        <List>
                            {enrolledClassrooms.map((classroom, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    component={Link}
                                    to={`/classrooms/${classroom._id}`}
                                    selected={currentSelected === classroom._id}
                                >
                                    <ListItemText
                                        disableTypography
                                        sx={{ ml: theme => theme.spacing(4) }}
                                        primary={<StyledListItemText isSelected={currentSelected === classroom._id}>
                                            {classroom.name}
                                        </StyledListItemText>} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                    )}
                {teachingClassrooms.length > 0 &&
                    (<>
                        <Divider />
                        <SidebarLabel > Teaching </SidebarLabel>
                        <List>
                            {teachingClassrooms.map((classroom, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    component={Link}
                                    to={`/classrooms/${classroom._id}`}
                                    selected={currentSelected === classroom._id}
                                >
                                    <ListItemText
                                        disableTypography
                                        sx={{ ml: theme => theme.spacing(4) }}
                                        primary={<StyledListItemText isSelected={currentSelected === classroom._id}>
                                            {classroom.name}
                                        </StyledListItemText>} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                    )}
            </Box>
        </Drawer >
    );
}
