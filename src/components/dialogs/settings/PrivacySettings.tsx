'use client';

import { Box, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export default function PrivacySettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Profile Visibility"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Show Contact Information"
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Allow Messages from Non-connections"
      />
      
      <FormControlLabel
        control={<Switch />}
        label="Share Activity Status"
      />

      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
        Data & Security
      </Typography>
      
      <Button 
        variant="outlined" 
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete Account
      </Button>
    </Box>
  );
} 