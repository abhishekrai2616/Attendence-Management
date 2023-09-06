import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 220;

function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const navigate=useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = () => {
    handleDrawerToggle();
    navigate("/adminSubject")
  };
//   {index % 2 === 0 ? <InboxIcon /> :
  const drawer = (
      <>
      <Divider />
      <List>
          <ListItem key="Student" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Subject" disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                 <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Subject" />
            </ListItemButton>
          </ListItem>
      </List>
      </>
  );

  return (
    <div>
          <div style={{height:0,width:0}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2,  '&:hover':{
              backgroundColor: 'blue',
            },}}
          >
            <MenuIcon />
          </IconButton>
          </div>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,top:"80px" },
          }}
        >
          {drawer}
        </Drawer>
    </div>
  );
}


export default Admin;