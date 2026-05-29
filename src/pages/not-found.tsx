import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { PublicLayout } from '@/components/public-layout';

export function NotFoundPage() {
  return (
    <PublicLayout>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '60px', md: '120px' },
              fontWeight: 'bold',
              color: '#FF6B35',
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Page Not Found
          </Typography>

          <Typography variant="h6" sx={{ color: '#666', mb: 4 }}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#FF6B35',
                color: '#fff',
                '&:hover': { backgroundColor: '#E55A2B' },
              }}
            >
              Go to Home
            </Button>
            <Button
              component={Link}
              to="/services"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#FF6B35',
                color: '#FF6B35',
              }}
            >
              View Services
            </Button>
          </Stack>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h1" sx={{ fontSize: '100px' }}>
              🏋️
            </Typography>
          </Box>
        </Box>
      </Container>
    </PublicLayout>
  );
}
