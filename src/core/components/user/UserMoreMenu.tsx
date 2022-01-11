import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Icon } from '@iconify/react';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { banUser } from '../../../slices/user-slice';

// ----------------------------------------------------------------------

interface UserMoreMenuProps {
  id: string,

}

const UserMoreMenu: React.FunctionComponent<UserMoreMenuProps> = ({ id }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch()

  const handleBan = () => {
    dispatch(banUser(id))
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={'div'} sx={{ color: 'text.secondary' }} onClick={handleBan}>
          <ListItemIcon >
            <NotInterestedIcon />
          </ListItemIcon>
          <ListItemText primary="Ban/Unban Account" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={`/users/${id}`} sx={{ color: 'text.secondary' }} target="_blank" rel="noopener noreferrer">
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          <ListItemText primary="View Account" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMoreMenu;