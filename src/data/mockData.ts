
import { Student, Teacher, Admin, Parent, Announcement, ClassSession, Assignment, ChatGroup, Event } from "../types";

// Create mock data for development
export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@school.edu",
    role: "student",
    studentId: "STU-001",
    grade: "10A",
    department: "Science",
    attendance: {
      present: 42,
      absent: 3,
      late: 5,
    },
    fees: {
      tuition: {
        amount: 5000,
        paid: true,
      },
      other: {
        amount: 500,
        paid: false,
      },
    },
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@school.edu",
    role: "student",
    studentId: "STU-002",
    grade: "10B",
    department: "Arts",
    attendance: {
      present: 39,
      absent: 5,
      late: 6,
    },
    fees: {
      tuition: {
        amount: 5000,
        paid: false,
      },
      other: {
        amount: 500,
        paid: false,
      },
    },
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: "3",
    name: "Dr. Michael Brown",
    email: "michael@school.edu",
    role: "teacher",
    teacherId: "TCH-001",
    subjects: ["Mathematics", "Physics"],
    departments: ["Science"],
    classes: ["10A", "10B", "11A"],
  },
  {
    id: "4",
    name: "Mrs. Emma Davis",
    email: "emma@school.edu",
    role: "teacher",
    teacherId: "TCH-002",
    subjects: ["Literature", "History"],
    departments: ["Arts"],
    classes: ["10B", "11B", "12B"],
  },
];

export const mockAdmins: Admin[] = [
  {
    id: "5",
    name: "Principal Wilson",
    email: "principal@school.edu",
    role: "admin",
    adminId: "ADM-001",
    position: "Principal",
  },
  {
    id: "6",
    name: "Vice Principal Thomas",
    email: "vprincipal@school.edu",
    role: "admin",
    adminId: "ADM-002",
    position: "Vice Principal",
  },
];

export const mockParents: Parent[] = [
  {
    id: "7",
    name: "Mr. Robert Johnson",
    email: "robert@example.com",
    role: "parent",
    parentId: "PAR-001",
    children: ["1"], // Alex's parent
    contact: {
      phone: "123-456-7890",
      address: "123 Main St, City",
    },
  },
  {
    id: "8",
    name: "Mrs. Patricia Williams",
    email: "patricia@example.com",
    role: "parent",
    parentId: "PAR-002",
    children: ["2"], // Sarah's parent
    contact: {
      phone: "234-567-8901",
      address: "456 Oak St, City",
    },
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "End of Term Examinations",
    content: "End of term examinations will begin on Monday, June 10th. Please prepare accordingly and check the detailed schedule on the notice board.",
    createdAt: "2024-05-01T10:00:00Z",
    createdBy: "5", // Principal Wilson
  },
  {
    id: "2",
    title: "Science Fair Registration",
    content: "Registration for the Annual Science Fair is now open. Interested students should submit their project proposals by May 15th.",
    department: "Science",
    createdAt: "2024-05-02T14:30:00Z",
    createdBy: "3", // Dr. Michael Brown
  },
  {
    id: "3",
    title: "Arts Exhibition",
    content: "The department is organizing an arts exhibition on May 20th. All students are encouraged to submit their artwork for display.",
    department: "Arts",
    createdAt: "2024-05-03T09:15:00Z",
    createdBy: "4", // Mrs. Emma Davis
  },
];

export const mockClassSessions: ClassSession[] = [
  {
    id: "1",
    subject: "Mathematics",
    teacher: "Dr. Michael Brown",
    room: "Room 101",
    day: "Monday",
    startTime: "08:00",
    endTime: "09:30",
  },
  {
    id: "2",
    subject: "Physics",
    teacher: "Dr. Michael Brown",
    room: "Lab 3",
    day: "Monday",
    startTime: "10:00",
    endTime: "11:30",
  },
  {
    id: "3",
    subject: "Literature",
    teacher: "Mrs. Emma Davis",
    room: "Room 205",
    day: "Tuesday",
    startTime: "08:00",
    endTime: "09:30",
  },
  {
    id: "4",
    subject: "History",
    teacher: "Mrs. Emma Davis",
    room: "Room 202",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "11:30",
  },
  {
    id: "5",
    subject: "Mathematics",
    teacher: "Dr. Michael Brown",
    room: "Room 101",
    day: "Wednesday",
    startTime: "08:00",
    endTime: "09:30",
  },
  {
    id: "6",
    subject: "Literature",
    teacher: "Mrs. Emma Davis",
    room: "Room 205",
    day: "Thursday",
    startTime: "08:00",
    endTime: "09:30",
  },
  {
    id: "7",
    subject: "Physics",
    teacher: "Dr. Michael Brown",
    room: "Lab 3",
    day: "Friday",
    startTime: "10:00",
    endTime: "11:30",
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Calculus Problem Set",
    description: "Complete problems 1-20 from Chapter 4",
    dueDate: "2024-05-15",
    subject: "Mathematics",
    teacher: "Dr. Michael Brown",
  },
  {
    id: "2",
    title: "Physics Lab Report",
    description: "Write a report on the pendulum experiment conducted in class",
    dueDate: "2024-05-18",
    subject: "Physics",
    teacher: "Dr. Michael Brown",
  },
  {
    id: "3",
    title: "Book Review",
    description: "Write a 1000-word review of 'To Kill a Mockingbird'",
    dueDate: "2024-05-20",
    subject: "Literature",
    teacher: "Mrs. Emma Davis",
  },
  {
    id: "4",
    title: "Historical Essay",
    description: "Research and write an essay on a significant event from World War II",
    dueDate: "2024-05-25",
    subject: "History",
    teacher: "Mrs. Emma Davis",
  },
];

export const mockChatGroups: ChatGroup[] = [
  {
    id: "1",
    name: "10A Class Group",
    type: "class",
    participants: ["1", "3"], // Alex and Dr. Brown
    lastMessage: {
      content: "When is the math homework due?",
      sender: "Alex Johnson",
      timestamp: "2024-05-04T15:30:00Z",
    },
  },
  {
    id: "2",
    name: "10B Class Group",
    type: "class",
    participants: ["2", "4"], // Sarah and Mrs. Davis
    lastMessage: {
      content: "Don't forget to bring your textbooks tomorrow",
      sender: "Mrs. Emma Davis",
      timestamp: "2024-05-04T16:45:00Z",
    },
  },
  {
    id: "3",
    name: "Science Department",
    type: "department",
    participants: ["1", "3"], // Alex and Dr. Brown
    lastMessage: {
      content: "Science fair registration deadline is approaching",
      sender: "Dr. Michael Brown",
      timestamp: "2024-05-03T14:20:00Z",
    },
  },
  {
    id: "4",
    name: "PTA Group",
    type: "pta",
    participants: ["3", "4", "5", "6", "7", "8"], // Teachers, admins, and parents
    lastMessage: {
      content: "Next PTA meeting is scheduled for May 15th",
      sender: "Principal Wilson",
      timestamp: "2024-05-02T10:15:00Z",
    },
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "End of Term Examinations",
    description: "Final exams for all subjects",
    startDate: "2024-06-10",
    endDate: "2024-06-20",
    organizer: "5", // Principal Wilson
  },
  {
    id: "2",
    title: "Science Fair",
    description: "Annual school science fair",
    startDate: "2024-05-25",
    endDate: "2024-05-25",
    location: "School Auditorium",
    organizer: "3", // Dr. Michael Brown
  },
  {
    id: "3",
    title: "Arts Exhibition",
    description: "Display of student artwork",
    startDate: "2024-05-20",
    endDate: "2024-05-22",
    location: "School Gallery",
    organizer: "4", // Mrs. Emma Davis
  },
  {
    id: "4",
    title: "PTA Meeting",
    description: "Monthly parent-teacher association meeting",
    startDate: "2024-05-15T18:00:00",
    endDate: "2024-05-15T20:00:00",
    location: "Conference Room",
    organizer: "5", // Principal Wilson
  },
];

// Helper to get user by role and id
export const getUserByRole = (role: string, userId: string) => {
  switch (role) {
    case "student":
      return mockStudents.find(student => student.id === userId);
    case "teacher":
      return mockTeachers.find(teacher => teacher.id === userId);
    case "admin":
      return mockAdmins.find(admin => admin.id === userId);
    case "parent":
      return mockParents.find(parent => parent.id === userId);
    default:
      return null;
  }
};

// Current user for demo purposes (can be changed to any user from the mock data)
export const currentUser = mockStudents[0];
