'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  DateRange as DateRangeIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  memberSince: string;
}

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { userData, updateUserData } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: userData.name,
    role: userData.role,
    email: userData.email,
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    company: 'Real Estate Hub',
    memberSince: 'January 2024'
  });

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      updateUserData({
        name: profileData.name,
        role: profileData.role,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        company: profileData.company,
        memberSince: profileData.memberSince
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (field: keyof ProfileData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const renderProfileInfo = () => (
    <Box sx={{ 
      ml: isMobile ? 0 : 2, 
      mb: 2,
      mt: isMobile ? 2 : 0,
      width: '100%'
    }}>
      {isEditing ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
          width: '100%',
          p: 2,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Name
            </Typography>
            <TextField
              size="small"
              value={profileData.name}
              onChange={handleChange('name')}
              fullWidth
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Role
            </Typography>
            <TextField
              size="small"
              value={profileData.role}
              onChange={handleChange('role')}
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
      ) : (
        <>
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            {profileData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {profileData.role}
          </Typography>
        </>
      )}
    </Box>
  );

  const renderContactInfo = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2
    }}>
      {isEditing ? (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          bgcolor: 'white',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={profileData.email}
              onChange={handleChange('email')}
              variant="outlined"
              InputProps={{
                startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Phone
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={profileData.phone}
              onChange={handleChange('phone')}
              variant="outlined"
              InputProps={{
                startAdornment: <PhoneIcon color="primary" sx={{ mr: 1 }} />
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={profileData.location}
              onChange={handleChange('location')}
              variant="outlined"
              InputProps={{
                startAdornment: <LocationIcon color="primary" sx={{ mr: 1 }} />
              }}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="primary" />
            <Typography>{profileData.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="primary" />
            <Typography>{profileData.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon color="primary" />
            <Typography>{profileData.location}</Typography>
          </Box>
        </>
      )}
    </Box>
  );

  const renderProfessionalInfo = () => (
    <Box sx={{ p: isEditing ? 2 : 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Company
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={profileData.company}
                onChange={handleChange('company')}
                variant="outlined"
                InputProps={{
                  startAdornment: <BusinessIcon color="primary" sx={{ mr: 1 }} />
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon color="primary" />
                <Typography>{profileData.company}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Member Since
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={profileData.memberSince}
                onChange={handleChange('memberSince')}
                variant="outlined"
                InputProps={{
                  startAdornment: <DateRangeIcon color="primary" sx={{ mr: 1 }} />
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DateRangeIcon color="primary" />
                <Typography>{profileData.memberSince}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? 0 : 32,
          maxHeight: isMobile ? '100%' : 'calc(100% - 64px)',
          height: isMobile ? '100%' : 'auto',
          borderRadius: isMobile ? 0 : 2,
          overflow: 'auto'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Cover Image */}
        <Box sx={{ 
          height: isMobile ? 150 : 200, 
          bgcolor: 'primary.main', 
          position: 'relative' 
        }} />

        {/* Profile Info */}
        <Box sx={{ 
          px: isMobile ? 2 : 3, 
          pb: isMobile ? 2 : 3,
          position: 'relative'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-end', 
            mb: 3,
            mt: isMobile ? -7 : -8,
            textAlign: isMobile ? 'center' : 'left',
            position: 'relative',
            zIndex: 1
          }}>
            <Avatar 
              sx={{ 
                width: isMobile ? 120 : 150, 
                height: isMobile ? 120 : 150, 
                border: '4px solid white',
                bgcolor: '#6366F1',
                flexShrink: 0
              }}
            >
              AS
            </Avatar>
            {renderProfileInfo()}
          </Box>

          <Grid container spacing={isMobile ? 2 : 3}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: isMobile ? 1.5 : 2,
                height: '100%'
              }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                {renderContactInfo()}
              </Paper>
            </Grid>

            {/* Professional Info */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                p: isMobile ? 1.5 : 2,
                height: '100%'
              }}>
                <Typography variant="h6" gutterBottom>
                  Professional Information
                </Typography>
                {renderProfessionalInfo()}
              </Paper>
            </Grid>

            {/* Statistics */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: isMobile ? 1.5 : 2,
                '& .MuiGrid-container': {
                  alignItems: 'stretch'
                }
              }}>
                <Typography variant="h6" gutterBottom>
                  Performance Statistics
                </Typography>
                <Grid container spacing={isMobile ? 1 : 3}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ 
                      textAlign: 'center',
                      p: isMobile ? 1 : 2
                    }}>
                      <Typography 
                        variant={isMobile ? 'h5' : 'h4'} 
                        color="primary"
                      >
                        12
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: isMobile ? '0.75rem' : '0.875rem' 
                        }}
                      >
                        Properties Listed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">48</Typography>
                      <Typography variant="body2">Properties Sold</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">95%</Typography>
                      <Typography variant="body2">Success Rate</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">4.9</Typography>
                      <Typography variant="body2">Rating</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <Paper sx={{ p: isMobile ? 1.5 : 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: isMobile ? 1.5 : 2 
                }}>
                  {[
                    { action: 'Listed new property', time: '2 hours ago' },
                    { action: 'Updated property details', time: '5 hours ago' },
                    { action: 'Closed a deal', time: '1 day ago' },
                  ].map((activity, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle2">{activity.action}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.time}
                      </Typography>
                      {index < 2 && <Divider sx={{ mt: 1 }} />}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions 
        sx={{ 
          p: isMobile ? 1.5 : 2, 
          borderTop: 1, 
          borderColor: 'divider',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 1,
          position: 'sticky',
          bottom: 0,
          bgcolor: 'background.paper',
          zIndex: 2
        }}
      >
        <Button 
          fullWidth={isMobile}
          onClick={onClose}
          sx={{ minWidth: isMobile ? '100%' : 100 }}
        >
          Close
        </Button>
        <Button 
          fullWidth={isMobile}
          variant="contained"
          startIcon={isEditing ? null : <EditIcon />}
          onClick={handleEdit}
          sx={{ minWidth: isMobile ? '100%' : 140 }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 