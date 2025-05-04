
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockAssignments, mockClassSessions } from '@/data/mockData';
import { BookOpen, Calculator, Calendar, MessageCircle, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

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

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const teacherUser = user as any; // Type assertion for demo

  const [grades, setGrades] = useState<{ [key: string]: { score: string; maxScore: string } }>({});

  const navigationItems = [
    { title: 'Dashboard', url: '/teacher-dashboard', icon: User },
    { title: 'Grade Calculator', url: '#', icon: Calculator },
    { title: 'Schedule', url: '#', icon: Calendar },
    { title: 'Messages', url: '#', icon: MessageCircle },
  ];

  // Get classes taught by this teacher
  const teacherClasses = teacherUser?.classes || [];
  
  // Get students in teacher's classes
  const classStudents = mockStudents.filter(student => 
    teacherClasses.includes(student.grade)
  );

  // Get assignments created by this teacher
  const teacherAssignments = mockAssignments.filter(
    assignment => assignment.teacher === user?.name
  );

  // Get today's classes for this teacher
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayClasses = mockClassSessions.filter(
    session => session.teacher === user?.name && session.day === today
  );

  const handleGradeChange = (studentId: string, field: 'score' | 'maxScore', value: string) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const calculateGrade = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const saveGrades = () => {
    // In a real app, this would save to a database
    toast({
      title: "Grades saved successfully",
      description: `Updated grades for ${Object.keys(grades).length} students.`
    });
  };

  return (
    <MainLayout 
      role="teacher" 
      navigationItems={navigationItems}
      userName={user?.name || 'Teacher'}
      userRole="Teacher"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Classes"
            value={`${teacherClasses.length}`}
            description="Classes you're teaching"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Students"
            value={`${classStudents.length}`}
            description="Students in your classes"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Assignments"
            value={`${teacherAssignments.length}`}
            description="Active assignments"
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Today's Classes"
            value={`${todayClasses.length}`}
            description={`Classes on ${today}`}
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="grades">Grade Calculator</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            {todayClasses.length > 0 ? (
              <div className="grid gap-2">
                {todayClasses.map((session) => (
                  <Card key={session.id} className="hover-scale">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{session.subject}</h3>
                          <p className="text-sm text-muted-foreground">{session.room}</p>
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

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grade Calculator</CardTitle>
                <CardDescription>
                  Enter student scores to calculate grades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Max Score</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Score"
                            value={grades[student.id]?.score || ''}
                            onChange={(e) => handleGradeChange(student.id, 'score', e.target.value)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={grades[student.id]?.maxScore || '100'}
                            onChange={(e) => handleGradeChange(student.id, 'maxScore', e.target.value)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          {grades[student.id]?.score && grades[student.id]?.maxScore ? 
                            calculateGrade(
                              parseInt(grades[student.id].score),
                              parseInt(grades[student.id].maxScore)
                            ) : 
                            '-'
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <Button onClick={saveGrades}>Save Grades</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <div className="grid gap-4">
              {teacherAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        <p className="mt-2">{assignment.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={new Date(assignment.dueDate) < new Date() ? "destructive" : "outline"}>
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Submissions</Button>
                      <Button size="sm">Edit Assignment</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;
