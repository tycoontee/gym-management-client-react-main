import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useAuth } from '@/context';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { PublicLayout } from '@/components/public-layout';
import { Link } from '@tanstack/react-router';

interface SearchParams {
  redirect?: string;
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as SearchParams;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoggingIn(true);
    const result = await login(email, password);

    if (result.success) {
      navigate({
        to: search.redirect || '/dashboard',
      });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }

    setIsLoggingIn(false);
  };

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('admin@gym.com');
    setPassword('admin123');
    setError(null);
    setErrors({});

    setIsLoggingIn(true);
    const result = await login('admin@gym.com', 'admin123');

    if (result.success) {
      navigate({ to: '/dashboard' });
    } else {
      setError(result.error || 'Login failed');
    }

    setIsLoggingIn(false);
  };

  return (
    <PublicLayout>
      <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1, color: '#FF6B35' }}
          >
            🏋️ LeadCityGym
          </Typography>

          <Paper elevation={3} sx={{ padding: 4, width: '100%', mt: 3 }}>
            <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={!!errors.password}
                helperText={errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoggingIn}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#FF6B35',
                  '&:hover': { backgroundColor: '#E55A2B' },
                }}
              >
                {isLoggingIn ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                disabled={isLoggingIn}
                onClick={handleDemoLogin}
                sx={{
                  borderColor: '#FF6B35',
                  color: '#FF6B35',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                Try Demo Account
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Don't have an account?
                </Typography>
                <Link
                  to="/register"
                  style={{
                    color: '#FF6B35',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Sign up
                </Link>
              </Stack>
            </Box>

            <Box sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
                Demo Credentials:
              </Typography>
              <Typography variant="caption" sx={{ display: 'block' }}>
                Admin: admin@leadcitygym.com / admin123
              </Typography>
              <Typography variant="caption" sx={{ display: 'block' }}>
                Member: tycoon@example.com / password123
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </PublicLayout>
  );
}

