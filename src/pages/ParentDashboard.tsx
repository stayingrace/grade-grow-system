
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockAnnouncements, mockChatGroups, mockEvents } from '@/data/mockData';
import { BookOpen, Calendar, MessageCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

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

const ParentDashboard = () => {
  const { user } = useAuth();
  const parentUser = user as any; // Type assertion for demo purposes
  
  const navigationItems = [
    { title: 'Dashboard', url: '/parent-dashboard', icon: User },
    { title: 'Announcements', url: '#', icon: BookOpen },
    { title: 'Events', url: '#', icon: Calendar },
    { title: 'PTA Chat', url: '#', icon: MessageCircle },
  ];

  // Get child information
  const children = parentUser?.children ? 
    mockStudents.filter(student => parentUser.children.includes(student.id)) : 
    [];

  // Get PTA chat groups
  const ptaChats = mockChatGroups.filter(chat => chat.type === 'pta');

  // Get school announcements - parents see all announcements
  const schoolAnnouncements = mockAnnouncements;

  // Get upcoming events
  const upcomingEvents = mockEvents.filter(
    event => new Date(event.startDate) >= new Date()
  ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <MainLayout 
      role="parent" 
      navigationItems={navigationItems}
      userName={user?.name || 'Parent'}
      userRole="Parent"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Children"
            value={`${children.length}`}
            description="Your children at this school"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Announcements"
            value={`${schoolAnnouncements.length}`}
            description="School announcements"
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Upcoming Events"
            value={`${upcomingEvents.length}`}
            description="School events"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="PTA Chat Groups"
            value={`${ptaChats.length}`}
            description="Parent-teacher chats"
            icon={<MessageCircle className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Children</CardTitle>
              <CardDescription>
                Monitor progress and attendance of your children
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {children.map(child => (
                  <div key={child.id} className="bg-muted/40 p-4 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center text-lg font-bold">
                          {child.name.charAt(0)}
                        </div>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {child.studentId} • Class: {child.grade} • Dept: {child.department}
                        </p>
                      </div>
                      <Button className="ml-auto" variant="outline" size="sm">View Details</Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Attendance Rate</span>
                          <span>{Math.round((child.attendance.present / 
                            (child.attendance.present + child.attendance.absent + child.attendance.late)) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((child.attendance.present / 
                          (child.attendance.present + child.attendance.absent + child.attendance.late)) * 100)} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fee Payment</span>
                          <span className={child.fees.tuition.paid ? 'text-green-600' : 'text-red-600'}>
                            {child.fees.tuition.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                        <Progress value={child.fees.tuition.paid ? 100 : 0} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="announcements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="pta">PTA Chat Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>School Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolAnnouncements.map(announcement => (
                    <div key={announcement.id} className="bg-secondary p-4 rounded-lg hover-scale">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        {announcement.department && (
                          <Badge variant="outline">{announcement.department}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Posted on {new Date(announcement.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming School Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map(event => (
                      <div key={event.id} className="bg-secondary p-4 rounded-lg hover-scale">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="outline">
                            {new Date(event.startDate).toLocaleDateString()}
                          </Badge>
                        </div>
                        {event.location && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Location: {event.location}
                          </p>
                        )}
                        <p className="mt-2">{event.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">No upcoming events scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pta">
            <Card>
              <CardHeader>
                <CardTitle>PTA Chat Groups</CardTitle>
                <CardDescription>
                  Parent-teacher association discussion groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ptaChats.map(chat => (
                    <div key={chat.id} className="bg-secondary p-4 rounded-lg hover-scale">
                      <h3 className="font-semibold flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {chat.name}
                      </h3>
                      {chat.lastMessage && (
                        <div className="mt-2 p-3 bg-white/50 rounded-md">
                          <p className="text-sm">{chat.lastMessage.content}</p>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>{chat.lastMessage.sender}</span>
                            <span>{new Date(chat.lastMessage.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end mt-3">
                        <Button>Join Chat</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ParentDashboard;
