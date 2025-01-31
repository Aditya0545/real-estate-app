'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Alert,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import Footer from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';

export default function SignUpPage() {
  const router = useRouter();
  const { updateUserData } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    let password = '';

    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    chars = uppercase + lowercase + numbers + symbols;
    for (let i = password.length; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    setFormData(prev => ({
      ...prev,
      password: password,
      confirmPassword: password
    }));
  };

  const validatePassword = (password: string) => {
    const criteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};:,.<>?]/.test(password)
    };

    if (!password) return '';

    const errors = [];
    if (!criteria.minLength) errors.push('At least 8 characters');
    if (!criteria.hasUpperCase) errors.push('One uppercase letter');
    if (!criteria.hasLowerCase) errors.push('One lowercase letter');
    if (!criteria.hasNumber) errors.push('One number');
    if (!criteria.hasSpecialChar) errors.push('One special character');

    return errors.length > 0 
      ? `Password must contain: ${errors.join(', ')}`
      : '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // First, check if the user already exists
    try {
      const checkUserResponse = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.emailOrPhone }),
      });

      const checkUserData = await checkUserResponse.json();

      if (checkUserData.exists) {
        setError('User already exists with this email');
        setIsLoading(false);
        return;
      }

      // If user doesn't exist, proceed with registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.emailOrPhone,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        const userData = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.emailOrPhone,
          role: 'Real Estate Agent'
        };

        localStorage.setItem('user', JSON.stringify(userData));

        // Update context
        updateUserData(userData);

        // Redirect to sign-in
        router.push('/sign-in');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Connection error. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="xs" sx={{ flex: 1, pt: 8, pb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 600, 
              mb: 4 
            }}
          >
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  autoFocus
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email or Phone Number"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Generate Strong Password">
                      <IconButton onClick={generatePassword} edge="end">
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
              helperText={
                formData.password !== formData.confirmPassword && formData.confirmPassword !== '' 
                  ? 'Passwords do not match' 
                  : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={isLoading}
              sx={{ 
                py: 2, 
                mt: 3,
                mb: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link 
                href="/sign-in"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: '1rem',
                }}
                className="text-primary-main hover:text-primary-dark"
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 600, mb: 1 }}>
            Welcome to Real Estate Hub
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Browse thousands of listings, connect with verified agents, and find your dream home - all in one place.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}