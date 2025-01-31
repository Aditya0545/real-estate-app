'use client';

import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Notifications,
  Add as AddIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Tune as FilterIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Image from 'next/image';
import ProfileMenu from '@/components/menus/ProfileMenu';
import SettingsDialog from '@/components/dialogs/SettingsDialog';
import ProfileDialog from '@/components/dialogs/ProfileDialog';
import { UserProvider, useUser } from '@/contexts/UserContext';

// Create a separate component for dashboard content
function DashboardContent() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const { userData } = useUser();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Close the menu
        handleProfileMenuClose();
        
        // Redirect to sign-in page
        router.push('/sign-in');
        
        // Force a page refresh
        router.refresh();
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigation = (path: string) => {
    if (path === '/profile') {
      setProfileOpen(true);
      handleProfileMenuClose();
    } else {
      setIsLoading(true);
      router.push(path);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsClick = () => {
    setSettingsOpen(true);
    handleProfileMenuClose();
  };

  // Create drawer content component
  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#6366F1' }}>
          {userData.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{userData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton selected onClick={() => handleNavigation('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/properties')}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="Properties" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/favorites')}>
            <ListItemIcon>
              <FavoriteIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/messages')}>
            <ListItemIcon>
              <Badge badgeContent={5} color="error">
                <MessageIcon sx={{ color: '#6366F1' }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/profile')}>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/filters')}>
            <ListItemIcon>
              <FilterIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="Filters & Preferences" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#6366F1' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout} sx={{ color: '#EF4444' }}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#EF4444' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 2, gap: 2 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Header />

            {/* Location Search - Hide on mobile */}
            {!isMobile && (
              <Paper
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: { sm: 250 },
                  border: '1px solid #e0e0e0',
                }}
              >
                <LocationOn sx={{ color: 'text.secondary', ml: 1 }} />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Location"
                />
              </Paper>
            )}

            {/* Property Search - Adjust for mobile */}
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', md: 450 },
                border: '1px solid #e0e0e0',
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', ml: 1 }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by property name, type..."
              />
              {!isMobile && (
                <Button variant="contained" sx={{ bgcolor: '#6366F1' }}>
                  Search
                </Button>
              )}
            </Paper>

            <Box sx={{ flexGrow: 1 }} />

            {/* Show these buttons based on screen size */}
            {!isMobile && (
              <>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: '#FF1A6C',
                    '&:hover': { bgcolor: '#FF1A6C' },
                  }}
                >
                  Add Property
                </Button>

                <IconButton>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                <Box onClick={handleProfileMenuOpen} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Avatar sx={{ bgcolor: '#6366F1' }}>
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle1">{userData.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userData.email}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Toolbar>

          {/* Filters Bar - Scrollable on mobile */}
          <Box 
            sx={{ 
              py: 1.5, 
              borderTop: '1px solid #e0e0e0', 
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              '::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <Button variant="outlined" sx={{ minWidth: 'max-content' }}>Property Type</Button>
            <Button variant="outlined" sx={{ minWidth: 'max-content' }}>Price Range</Button>
            <Button variant="outlined" sx={{ minWidth: 'max-content' }}>Beds & Baths</Button>
            <Button startIcon={<FilterIcon />} variant="outlined" sx={{ minWidth: 'max-content' }}>
              More Filters
            </Button>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: '#6366F1', 
              color: 'white',
              borderRadius: 3
            }}>
              <Typography variant="h2" sx={{ fontWeight: 600 }}>12</Typography>
              <Typography variant="h6">Total Properties</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: '#10B981', 
              color: 'white',
              borderRadius: 3
            }}>
              <Typography variant="h2" sx={{ fontWeight: 600 }}>48</Typography>
              <Typography variant="h6">Properties Viewed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: '#F59E0B', 
              color: 'white',
              borderRadius: 3
            }}>
              <Typography variant="h2" sx={{ fontWeight: 600 }}>6</Typography>
              <Typography variant="h6">Saved Searches</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: '#EF4444', 
              color: 'white',
              borderRadius: 3
            }}>
              <Typography variant="h2" sx={{ fontWeight: 600 }}>3</Typography>
              <Typography variant="h6">New Messages</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Activity and Performance Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Recent Activities
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6">Luxury Villa with Pool</Typography>
                  <Typography variant="body1" color="text.secondary">
                    2 hours ago
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6">Modern City Apartment</Typography>
                  <Typography variant="body1" color="text.secondary">
                    5 hours ago
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6">Oceanfront Penthouse</Typography>
                  <Typography variant="body1" color="text.secondary">
                    1 day ago
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Property Performance
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Views</Typography>
                    <Typography>85%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: '#E5E7EB', borderRadius: 1 }}>
                    <Box sx={{ width: '85%', height: 8, bgcolor: '#6366F1', borderRadius: 1 }} />
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Inquiries</Typography>
                    <Typography>62%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: '#E5E7EB', borderRadius: 1 }}>
                    <Box sx={{ width: '62%', height: 8, bgcolor: '#6366F1', borderRadius: 1 }} />
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Saved</Typography>
                    <Typography>45%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: '#E5E7EB', borderRadius: 1 }}>
                    <Box sx={{ width: '45%', height: 8, bgcolor: '#6366F1', borderRadius: 1 }} />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Upcoming Appointments
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Paper sx={{ p: 2, mb: 2, bgcolor: '#EEF2FF', borderRadius: 2 }}>
                  <Typography variant="h6">Modern Villa</Typography>
                  <Typography variant="body1" color="text.secondary">
                    March 15, 2024 at 10:00 AM
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#6366F1' }}>Viewing</Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#EEF2FF', borderRadius: 2 }}>
                  <Typography variant="h6">City Apartment</Typography>
                  <Typography variant="body1" color="text.secondary">
                    March 17, 2024 at 2:30 PM
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#6366F1' }}>Meeting</Typography>
                </Paper>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Featured Properties */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }} fontWeight={600}>
            Featured Properties
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                id: 1,
                title: 'Modern Villa with Ocean View',
                location: 'Miami Beach, FL',
                price: 1250000,
                beds: 4,
                baths: 3,
                area: 2800,
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
                tags: ['Featured', 'New'],
              },
              {
                id: 2,
                title: 'Luxury Penthouse Downtown',
                location: 'New York, NY',
                price: 2100000,
                beds: 3,
                baths: 2.5,
                area: 2200,
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
                tags: ['Premium'],
              },
              {
                id: 3,
                title: 'Contemporary Beach House',
                location: 'Malibu, CA',
                price: 3500000,
                beds: 5,
                baths: 4,
                area: 3500,
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
                tags: ['Exclusive'],
              },
            ].map((property) => (
              <Grid item xs={12} md={4} key={property.id}>
                <Paper
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 240 }}>
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      {property.tags.map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            bgcolor: 'rgba(99, 102, 241, 0.9)',
                            color: 'white',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {property.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {property.location}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom fontWeight={600}>
                      ${property.price.toLocaleString()}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3,
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Bedrooms
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {property.beds}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Bathrooms
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {property.baths}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Area (sq ft)
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {property.area.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <ProfileMenu 
        anchorEl={anchorEl}
        onClose={handleProfileMenuClose}
        onLogout={handleLogout}
        onSettingsClick={handleSettingsClick}
        onNavigate={handleNavigation}
      />
      
      <SettingsDialog 
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      
      <ProfileDialog 
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </Box>
  );
}

// Main dashboard page component
export default function DashboardPage() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
} 