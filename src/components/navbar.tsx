import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context';

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  const publicLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Instructors', path: '/instructors' },
    { label: 'Contact', path: '/contact' },
  ];

  const authLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' },
    { label: 'Payments', path: '/payment' },
  ];

  const adminLinks = user?.role === 'admin' ? [{ label: 'Admin Panel', path: '/admin' }] : [];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1a1a1a', boxShadow: 3 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              mr: 4,
              flex: 1,
            }}
          >
            <Box
              component="img"
              src="/dumbbell.png"
              alt="LeadCityGym logo"
              sx={{
                width: 28,
                height: 28,
                objectFit: 'contain',
                filter: 'invert(54%) sepia(77%) saturate(4524%) hue-rotate(347deg) brightness(1.1)',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#FF6B35',
                textDecoration: 'none',
              }}
            >
              LeadCityGym
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {publicLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': { color: '#FF6B35' },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {isAuthenticated && (
                <>
                  {authLinks.map((link) => (
                    <Button
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': { color: '#FF6B35' },
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}

                  {adminLinks.map((link) => (
                    <Button
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        color: '#FF6B35',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}

                  <Button
                    onClick={handleLogout}
                    sx={{
                      backgroundColor: '#FF6B35',
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#E55A2B' },
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}

              {!isAuthenticated && (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    backgroundColor: '#FF6B35',
                    color: '#fff',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#E55A2B' },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {publicLinks.map((link) => (
                  <MenuItem
                    key={link.path}
                    component={Link}
                    to={link.path}
                    onClick={handleMenuClose}
                  >
                    {link.label}
                  </MenuItem>
                ))}
                {isAuthenticated && (
                  <>
                    {authLinks.map((link) => (
                      <MenuItem
                        key={link.path}
                        component={Link}
                        to={link.path}
                        onClick={handleMenuClose}
                      >
                        {link.label}
                      </MenuItem>
                    ))}
                    {adminLinks.map((link) => (
                      <MenuItem
                        key={link.path}
                        component={Link}
                        to={link.path}
                        onClick={handleMenuClose}
                      >
                        {link.label}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                )}
                {!isAuthenticated && (
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                    Login
                  </MenuItem>
                )}
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
