import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  MenuItem,
} from '@mui/material';
import { useAuth } from '@/context';
import { Member } from '@/types';
import { membersStorage, membershipPlansStorage, usersStorage } from '@/utils/storage';

export function ProfilePage() {
  const { user } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Member | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const memberData = membersStorage.findByUserId(user.id);
      setMember(memberData || null);
      setFormData(memberData || null);
    }
    setLoading(false);
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData?.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData?.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const handleSave = async () => {
    setSuccess(null);
    setError(null);

    if (!validateForm() || !formData || !member) {
      return;
    }

    setIsSaving(true);

    try {
      // Update member in storage
      membersStorage.update(member.id, formData);

      // Update user email if changed
      if (user && formData.email !== user.email) {
        usersStorage.update(user.id, { email: formData.email });
      }

      setMember(formData);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    }

    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData(member);
    setIsEditing(false);
    setErrors({});
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!member) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">Member profile not found</Alert>
      </Container>
    );
  }

  const plans = membershipPlansStorage.getAll();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          My Profile
        </Typography>
        <Divider />
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Personal Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData?.email || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData?.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData?.dateOfBirth || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData?.address || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData?.city || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData?.state || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formData?.zipCode || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    sx={{ backgroundColor: '#FF6B35' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={isSaving}
                      sx={{ backgroundColor: '#FF6B35' }}
                    >
                      {isSaving ? <CircularProgress size={20} /> : 'Save Changes'}
                    </Button>
                    <Button variant="outlined" onClick={handleCancel} disabled={isSaving}>
                      Cancel
                    </Button>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Membership Information */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Membership Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Membership Plan"
                    select
                    name="membershipPlan"
                    value={formData?.membershipPlan || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    {plans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.name}>
                        {plan.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status"
                    value={formData?.status || ''}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Join Date"
                    type="date"
                    value={formData?.joinDate || ''}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Member ID"
                    value={formData?.id || ''}
                    disabled
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ backgroundColor: '#FF6B35' }}
                  >
                    {isSaving ? <CircularProgress size={20} /> : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
