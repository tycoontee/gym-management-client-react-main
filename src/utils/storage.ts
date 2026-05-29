import {
  User,
  Member,
  Payment,
  Instructor,
  MembershipPlan,
  Session,
} from '@/types';

// LocalStorage Keys
export const STORAGE_KEYS = {
  USERS: 'gymUsers',
  MEMBERS: 'gymMembers',
  PAYMENTS: 'gymPayments',
  SESSION: 'gymSession',
  INSTRUCTORS: 'gymInstructors',
  MEMBERSHIP_PLANS: 'gymMembershipPlans',
};

// Users Management
export const usersStorage = {
  getAll: (): User[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  save: (users: User[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  },

  add: (user: User): void => {
    const users = usersStorage.getAll();
    users.push(user);
    usersStorage.save(users);
  },

  update: (userId: string, updates: Partial<User>): void => {
    const users = usersStorage.getAll();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      usersStorage.save(users);
    }
  },

  findByEmail: (email: string): User | undefined => {
    return usersStorage.getAll().find((u) => u.email === email);
  },

  authenticate: (email: string, password: string): User | null => {
    const user = usersStorage.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  },
};

// Members Management
export const membersStorage = {
  getAll: (): Member[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting members:', error);
      return [];
    }
  },

  save: (members: Member[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch (error) {
      console.error('Error saving members:', error);
    }
  },

  add: (member: Member): void => {
    const members = membersStorage.getAll();
    members.push(member);
    membersStorage.save(members);
  },

  findById: (id: string): Member | undefined => {
    return membersStorage.getAll().find((m) => m.id === id);
  },

  findByUserId: (userId: string): Member | undefined => {
    return membersStorage.getAll().find((m) => m.userId === userId);
  },

  update: (memberId: string, updates: Partial<Member>): void => {
    const members = membersStorage.getAll();
    const index = members.findIndex((m) => m.id === memberId);
    if (index !== -1) {
      members[index] = { ...members[index], ...updates };
      membersStorage.save(members);
    }
  },

  delete: (memberId: string): void => {
    const members = membersStorage.getAll();
    const filtered = members.filter((m) => m.id !== memberId);
    membersStorage.save(filtered);
  },

  search: (query: string): Member[] => {
    const lowerQuery = query.toLowerCase();
    return membersStorage
      .getAll()
      .filter(
        (m) =>
          m.name.toLowerCase().includes(lowerQuery) ||
          m.email.toLowerCase().includes(lowerQuery) ||
          m.phone.includes(query),
      );
  },
};

// Payments Management
export const paymentsStorage = {
  getAll: (): Payment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting payments:', error);
      return [];
    }
  },

  save: (payments: Payment[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    } catch (error) {
      console.error('Error saving payments:', error);
    }
  },

  add: (payment: Payment): void => {
    const payments = paymentsStorage.getAll();
    payments.push(payment);
    paymentsStorage.save(payments);
  },

  getByMemberId: (memberId: string): Payment[] => {
    return paymentsStorage.getAll().filter((p) => p.memberId === memberId);
  },

  update: (paymentId: string, updates: Partial<Payment>): void => {
    const payments = paymentsStorage.getAll();
    const index = payments.findIndex((p) => p.id === paymentId);
    if (index !== -1) {
      payments[index] = { ...payments[index], ...updates };
      paymentsStorage.save(payments);
    }
  },

  getTotalRevenue: (): number => {
    return paymentsStorage
      .getAll()
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);
  },

  getRecentPayments: (limit: number = 5): Payment[] => {
    return paymentsStorage
      .getAll()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      .slice(0, limit);
  },
};

// Instructors Management
export const instructorsStorage = {
  getAll: (): Instructor[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting instructors:', error);
      return [];
    }
  },

  save: (instructors: Instructor[]): void => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.INSTRUCTORS,
        JSON.stringify(instructors),
      );
    } catch (error) {
      console.error('Error saving instructors:', error);
    }
  },

  add: (instructor: Instructor): void => {
    const instructors = instructorsStorage.getAll();
    instructors.push(instructor);
    instructorsStorage.save(instructors);
  },

  findById: (id: string): Instructor | undefined => {
    return instructorsStorage.getAll().find((i) => i.id === id);
  },

  getBySpecialization: (
    specialization: Instructor['specialization'],
  ): Instructor[] => {
    return instructorsStorage
      .getAll()
      .filter((i) => i.specialization === specialization);
  },
};

// Membership Plans Management
export const membershipPlansStorage = {
  getAll: (): MembershipPlan[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP_PLANS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting membership plans:', error);
      return [];
    }
  },

  save: (plans: MembershipPlan[]): void => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.MEMBERSHIP_PLANS,
        JSON.stringify(plans),
      );
    } catch (error) {
      console.error('Error saving membership plans:', error);
    }
  },

  getByName: (name: string): MembershipPlan | undefined => {
    return membershipPlansStorage
      .getAll()
      .find((p) => p.name === name);
  },
};

// Session Management
export const sessionStorage = {
  save: (session: Session): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  },

  get: (): Session | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },

  getCurrentUser: (): User | null => {
    const session = sessionStorage.get();
    return session ? session.user : null;
  },
};
