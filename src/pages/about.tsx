import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  CardMedia,
} from '@mui/material';
import { PublicLayout } from '@/components/public-layout';

export function AboutPage() {
  const team = [
    {
      id: 1,
      name: 'Victor Ayobami',
      role: 'Founder & CEO',
      bio: 'Fitness enthusiast with 15+ years of experience in gym management',
      photo: '/team-photos/victor.jpg',
    },
    {
      id: 2,
      name: 'Jude Oluchi',
      role: 'Head of Operations',
      bio: 'Ensuring excellent service delivery and member satisfaction',
      photo: '/team-photos/oluchi.jpg',
    },
    {
      id: 3,
      name: 'Babalola Daniel',
      role: 'Head Trainer',
      bio: 'Certified strength and conditioning specialist',
      photo: '/team-photos/dan.jpg',
    },
    {
      id: 4,
      name: 'Idris Deborah',
      role: 'Nutrition Advisor',
      bio: 'Registered dietitian and wellness coach',
      photo: '/team-photos/idris.jpg',
    },
  ];

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
            About LeadCityGym
          </Typography>
          <Typography variant="h5" sx={{ color: '#f0f0f0' }}>
            Empowering individuals to achieve their fitness goals since 2026
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#FF6B35' }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
              LeadCityGym was founded in 2026 with a simple mission: to create an inclusive,
              supportive community where people of all fitness levels can achieve their health and
              wellness goals.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
              Starting as a small local gym with just a handful of members, we've grown into a
              state-of-the-art fitness facility serving over 5,000 active members across our
              metropolitan locations.
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
              Today, we remain committed to our core values: affordability, accessibility, and
              exceptional service. Whether you're a complete beginner or an experienced athlete,
              LeadCityGym is your partner in fitness.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/team-photos/gym.jpg"
              alt="Gym"
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Our Mission and Values */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 2, p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#FF6B35' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
                  To inspire and empower individuals to transform their lives through fitness,
                  wellness, and community support. We believe that every person deserves access to
                  world-class fitness facilities and professional guidance, regardless of their
                  background or fitness level.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 2, p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#FF6B35' }}>
                  Our Values
                </Typography>
                <Stack spacing={2}>
                  <Typography variant="body2">
                    <strong>🎯 Excellence:</strong> We strive for the highest standards in
                    everything we do
                  </Typography>
                  <Typography variant="body2">
                    <strong>🤝 Community:</strong> We foster a supportive and inclusive environment
                  </Typography>
                  <Typography variant="body2">
                  <strong>🏋️ Integrity:</strong> We are transparent and honest in all our dealings
                  </Typography>
                  <Typography variant="body2">
                    <strong>🌟 Innovation:</strong> We continuously improve our facilities and
                    services
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
          Meet Our Leadership Team
        </Typography>

        <Grid container spacing={4}>
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={member.photo}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#FF6B35', fontWeight: 'bold', mb: 1 }}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  );
}
