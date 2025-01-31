'use client';

import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function GeneralSettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Name"
        defaultValue="Aman Singh"
        fullWidth
      />
      
      <TextField
        label="Email"
        defaultValue="amansingh@gmail.com"
        fullWidth
      />
      
      <TextField
        label="Phone"
        defaultValue="+1 234 567 8900"
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Language</InputLabel>
        <Select
          defaultValue="en"
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Time Zone</InputLabel>
        <Select
          defaultValue="est"
          label="Time Zone"
        >
          <MenuItem value="est">Eastern Time</MenuItem>
          <MenuItem value="cst">Central Time</MenuItem>
          <MenuItem value="pst">Pacific Time</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 