
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockAnnouncements, mockAssignments, mockClassSessions } from '@/data/mockData';
import { Book, BookOpen, Calendar, MessageCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DashboardCard = ({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const studentUser = user as any; // Type assertion for demo

  const navigationItems = [
    { title: 'Dashboard', url: '/student-dashboard', icon: User },
    { title: 'Announcements', url: '#', icon: BookOpen },
    { title: 'Schedule', url: '#', icon: Calendar },
    { title: 'Chats', url: '#', icon: MessageCircle },
  ];

  // Filter announcements for this student's department
  const studentAnnouncements = mockAnnouncements.filter(
    announcement => !announcement.department || announcement.department === studentUser?.department
  );

  // Get today's classes
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayClasses = mockClassSessions.filter(session => session.day === today);

  return (
    <MainLayout 
      role="student" 
      navigationItems={navigationItems}
      userName={user?.name || 'Student'}
      userRole="Student"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Attendance Rate"
            value={`${Math.round((studentUser?.attendance?.present || 0) / 
              ((studentUser?.attendance?.present || 0) + 
              (studentUser?.attendance?.absent || 0) + 
              (studentUser?.attendance?.late || 0)) * 100)}%`}
            description="Your attendance this term"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Assignments"
            value={`${mockAssignments.length}`}
            description="Pending assignments"
            icon={<Book className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Announcements"
            value={`${studentAnnouncements.length}`}
            description="New announcements"
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Fee Status"
            value={studentUser?.fees?.tuition?.paid ? "Paid" : "Unpaid"}
            description="Tuition fees for this term"
            icon={<span className={`text-xs font-medium ${studentUser?.fees?.tuition?.paid ? 'text-green-500' : 'text-red-500'}`}>
              {studentUser?.fees?.tuition?.paid ? 'PAID' : 'DUE'}
            </span>}
          />
        </div>

        <Tabs defaultValue="announcements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4">
            <div className="grid gap-4">
              {studentAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="hover-scale">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{announcement.title}</CardTitle>
                      {announcement.department && (
                        <Badge variant="outline">{announcement.department}</Badge>
                      )}
                    </div>
                    <CardDescription>
                      Posted on {new Date(announcement.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            {todayClasses.length > 0 ? (
              <div className="grid gap-2">
                {todayClasses.map((session) => (
                  <Card key={session.id} className="hover-scale">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{session.subject}</h3>
                          <p className="text-sm text-muted-foreground">{session.teacher} • {session.room}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.startTime} - {session.endTime}</p>
                          <p className="text-sm text-muted-foreground">{session.day}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-2">No classes scheduled for today</p>
                  <Button variant="outline">View Full Schedule</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="assignments">
            <div className="grid gap-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject} • {assignment.teacher}</p>
                        <p className="mt-2">{assignment.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={new Date(assignment.dueDate) < new Date() ? "destructive" : "outline"}>
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">AI Assistance</Button>
                      <Button size="sm">Submit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Fee Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tuition Fee</span>
                  <span className={studentUser?.fees?.tuition?.paid ? 'text-green-500' : 'text-red-500'}>
                    {studentUser?.fees?.tuition?.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <Progress value={studentUser?.fees?.tuition?.paid ? 100 : 0} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Other Fees</span>
                  <span className={studentUser?.fees?.other?.paid ? 'text-green-500' : 'text-red-500'}>
                    {studentUser?.fees?.other?.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <Progress value={studentUser?.fees?.other?.paid ? 100 : 0} />
              </div>
              <Button className="w-full" disabled={studentUser?.fees?.tuition?.paid && studentUser?.fees?.other?.paid}>
                Make Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
