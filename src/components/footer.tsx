import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '4rem 0 2rem 0',
        marginTop: 'auto',
        borderTop: '2px solid #FF6B35',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                component="img"
                src="/dumbbell.png"
                alt="LeadCityGym logo"
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                  filter: 'invert(54%) sepia(77%) saturate(4524%) hue-rotate(347deg) brightness(1.1)',
                }}
              />
              <Typography variant="h6" sx={{ color: '#FF6B35', fontWeight: 'bold' }}>
                LeadCityGym
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Your premier fitness destination for achieving your health goals. Join thousands of
              members and start your transformation today.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#FF6B35', mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" sx={{ color: '#ccc', textDecoration: 'none', '&:hover': { color: '#FF6B35' } }}>
                Home
              </Link>
              <Link href="/about" sx={{ color: '#ccc', textDecoration: 'none', '&:hover': { color: '#FF6B35' } }}>
                About Us
              </Link>
              <Link href="/services" sx={{ color: '#ccc', textDecoration: 'none', '&:hover': { color: '#FF6B35' } }}>
                Services
              </Link>
              <Link href="/contact" sx={{ color: '#ccc', textDecoration: 'none', '&:hover': { color: '#FF6B35' } }}>
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#FF6B35', mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                📍  Toll-Gate Area, Off Oba Otudeko Avenue, Ibadan, Oyo State
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                📞 +234-814-681-5549
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                📧 info@leadcitygym.com
              </Typography>
            </Stack>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#FF6B35', mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="https://facebook.com" target="_blank" sx={{ color: '#FF6B35' }}>
                <Facebook />
              </Link>
              <Link href="https://instagram.com" target="_blank" sx={{ color: '#FF6B35' }}>
                <Instagram />
              </Link>
              <Link href="https://twitter.com" target="_blank" sx={{ color: '#FF6B35' }}>
                <Twitter />
              </Link>
              <Link href="https://linkedin.com" target="_blank" sx={{ color: '#FF6B35' }}>
                <LinkedIn />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: '1px solid #444',
            pt: 2,
            mt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#999' }}>
            &copy; {currentYear} LeadCityGym. All rights reserved. | Privacy Policy | Terms of
            Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
