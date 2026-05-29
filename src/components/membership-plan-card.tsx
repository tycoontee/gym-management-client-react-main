
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import { MembershipPlan } from '@/types';

interface MembershipPlanCardProps {
  plan: MembershipPlan;
  onSelect?: (plan: MembershipPlan) => void;
  isSelected?: boolean;
}

export function MembershipPlanCard({
  plan,
  onSelect,
  isSelected,
}: MembershipPlanCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isSelected ? 4 : 2,
        border: isSelected ? '3px solid #FF6B35' : '1px solid #ddd',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 2, color: '#FF6B35' }}
        >
          {plan.name}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            ₦{plan.price.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            per month
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          {plan.description}
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
          Features:
        </Typography>

        <List sx={{ p: 0 }}>
          {plan.features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <Check sx={{ color: '#FF6B35', fontSize: '1.2rem' }} />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant={isSelected ? 'contained' : 'outlined'}
          onClick={() => onSelect?.(plan)}
          sx={{
            backgroundColor: isSelected ? '#FF6B35' : 'transparent',
            color: isSelected ? '#fff' : '#FF6B35',
            borderColor: '#FF6B35',
            '&:hover': {
              backgroundColor: '#FF6B35',
              color: '#fff',
            },
          }}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
      </CardActions>
    </Card>
  );
}
