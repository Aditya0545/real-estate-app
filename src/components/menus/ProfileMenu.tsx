'use client';

import {
  Menu,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Tune as FilterIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useUser } from '@/contexts/UserContext';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onLogout: () => void;
  onSettingsClick: () => void;
  onNavigate: (path: string) => void;
}

export default function ProfileMenu({ 
  anchorEl, 
  onClose, 
  onLogout, 
  onSettingsClick,
  onNavigate 
}: ProfileMenuProps) {
  const { userData } = useUser();

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ 
        mt: 2,
        '& .MuiPaper-root': {
          width: { xs: '100%', sm: 320 },
          maxWidth: '100%',
          bgcolor: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {userData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userData.email}
        </Typography>
      </Box>

      <MenuItems 
        onNavigate={onNavigate}
        onSettingsClick={onSettingsClick}
        onLogout={onLogout}
      />
    </Menu>
  );
}

// Update the MenuItems interface
interface MenuItemsProps {
  onNavigate: (path: string) => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

function MenuItems({ onNavigate, onSettingsClick, onLogout }: MenuItemsProps) {
  const menuItems = [
    { icon: DashboardIcon, text: 'Dashboard', path: '/dashboard' },
    { icon: HomeIcon, text: 'Properties', path: '/properties' },
    { icon: FavoriteIcon, text: 'Favorites', path: '/favorites' },
    { icon: MessageIcon, text: 'Messages', path: '/messages', badge: 5 },
    { icon: PersonIcon, text: 'My Profile', path: '/profile' },
    { icon: FilterIcon, text: 'Filters & Preferences', path: '/filters' },
    { icon: SettingsIcon, text: 'Settings', onClick: onSettingsClick },
  ];

  return (
    <Box sx={{ py: 1 }}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={() => item.onClick ? item.onClick() : onNavigate(item.path)}
          sx={{ py: 1.5 }}
        >
          <MenuItemContent icon={item.icon} text={item.text} badge={item.badge} />
        </MenuItem>
      ))}

      <Box sx={{ borderTop: '1px solid #eee', mt: 1 }}>
        <MenuItem 
          onClick={onLogout} 
          sx={{ 
            py: 1.5,
            color: '#EF4444',
            '&:hover': { bgcolor: '#FEE2E2' }
          }}
        >
          <MenuItemContent icon={LogoutIcon} text="Logout" />
        </MenuItem>
      </Box>
    </Box>
  );
}

// Update the MenuItemContent interface
interface MenuItemContentProps {
  icon: React.ElementType;
  text: string;
  badge?: number;
}

function MenuItemContent({ icon: Icon, text, badge }: MenuItemContentProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
      <Icon sx={{ mr: 2, color: text === 'Logout' ? '#EF4444' : '#6366F1' }} />
      <Typography>{text}</Typography>
      {badge && (
        <Box 
          sx={{ 
            position: 'absolute',
            right: 0,
            bgcolor: '#EF4444',
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem'
          }}
        >
          {badge}
        </Box>
      )}
    </Box>
  );
} 