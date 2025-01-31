'use client';

import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ 
      bgcolor: '#3B0764', // Deep purple color
      color: 'white',
      py: 4,
      mt: 'auto'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Real Estate Hub
            </Typography>
            <Typography variant="body2">
              Your trusted platform for finding and listing properties. We make real estate simple and accessible.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/about-us" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact
              </Link>
              <Link href="/properties" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Properties
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" paragraph>
              Email: info@realestatehub.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2">
              Address: 123 Property Lane,<br />
              Real Estate City, RE 12345
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <Link href="/privacy-policy" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Terms of Service
              </Link>
              <Link href="/cookie-policy" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Cookie Policy
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Real Estate Hub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
} 