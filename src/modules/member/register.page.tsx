import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
  Stack,
} from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { PublicLayout } from '@/components/public-layout';
import { useAuth } from '@/context';
import { MembershipPlan } from '@/types';
import { membershipPlansStorage, membersStorage } from '@/utils/storage';
import { Link } from '@tanstack/react-router';

interface SearchParams {
  plan?: string;
}

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as SearchParams;

  useEffect(() => {
    const membershipPlans = membershipPlansStorage.getAll();
    setPlans(membershipPlans);
    if (search.plan) {
      setSelectedPlan(search.plan);
    }
  }, [search.plan]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!selectedPlan) {
      newErrors.selectedPlan = 'Please select a membership plan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(email, password, name);

      if (result.success) {
        // Create member profile
        const newMember = {
          id: `m${Date.now()}`,
          userId: (result as any).user?.id || Date.now().toString(),
          name,
          email,
          phone,
          membershipPlan: selectedPlan as 'Basic' | 'Standard' | 'Premium',
          joinDate: new Date().toISOString().split('T')[0],
          status: 'pending' as const,
        };

        membersStorage.add(newMember);

        // Navigate to dashboard
        navigate({ to: '/dashboard' });
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <PublicLayout>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <Box
              component="img"
              src="/dumbbell.png"
              alt="Dumbbell icon"
              sx={{
                width: 32,
                height: 32,
                objectFit: 'contain',
                filter: 'invert(54%) sepia(77%) saturate(4524%) hue-rotate(347deg) brightness(1.1)',
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
              Join LeadCityGym
            </Typography>
          </Box>

          <Paper elevation={3} sx={{ padding: 4, width: '100%', mt: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                error={!!errors.name}
                helperText={errors.name}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                margin="normal"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={isSubmitting}
              />

              <TextField
                fullWidth
                select
                label="Membership Plan"
                name="membershipPlan"
                margin="normal"
                value={selectedPlan}
                onChange={(e) => {
                  setSelectedPlan(e.target.value);
                  if (errors.selectedPlan) setErrors({ ...errors, selectedPlan: '' });
                }}
                error={!!errors.selectedPlan}
                helperText={errors.selectedPlan}
                disabled={isSubmitting}
              >
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.name}>
                    {plan.name} - ₦{plan.price.toLocaleString()}/month
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#FF6B35',
                  '&:hover': { backgroundColor: '#E55A2B' },
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Already have an account?
                </Typography>
                <Link
                  to="/login"
                  style={{
                    color: '#FF6B35',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Login
                </Link>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </PublicLayout>
  );
}
