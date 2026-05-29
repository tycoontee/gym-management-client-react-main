import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PublicLayout } from '@/components/public-layout';

export function ContactPage() {
  return (
    <PublicLayout>
      <Box sx={{ backgroundColor: '#fff', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FF6B35', mb: 2 }}>
                Contact LeadCityGym
              </Typography>
              <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 3 }}>
                Have a question, want to book a tour, or need help choosing a membership plan? Our
                team is ready to help you take the next step in your fitness journey.
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      📍 Visit Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Toll-Gate Area, Off Oba Otudeko Avenue, Ibadan, Oyo State
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      📞 Call Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      +234-814-681-5549
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      ✉️ Email Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      info@leadcitygym.com
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, p: 2 }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Send us a message
                  </Typography>
                  <Stack spacing={2}>
                    <TextField label="Your Name" fullWidth />
                    <TextField label="Email Address" type="email" fullWidth />
                    <TextField label="Phone Number" fullWidth />
                    <TextField label="Subject" fullWidth />
                    <TextField label="Message" multiline rows={5} fullWidth />
                    <Button
                      component="a"
                      href="mailto:tycoontee14@gmail.com"
                      variant="contained"
                      sx={{ backgroundColor: '#FF6B35', '&:hover': { backgroundColor: '#e65e2c' } }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PublicLayout>
  );
}
