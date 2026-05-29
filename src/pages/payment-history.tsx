import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Stack,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material';
import { useAuth } from '@/context';
import { Payment } from '@/types';
import { membersStorage, paymentsStorage } from '@/utils/storage';
import { format } from 'date-fns';

export function PaymentHistoryPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    if (user) {
      const memberData = membersStorage.findByUserId(user.id);
      if (memberData) {
        const memberPayments = paymentsStorage.getByMemberId(memberData.id);
        setPayments(memberPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        const total = memberPayments.reduce((sum, p) => sum + p.amount, 0);
        const paid = memberPayments
          .filter((p) => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0);

        setTotalAmount(total);
        setTotalPaid(paid);
      }
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.id.toLowerCase().includes(term) ||
          p.plan.toLowerCase().includes(term),
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Payment History
        </Typography>
        <Divider />
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Payments
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                {payments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ₦{totalAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Paid
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
                ₦{totalPaid.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Outstanding
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: totalAmount - totalPaid > 0 ? 'red' : 'green' }}
              >
                ₦{(totalAmount - totalPaid).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ boxShadow: 2, mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              placeholder="Search by transaction ID or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: { xs: '100%', sm: 200 } }}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card sx={{ boxShadow: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {payment.transactionId || payment.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ₦{payment.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(payment.status)}
                        color={getStatusColor(payment.status) as any}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: '#999' }}>
                      {payments.length === 0
                        ? 'No payment history yet'
                        : 'No payments matching your filters'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Payment Status Legend */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Payment Status Legend
        </Typography>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip label="Paid" color="success" size="small" />
            <Typography variant="body2" sx={{ color: '#666' }}>
              Payment has been successfully processed
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip label="Pending" color="warning" size="small" />
            <Typography variant="body2" sx={{ color: '#666' }}>
              Payment is awaiting processing
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip label="Overdue" color="error" size="small" />
            <Typography variant="body2" sx={{ color: '#666' }}>
              Payment is overdue - please make payment
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
