import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Card, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../services/auth';
import { setCreateClassModalOpen } from '../../slices/create-class-modal-sclice';
import { setJoinClassModalOpen } from '../../slices/join-class-modal-slice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const AccountCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(50),
  position: "absolute",
  marginTop: theme.spacing(12),
  marginLeft: theme.spacing(-30),
}))

const AccountList = styled(List)(({ theme }) => ({
  width: theme.spacing(60),
}))

const AccountListItem = styled(ListItem)(({ theme }) => ({
  width: "100%",
  height: theme.spacing(8),
  fontSize: theme.fontSizes.default,
  color: theme.colors.background.primary,
}))

const AccountListItemButton = styled(ListItemButton)(({ theme }) => ({
  width: "100%",
  height: theme.spacing(8)
}))

const Line = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3)
}))

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isAccountButton, setIsAccountButton] = React.useState(false)

  const history = useHistory()
  const dispatch = useAppDispatch()

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateClass = () => {
    dispatch(setCreateClassModalOpen())
    handleMenuClose();
  }

  const handleJoinClass = () => {
    dispatch(setJoinClassModalOpen())
    handleMenuClose();
  }

  const handleAccountButton = () => {
    setIsAccountButton(!isAccountButton)
  }

  const ref = React.useRef(null)

  // useOnClickOutside(ref, handleClickOutside)
  const handleMyProfileClick = () => {
    history.push('/profile')
    setIsAccountButton(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/login'
    } catch (err) {
      //ignore
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleJoinClass}>Join class</MenuItem>
      <MenuItem onClick={handleCreateClass}>Create class</MenuItem>
    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: ({ colors }) => colors.background.primary }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Admin Page
          </Typography>
          <Box sx={{ flexGrow: 1 }} >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: "100%" }}
            >
              <Grid item style={{ width: "40%" }}>
                <Search sx={{ flexGrow: 1 }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />

                </Search>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              ref={ref}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleAccountButton}
            >
              <AccountCircle />
            </IconButton>
            {isAccountButton ?
              (
                <AccountCard>
                  <AccountList>
                    <AccountListItem disablePadding onClick={handleMyProfileClick} >
                      <AccountListItemButton>
                        <ListItemIcon>
                          <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="My profile" />
                      </AccountListItemButton>
                    </AccountListItem>
                    <Line />
                    <AccountListItem disablePadding onClick={handleLogout}>
                      <AccountListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </AccountListItemButton>
                    </AccountListItem>
                  </AccountList>
                </AccountCard>
              ) :
              (
                <>
                </>
              )
            }
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
