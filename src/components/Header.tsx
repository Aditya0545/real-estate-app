'use client';

import Link from 'next/link';
import { Typography } from '@mui/material';

export default function Header() {
  return (
    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#6366F1', 
          cursor: 'pointer',
          fontWeight: 600,
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        RealEstate
      </Typography>
    </Link>
  );
} 