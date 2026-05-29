import {
  User,
  Member,
  Payment,
  Instructor,
  MembershipPlan,
} from '@/types';
import {
  usersStorage,
  membersStorage,
  paymentsStorage,
  instructorsStorage,
  membershipPlansStorage,
  STORAGE_KEYS,
} from '@/utils/storage';

// Membership Plans
const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 5000,
    duration: 1,
    features: ['Gym Access', 'Locker Room', 'Basic Equipment'],
    description: 'Perfect for beginners - Access to gym and basic facilities',
  },
  {
    id: '2',
    name: 'Standard',
    price: 10000,
    duration: 1,
    features: [
      'Gym Access',
      'Personal Training (2x/month)',
      'Locker Room',
      'All Equipment',
      'Group Classes',
    ],
    description:
      'Most Popular - Includes personal training and group classes',
  },
  {
    id: '3',
    name: 'Premium',
    price: 20000,
    duration: 1,
    features: [
      'Gym Access 24/7',
      'Unlimited Personal Training',
      'Private Locker',
      'All Equipment',
      'All Group Classes',
      'Nutrition Consultation',
      'Priority Support',
    ],
    description:
      'Elite - Full access with personal training and nutrition support',
  },
];

// Sample Users
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    email: 'admin@gym.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'member',
  },
  {
    id: '3',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'member',
  },
  {
    id: '4',
    email: 'michael@example.com',
    password: 'password123',
    name: 'Michael Johnson',
    role: 'member',
  },
  {
    id: '5',
    email: 'sarah@example.com',
    password: 'password123',
    name: 'Sarah Williams',
    role: 'member',
  },
  {
    id: '6',
    email: 'robert@example.com',
    password: 'password123',
    name: 'Robert Brown',
    role: 'member',
  },
];

// Sample Members
const SAMPLE_MEMBERS: Member[] = [
  {
    id: 'm1',
    userId: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '08012345678',
    membershipPlan: 'Premium',
    joinDate: '2024-01-15',
    status: 'active',
    dateOfBirth: '1990-05-20',
    address: '123 Main St',
    city: 'Lagos',
    state: 'Lagos',
    zipCode: '100001',
  },
  {
    id: 'm2',
    userId: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '08087654321',
    membershipPlan: 'Standard',
    joinDate: '2024-02-10',
    status: 'active',
    dateOfBirth: '1992-08-15',
    address: '456 Oak Ave',
    city: 'Lagos',
    state: 'Lagos',
    zipCode: '100002',
  },
  {
    id: 'm3',
    userId: '4',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '08056789012',
    membershipPlan: 'Basic',
    joinDate: '2023-12-01',
    status: 'expired',
    dateOfBirth: '1988-03-10',
    address: '789 Pine Rd',
    city: 'Abuja',
    state: 'FCT',
    zipCode: '900001',
  },
  {
    id: 'm4',
    userId: '5',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '08145678901',
    membershipPlan: 'Premium',
    joinDate: '2024-03-05',
    status: 'active',
    dateOfBirth: '1995-11-22',
    address: '321 Elm St',
    city: 'Portharcourt',
    state: 'Rivers',
    zipCode: '500001',
  },
  {
    id: 'm5',
    userId: '6',
    name: 'Robert Brown',
    email: 'robert@example.com',
    phone: '08234567890',
    membershipPlan: 'Standard',
    joinDate: '2024-04-12',
    status: 'pending',
    dateOfBirth: '1991-07-18',
    address: '654 Maple Dr',
    city: 'Kano',
    state: 'Kano',
    zipCode: '700001',
  },
];

// Sample Payments
const SAMPLE_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    memberId: 'm1',
    memberName: 'John Doe',
    amount: 20000,
    date: '2024-05-01',
    plan: 'Premium',
    status: 'paid',
    transactionId: 'TRX001',
  },
  {
    id: 'p2',
    memberId: 'm2',
    memberName: 'Jane Smith',
    amount: 10000,
    date: '2024-05-05',
    plan: 'Standard',
    status: 'paid',
    transactionId: 'TRX002',
  },
  {
    id: 'p3',
    memberId: 'm1',
    memberName: 'John Doe',
    amount: 20000,
    date: '2024-04-01',
    plan: 'Premium',
    status: 'paid',
    transactionId: 'TRX003',
  },
  {
    id: 'p4',
    memberId: 'm3',
    memberName: 'Michael Johnson',
    amount: 5000,
    date: '2024-03-01',
    plan: 'Basic',
    status: 'overdue',
    transactionId: 'TRX004',
  },
  {
    id: 'p5',
    memberId: 'm4',
    memberName: 'Sarah Williams',
    amount: 20000,
    date: '2024-05-10',
    plan: 'Premium',
    status: 'paid',
    transactionId: 'TRX005',
  },
  {
    id: 'p6',
    memberId: 'm5',
    memberName: 'Robert Brown',
    amount: 10000,
    date: '2024-05-15',
    plan: 'Standard',
    status: 'pending',
    transactionId: 'TRX006',
  },
  {
    id: 'p7',
    memberId: 'm2',
    memberName: 'Jane Smith',
    amount: 10000,
    date: '2024-04-05',
    plan: 'Standard',
    status: 'paid',
    transactionId: 'TRX007',
  },
  {
    id: 'p8',
    memberId: 'm4',
    memberName: 'Sarah Williams',
    amount: 20000,
    date: '2024-04-10',
    plan: 'Premium',
    status: 'paid',
    transactionId: 'TRX008',
  },
];

// Sample Instructors
const SAMPLE_INSTRUCTORS: Instructor[] = [
  {
    id: 'i1',
    name: 'Akinbola Tobiloba',
    email: 'tobi@gym.com',
    phone: '08012345600',
    specialization: 'Weightlifting',
    bio: 'Certified personal trainer with 8 years of experience in strength training and bodybuilding.',
    photoUrl: '/instructor-photos/wl.jpg',
    experience: 8,
  },
  {
    id: 'i2',
    name: 'Ayansiji Eniola',
    email: 'eniola@gym.com',
    phone: '08012345601',
    specialization: 'Yoga',
    bio: 'Yoga instructor with a passion for mindfulness and wellness. Certified in Hatha and Vinyasa yoga.',
    photoUrl: '/instructor-photos/yoga.jpg',
    experience: 6,
  },
  {
    id: 'i3',
    name: 'Isikaye Rhoda',
    email: 'rhoda@gym.com',
    phone: '08012345602',
    specialization: 'Cardio',
    bio: 'Marathon runner and cardio specialist. Helps members achieve their fitness goals through tailored cardio programs.',
    photoUrl: '/instructor-photos/cardio.jpg',
    experience: 7,
  },
  {
    id: 'i4',
    name: 'Ejumabone Oreoluwa',
    email: 'oreoluwa@gym.com',
    phone: '08012345603',
    specialization: 'Boxing',
    bio: 'Professional boxer and boxing coach. Trained in amateur and professional boxing with 10+ years experience.',
    photoUrl: '/instructor-photos/boxer.jpg',
    experience: 10,
  },
  {
    id: 'i5',
    name: 'Adesina Mohammed',
    email: 'mohammed@gym.com',
    phone: '08012345604',
    specialization: 'CrossFit',
    bio: 'CrossFit Level 2 certified coach. Specializes in functional fitness and high-intensity training.',
    photoUrl: '/instructor-photos/crossfit.jpg',
    experience: 5,
  },
  {
    id: 'i6',
    name: 'Ogungbade Peculiar',
    email: 'peculiar@gym.com',
    phone: '08012345605',
    specialization: 'Pilates',
    bio: 'Pilates instructor with expertise in core strengthening and body conditioning.',
    photoUrl: '/instructor-photos/pilates.jpg',
    experience: 4,
  },
];

/**
 * Initialize sample data in LocalStorage if not already present
 */
export function initializeSampleData(): void {
  // Check if data already exists
  if (localStorage.getItem(STORAGE_KEYS.USERS)) {
    return; // Data already initialized
  }

  // Initialize users
  usersStorage.save(SAMPLE_USERS);

  // Initialize members
  membersStorage.save(SAMPLE_MEMBERS);

  // Initialize payments
  paymentsStorage.save(SAMPLE_PAYMENTS);

  // Initialize instructors
  instructorsStorage.save(SAMPLE_INSTRUCTORS);

  // Initialize membership plans
  membershipPlansStorage.save(MEMBERSHIP_PLANS);

  console.log('Sample data initialized successfully');
}
