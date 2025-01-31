'use client';

import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function AppearanceSettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Theme Mode</InputLabel>
        <Select
          defaultValue="light"
          label="Theme Mode"
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="system">System</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Color Scheme</InputLabel>
        <Select
          defaultValue="purple"
          label="Color Scheme"
        >
          <MenuItem value="purple">Purple</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="green">Green</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 