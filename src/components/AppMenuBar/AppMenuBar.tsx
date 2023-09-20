import { AppBar, Container, Toolbar, Box, IconButton, Menu, Typography, Button } from '@mui/material';
import { MenuItemType } from '../../types/MenuItem';
import MenuButton from '../MenuButton/MenuButton';
import "./AppMenuBar.scss"
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

type AppMenuBarProps = {
    menu: MenuItemType[];
}
const AppMenuBar = ({menu}: AppMenuBarProps) => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (link: string) => {
        navigate(link);
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Asterra By Barak
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menu.map((item: MenuItemType) => (
                <MenuItem key={item.id} onClick={() => handleCloseNavMenu(item.link)}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {menu.map((item: MenuItemType) => (
                  <Button
                    key={item.id}
                    onClick={() => handleCloseNavMenu(item.link)}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );


}
export default AppMenuBar;


    
    {/* <div className="app-menu-bar">
        {menu.map((item: MenuItem) => <MenuButton key={item.id} item={item}/>)}
    </div> */}