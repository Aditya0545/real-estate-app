'use client';

import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

export default function NotificationSettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Email Notifications"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Push Notifications"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="New Property Alerts"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Price Change Alerts"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Message Notifications"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Newsletter"
      />
    </Box>
  );
} 