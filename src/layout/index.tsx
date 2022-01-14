import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Switch } from "react-router-dom";
import AppBar from './components/app-bar';
import SideBar from './components/side-bar';
interface LayoutProps {
  children: any
}


const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {

  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }}>
      <AppBar />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, margin: (theme) => theme.spacing(1) }}>
        <Toolbar />
        <Switch>
          {children}
        </Switch>
      </Box>
    </Box>
  );
}

export default Layout;