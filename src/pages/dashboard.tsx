import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context';
import { membersStorage, paymentsStorage } from '@/utils/storage';
import { Member, Payment } from '@/types';
import { format } from 'date-fns';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [recentPayments, setRecentPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load member data
    if (user) {
      const memberData = membersStorage.findByUserId(user.id);
      setMember(memberData || null);

      if (memberData) {
        const payments = paymentsStorage.getByMemberId(memberData.id);
        setRecentPayments(payments.slice(0, 5));
      }
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome Back, {user?.name}!
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Here's an overview of your fitness membership and activity
        </Typography>
      </Box>

      {/* Membership Status Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {member ? (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Membership Plan
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                    {member.membershipPlan}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip
                    label={member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    color={getStatusColor(member.status) as any}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Join Date
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {format(new Date(member.joinDate), 'MMM dd, yyyy')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 2, backgroundColor: '#f5f5f5' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>
                    Member ID
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                    {member.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 2, p: 3 }}>
              <Typography variant="body1" sx={{ color: '#666' }}>
                No membership found. Please complete your profile.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#FF6B35' }}
                onClick={() => navigate({ to: '/profile' })}
              >
                Complete Profile
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#FF6B35', py: 2 }}
            onClick={() => navigate({ to: '/payment' })}
          >
            Make Payment
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ borderColor: '#FF6B35', color: '#FF6B35', py: 2 }}
            onClick={() => navigate({ to: '/payment-history' })}
          >
            Payment History
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ borderColor: '#FF6B35', color: '#FF6B35', py: 2 }}
            onClick={() => navigate({ to: '/profile' })}
          >
            View Profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ borderColor: '#FF6B35', color: '#FF6B35', py: 2 }}
            onClick={() => navigate({ to: '/settings' })}
          >
            Settings
          </Button>
        </Grid>
      </Grid>

      {/* Recent Payments */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Recent Payments
            </Typography>
            <Button
              size="small"
              onClick={() => navigate({ to: '/payment-history' })}
              sx={{ color: '#FF6B35' }}
            >
              View All
            </Button>
          </Stack>

          {recentPayments.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                    <TableCell>Date</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {format(new Date(payment.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell align="right">
                        <strong>₦{payment.amount.toLocaleString()}</strong>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          color={getPaymentStatusColor(payment.status) as any}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" sx={{ color: '#999', textAlign: 'center', py: 3 }}>
              No payments yet
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
