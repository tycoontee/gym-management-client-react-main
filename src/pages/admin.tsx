import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from '@mui/material';
import { membersStorage, paymentsStorage } from '@/utils/storage';
import { format } from 'date-fns';

export function AdminPage() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentSignups, setRecentSignups] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    // Load data
    const allMembers = membersStorage.getAll();

    setTotalMembers(allMembers.length);
    setActiveMembers(allMembers.filter((m) => m.status === 'active').length);
    setTotalRevenue(paymentsStorage.getTotalRevenue());

    // Recent signups (last 5)
    const recent = allMembers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()).slice(0, 5);
    setRecentSignups(recent);

    // Recent payments (last 5)
    const payments = paymentsStorage.getRecentPayments(5);
    setRecentPayments(payments);
  }, []);

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Overview of gym operations and statistics
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="inherit" sx={{ opacity: 0.8 }} gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {totalMembers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, backgroundColor: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="inherit" sx={{ opacity: 0.8 }} gutterBottom>
                Active Members
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {activeMembers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, backgroundColor: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="inherit" sx={{ opacity: 0.8 }} gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ₦{totalRevenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2, backgroundColor: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="inherit" sx={{ opacity: 0.8 }} gutterBottom>
                Membership Plans
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Signups */}
      <Card sx={{ boxShadow: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Recent Signups
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSignups.length > 0 ? (
                  recentSignups.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.membershipPlan}</TableCell>
                      <TableCell>{format(new Date(member.joinDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          color={getStatusColor(member.status) as any}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#999' }}>
                        No recent signups
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Recent Payments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell>Member</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPayments.length > 0 ? (
                  recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.memberName}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ₦{payment.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{format(new Date(payment.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          color={getPaymentStatusColor(payment.status) as any}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#999' }}>
                        No recent payments
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}
