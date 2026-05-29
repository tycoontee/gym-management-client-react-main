import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { PublicLayout } from '@/components/public-layout';
import { FitnessCenter, Groups, EmojiEvents } from '@mui/icons-material';

// Slideshow images
const SLIDESHOW_IMAGES = [
  '/hero-images/hero1.jpg',
  '/hero-images/hero2.jpg',
  '/hero-images/hero3.jpg',
  '/hero-images/hero4.jpg',
];

export function HomePage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section with Animated Slideshow */}
      <Box
        sx={{
          position: 'relative',
          height: '600px',
          overflow: 'hidden',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Images Container */}
        {SLIDESHOW_IMAGES.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === currentImageIndex ? 2 : 1,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 3,
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 4, textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Transform Your Body, Transform Your Life
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#f0f0f0' }}>
              Join LeadCityGym and achieve your fitness goals with our state-of-the-art facilities
              and expert trainers
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate({ to: '/register' })}
                sx={{
                  backgroundColor: '#fff',
                  color: '#FF6B35',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                Get Started Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate({ to: '/services' })}
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                View Plans
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Image Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 5,
          }}
        >
          {SLIDESHOW_IMAGES.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentImageIndex ? '#FF6B35' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { backgroundColor: '#FF6B35' },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
          Why Choose LeadCityGym?
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3, textAlign: 'center', p: 3 }}>
              <FitnessCenter sx={{ fontSize: 60, color: '#FF6B35', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                State-of-the-Art Equipment
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Access the latest fitness equipment and technology to maximize your workout
                effectiveness.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3, textAlign: 'center', p: 3 }}>
              <Groups sx={{ fontSize: 60, color: '#FF6B35', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Expert Trainers
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Learn from certified fitness professionals who are passionate about your success.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', boxShadow: 3, textAlign: 'center', p: 3 }}>
              <EmojiEvents sx={{ fontSize: 60, color: '#FF6B35', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Proven Results
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Join thousands of members who have transformed their bodies and achieved their
                fitness goals.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                5000+
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Active Members
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                50+
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Expert Trainers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                24/7
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Gym Access
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                100%
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                Satisfaction Rate
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Ready to Start Your Fitness Journey?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
          Choose a membership plan that fits your goals and budget. Start your transformation
          today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate({ to: '/register' })}
          sx={{
            backgroundColor: '#FF6B35',
            color: '#fff',
            '&:hover': { backgroundColor: '#E55A2B' },
          }}
        >
          Join LeadCityGym Today
        </Button>
      </Container>
    </PublicLayout>
  );
}
