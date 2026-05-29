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
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from '@mui/material';
import { Member } from '@/types';
import { membersStorage } from '@/utils/storage';
import { format } from 'date-fns';
import { Edit } from '@mui/icons-material';

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    const allMembers = membersStorage.getAll();
    setMembers(allMembers);
  };

  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.email.toLowerCase().includes(term) ||
          m.phone.includes(term),
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, statusFilter]);

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

  const handleOpenDetails = (member: Member) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMember(null);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      membersStorage.delete(memberId);
      loadMembers();
      handleCloseDialog();
    }
  };

  const handleUpdateMember = () => {
    if (editingMember && selectedMember) {
      membersStorage.update(selectedMember.id, editingMember);
      loadMembers();
      setSelectedMember(editingMember);
      setEditingMember(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Members Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Manage and view all gym members
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF6B35' }}>
                {members.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Active Members
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
                {members.filter((m) => m.status === 'active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Expired Members
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'red' }}>
                {members.filter((m) => m.status === 'expired').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                Pending Members
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'orange' }}>
                {members.filter((m) => m.status === 'pending').length}
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
              placeholder="Search by name, email, or phone..."
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card sx={{ boxShadow: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {member.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.membershipPlan}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        color={getStatusColor(member.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{format(new Date(member.joinDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleOpenDetails(member)}
                        sx={{ color: '#FF6B35' }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: '#999' }}>
                      {members.length === 0
                        ? 'No members found'
                        : 'No members matching your filters'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Member Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMember ? 'Edit Member' : 'Member Details'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedMember && (
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                value={editingMember?.name || selectedMember.name}
                onChange={(e) =>
                  setEditingMember({
                    ...(editingMember || selectedMember),
                    name: e.target.value,
                  })
                }
                disabled={!editingMember}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editingMember?.email || selectedMember.email}
                onChange={(e) =>
                  setEditingMember({
                    ...(editingMember || selectedMember),
                    email: e.target.value,
                  })
                }
                disabled={!editingMember}
              />
              <TextField
                fullWidth
                label="Phone"
                value={editingMember?.phone || selectedMember.phone}
                onChange={(e) =>
                  setEditingMember({
                    ...(editingMember || selectedMember),
                    phone: e.target.value,
                  })
                }
                disabled={!editingMember}
              />
              <TextField
                fullWidth
                select
                label="Status"
                value={editingMember?.status || selectedMember.status}
                onChange={(e) =>
                  setEditingMember({
                    ...(editingMember || selectedMember),
                    status: e.target.value as any,
                  })
                }
                disabled={!editingMember}
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </TextField>
              <TextField
                fullWidth
                select
                label="Membership Plan"
                value={editingMember?.membershipPlan || selectedMember.membershipPlan}
                onChange={(e) =>
                  setEditingMember({
                    ...(editingMember || selectedMember),
                    membershipPlan: e.target.value as any,
                  })
                }
                disabled={!editingMember}
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {editingMember ? (
            <>
              <Button onClick={() => setEditingMember(null)}>Cancel</Button>
              <Button onClick={handleUpdateMember} variant="contained" sx={{ backgroundColor: '#FF6B35' }}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleDeleteMember(selectedMember!.id)}
                color="error"
                variant="outlined"
              >
                Delete
              </Button>
              <Button onClick={() => setEditingMember(selectedMember)}>Edit</Button>
              <Button onClick={handleCloseDialog}>Close</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}
