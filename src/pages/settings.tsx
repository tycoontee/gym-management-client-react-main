import { useState } from 'react';
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
  Stack,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useAuth } from '@/context';
import { usersStorage } from '@/utils/storage';

export function SettingsPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [newsLetterNotifications, setNewsLetterNotifications] = useState(true);

  const validatePasswordForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 3) {
      errors.newPassword = 'Password must be at least 3 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!validatePasswordForm() || !user) {
      return;
    }

    setIsChangingPassword(true);

    try {
      // Verify current password
      const currentUser = usersStorage.authenticate(user.email, currentPassword);
      if (!currentUser) {
        setPasswordError('Current password is incorrect');
        setIsChangingPassword(false);
        return;
      }

      // Update password
      usersStorage.update(user.id, { password: newPassword });

      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      setPasswordError('Failed to change password. Please try again.');
      console.error(err);
    }

    setIsChangingPassword(false);
  };

  const handleSaveNotifications = () => {
    // In a real app, this would save to backend
    setPasswordSuccess('Notification preferences updated successfully!');
    setTimeout(() => setPasswordSuccess(null), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Settings
        </Typography>
        <Divider />
      </Box>

      {/* Change Password */}
      <Card sx={{ boxShadow: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Change Password
          </Typography>

          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setPasswordSuccess(null)}>
              {passwordSuccess}
            </Alert>
          )}

          {passwordError && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setPasswordError(null)}>
              {passwordError}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (passwordErrors.currentPassword)
                    setPasswordErrors({ ...passwordErrors, currentPassword: '' });
                }}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
                disabled={isChangingPassword}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (passwordErrors.newPassword)
                    setPasswordErrors({ ...passwordErrors, newPassword: '' });
                }}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
                disabled={isChangingPassword}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordErrors.confirmPassword)
                    setPasswordErrors({ ...passwordErrors, confirmPassword: '' });
                }}
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
                disabled={isChangingPassword}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            onClick={handleChangePassword}
            disabled={isChangingPassword}
            sx={{ backgroundColor: '#FF6B35' }}
          >
            {isChangingPassword ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card sx={{ boxShadow: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Notification Preferences
          </Typography>

          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setPasswordSuccess(null)}>
              {passwordSuccess}
            </Alert>
          )}

          <Stack spacing={3} sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Email Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Receive email updates about your membership and payments
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    SMS Notifications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Receive text message reminders about payments and class schedules
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={newsLetterNotifications}
                  onChange={(e) => setNewsLetterNotifications(e.target.checked)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Newsletter
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Receive our monthly newsletter with fitness tips and gym updates
                  </Typography>
                </Box>
              }
            />
          </Stack>

          <Button
            variant="contained"
            onClick={handleSaveNotifications}
            sx={{ backgroundColor: '#FF6B35' }}
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Account Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Type"
                value={user?.role === 'admin' ? 'Administrator' : 'Member'}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: '#999' }}>
                For security reasons, you cannot change your email from this page. Please contact support if you need to update your email address.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Danger Zone
          </Typography>

          <Button
            variant="outlined"
            color="error"
            disabled
            sx={{ cursor: 'not-allowed' }}
          >
            Delete Account (Contact Support)
          </Button>

          <Typography variant="caption" sx={{ display: 'block', color: '#999', mt: 1 }}>
            Deleting your account is permanent and cannot be undone. Please contact support to request account deletion.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
