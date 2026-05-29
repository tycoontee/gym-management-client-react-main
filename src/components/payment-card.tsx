import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  CardActions,
} from '@mui/material';
import { Payment } from '@/types';
import { format } from 'date-fns';

interface PaymentCardProps {
  payment: Payment;
  onDetails?: (payment: Payment) => void;
}

export function PaymentCard({ payment, onDetails }: PaymentCardProps) {
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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ₦{payment.amount.toLocaleString()}
          </Typography>
          <Chip
            label={getStatusLabel(payment.status)}
            color={getStatusColor(payment.status) as any}
            size="small"
          />
        </Stack>

        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
          {payment.memberName}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', color: '#999', mb: 1 }}>
          📅 {format(new Date(payment.date), 'MMM dd, yyyy')}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', color: '#999', mb: 1 }}>
          📋 Plan: {payment.plan}
        </Typography>

        {payment.transactionId && (
          <Typography variant="caption" sx={{ display: 'block', color: '#999' }}>
            ID: {payment.transactionId}
          </Typography>
        )}
      </CardContent>

      {onDetails && (
        <CardActions>
          <Button
            size="small"
            onClick={() => onDetails(payment)}
            sx={{ color: '#FF6B35' }}
          >
            View Details
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
