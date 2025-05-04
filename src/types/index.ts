
export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  studentId: string;
  grade: string;
  department: string;
  parentId?: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  fees: {
    tuition: {
      amount: number;
      paid: boolean;
    };
    other: {
      amount: number;
      paid: boolean;
    };
  };
}

export interface Teacher extends User {
  teacherId: string;
  subjects: string[];
  departments: string[];
  classes: string[];
}

export interface Admin extends User {
  adminId: string;
  position: string;
}

export interface Parent extends User {
  parentId: string;
  children: string[]; // Student IDs
  contact: {
    phone: string;
    address: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  department?: string;
  createdAt: string;
  createdBy: string;
}

export interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  teacher: string;
  attachments?: string[];
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  feedback?: string;
  date: string;
}

export interface Message {
  id: string;
  sender: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  chatId: string;
  attachments?: string[];
}

export interface ChatGroup {
  id: string;
  name: string;
  type: 'class' | 'department' | 'pta';
  participants: string[];
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: string;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  organizer: string;
}
