import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
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
            </Box>
        </Drawer >
    );
}
