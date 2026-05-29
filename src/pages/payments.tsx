import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  MenuItem,
} from '@mui/material';
import { useAuth } from '@/context';
import { Member, MembershipPlan } from '@/types';
import { membersStorage, paymentsStorage, membershipPlansStorage } from '@/utils/storage';

export function PaymentPage() {
  const { user } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const memberData = membersStorage.findByUserId(user.id);
      setMember(memberData || null);
      if (memberData) {
        setSelectedPlan(memberData.membershipPlan);
      }
    }

    const membershipPlans = membershipPlansStorage.getAll();
    setPlans(membershipPlans);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((p) => p.name === selectedPlan);
      if (plan) {
        setAmount(plan.price.toString());
      }
    }
  }, [selectedPlan, plans]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedPlan) {
      newErrors.selectedPlan = 'Please select a membership plan';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardExpiry) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      newErrors.cardExpiry = 'Format: MM/YY';
    }

    if (!cardCVV) {
      newErrors.cardCVV = 'CVV is required';
    } else if (cardCVV.length !== 3) {
      newErrors.cardCVV = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm() || !member) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create payment record
      const payment = {
        id: `p${Date.now()}`,
        memberId: member.id,
        memberName: member.name,
        amount: Number(amount),
        date: new Date().toISOString().split('T')[0],
        plan: selectedPlan as 'Basic' | 'Standard' | 'Premium',
        status: 'paid' as const,
        transactionId: `TRX${Date.now()}`,
      };

      paymentsStorage.add(payment);

      setSuccess('Payment processed successfully! Thank you for your payment.');
      setCardNumber('');
      setCardExpiry('');
      setCardCVV('');

      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error(err);
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!member) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">Member profile not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Make a Payment
        </Typography>
        <Divider />
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Payment Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Payment Details
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Membership Plan"
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      disabled={isSubmitting}
                      error={!!errors.selectedPlan}
                      helperText={errors.selectedPlan}
                    >
                      {plans.map((plan) => (
                        <MenuItem key={plan.id} value={plan.name}>
                          {plan.name} - ₦{plan.price.toLocaleString()}/month
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Amount (₦)"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={isSubmitting}
                      error={!!errors.amount}
                      helperText={errors.amount}
                      InputProps={{ inputProps: { step: '0.01' } }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Card Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
                      }}
                      disabled={isSubmitting}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber || 'Enter 16-digit card number'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => {
                        setCardExpiry(e.target.value);
                        if (errors.cardExpiry) setErrors({ ...errors, cardExpiry: '' });
                      }}
                      disabled={isSubmitting}
                      error={!!errors.cardExpiry}
                      helperText={errors.cardExpiry}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      placeholder="123"
                      value={cardCVV}
                      onChange={(e) => {
                        setCardCVV(e.target.value);
                        if (errors.cardCVV) setErrors({ ...errors, cardCVV: '' });
                      }}
                      disabled={isSubmitting}
                      error={!!errors.cardCVV}
                      helperText={errors.cardCVV || '3-digit security code'}
                      type="password"
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ backgroundColor: '#FF6B35', flex: 1 }}
                  >
                    {isSubmitting ? <CircularProgress size={20} /> : 'Process Payment'}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 2, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Payment Summary
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Member Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Plan
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedPlan || 'Not selected'}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Amount to Pay
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                    ₦{Number(amount || 0).toLocaleString()}
                  </Typography>
                </Box>

                <Divider />

                <Alert severity="info">
                  This is a demo payment system. In production, this would integrate with a real
                  payment gateway like Stripe or Flutterwave.
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
