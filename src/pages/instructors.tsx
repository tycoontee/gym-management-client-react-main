import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PublicLayout } from '@/components/public-layout';
import { InstructorCard } from '@/components/instructor-card';
import { Instructor } from '@/types';
import { instructorsStorage } from '@/utils/storage';

export function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const allInstructors = instructorsStorage.getAll();
    setInstructors(allInstructors);
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #1a1a1a 100%)',
          color: '#fff',
          padding: '60px 0',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Meet Our Instructors
          </Typography>
          <Typography variant="h5" sx={{ color: '#f0f0f0' }}>
            Expert trainers dedicated to your fitness success
          </Typography>
        </Container>
      </Box>

      {/* Instructors Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {instructors.length > 0 ? (
          <Grid container spacing={4}>
            {instructors.map((instructor) => (
              <Grid item xs={12} sm={6} md={4} key={instructor.id}>
                <InstructorCard instructor={instructor} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: '#666' }}>
              Loading instructors...
            </Typography>
          </Box>
        )}

        {/* Specializations Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Our Specializations
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: 'Weightlifting',
                description:
                  'Build strength and muscle with our expert weightlifting programs',
                icon: '🏋️',
              },
              {
                title: 'Yoga',
                description: 'Improve flexibility, balance, and mindfulness through yoga',
                icon: '🧘',
              },
              {
                title: 'Cardio',
                description: 'Enhance your cardiovascular health with dynamic cardio sessions',
                icon: '🏃',
              },
              {
                title: 'Boxing',
                description: 'Learn boxing techniques and get an incredible full-body workout',
                icon: '🥊',
              },
              {
                title: 'CrossFit',
                description: 'Push your limits with functional fitness and high-intensity training',
                icon: '⚡',
              },
              {
                title: 'Pilates',
                description: 'Strengthen your core and improve posture with pilates',
                icon: '🤸',
              },
            ].map((spec, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    textAlign: 'center',
                    border: '2px solid #FF6B35',
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {spec.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {spec.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {spec.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PublicLayout>
  );
}
