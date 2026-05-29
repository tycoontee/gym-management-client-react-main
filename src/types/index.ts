// User and Authentication Types
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  name: string;
}

// Member Profile Types
export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  membershipPlan: 'Basic' | 'Standard' | 'Premium';
  joinDate: string;
  status: 'active' | 'expired' | 'pending';
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Membership Plan Types
export interface MembershipPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number; // in Naira
  duration: number; // in months
  features: string[];
  description: string;
}

// Payment Types
export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  plan: 'Basic' | 'Standard' | 'Premium';
  status: 'paid' | 'pending' | 'overdue';
  transactionId?: string;
}

// Instructor Types
export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: 'Weightlifting' | 'Yoga' | 'Cardio' | 'Boxing' | 'CrossFit' | 'Pilates';
  bio: string;
  photoUrl: string;
  experience: number; // years
}

// Session Types
export interface Session {
  user: User;
  loginTime: string;
}
