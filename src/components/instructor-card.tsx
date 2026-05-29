import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import { Instructor } from '@/types';

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia component="img" height="280" image={instructor.photoUrl} alt={instructor.name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {instructor.name}
        </Typography>
        <Chip
          label={instructor.specialization}
          color="primary"
          sx={{ mb: 2, backgroundColor: '#FF6B35', color: '#fff' }}
        />
        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          {instructor.bio}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ color: '#999' }}>
            📧 {instructor.email}
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            📞 {instructor.phone}
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            ⏱️ {instructor.experience} years experience
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
