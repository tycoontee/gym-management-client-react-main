import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { PublicLayout } from '@/components/public-layout';
import { MembershipPlanCard } from '@/components/membership-plan-card';
import { MembershipPlan } from '@/types';
import { membershipPlansStorage } from '@/utils/storage';
import { useNavigate } from '@tanstack/react-router';

export function ServicesPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const membershipPlans = membershipPlansStorage.getAll();
    setPlans(membershipPlans);
  }, []);

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlan(plan.name);
    // Navigate to register with selected plan
    navigate({ to: '/register', search: { plan: plan.name } });
  };

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
            Membership Plans
          </Typography>
          <Typography variant="h5" sx={{ color: '#f0f0f0' }}>
            Choose a plan that fits your fitness journey and budget
          </Typography>
        </Container>
      </Box>

      {/* Plans Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {plans.length > 0 ? (
          <Grid container spacing={4}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.id}>
                <MembershipPlanCard
                  plan={plan}
                  onSelect={handleSelectPlan}
                  isSelected={selectedPlan === plan.name}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: '#666' }}>
              Loading membership plans...
            </Typography>
          </Box>
        )}

        {/* Features Comparison */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            What's Included in Every Plan?
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Basic Access
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Full access to all gym equipment and facilities
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Professional Guidance
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Access to fitness assessments and guidance from certified trainers
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Member Community
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Join a supportive community of fitness enthusiasts
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Flexible Scheduling
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Train at your own pace with flexible membership terms
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Progress Tracking
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Monitor your fitness progress with our membership dashboard
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  borderLeft: '4px solid #FF6B35',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✓ Member Support
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  24/7 customer support for all membership inquiries
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Q: Can I change my membership plan?
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  A: Yes, you can upgrade or downgrade your membership plan at any time. Changes
                  will be reflected in your next billing cycle.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Q: Is there a cancellation fee?
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  A: No, there are no cancellation fees. You can cancel your membership anytime
                  with 7 days notice.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Q: Do you offer trial memberships?
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  A: Yes, we offer a 7-day free trial for new members. Visit us in-person or sign
                  up online to get started.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicLayout>
  );
}
