'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  // ... other imports
} from '@mui/material';
import { useState } from 'react';
import GeneralSettings from './settings/GeneralSettings';
import NotificationSettings from './settings/NotificationSettings';
import PrivacySettings from './settings/PrivacySettings';
import AppearanceSettings from './settings/AppearanceSettings';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        Settings
      </DialogTitle>
      
      <Tabs 
        value={currentTab} 
        onChange={(_, newValue) => setCurrentTab(newValue)}
        sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="General" />
        <Tab label="Notifications" />
        <Tab label="Privacy" />
        <Tab label="Appearance" />
      </Tabs>

      <DialogContent>
        {currentTab === 0 && <GeneralSettings />}
        {currentTab === 1 && <NotificationSettings />}
        {currentTab === 2 && <PrivacySettings />}
        {currentTab === 3 && <AppearanceSettings />}
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="contained"
          onClick={onClose}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
} 