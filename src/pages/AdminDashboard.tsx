
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockTeachers, mockParents, mockAdmins } from '@/data/mockData';
import { BookOpen, Calendar, DollarSign, MessageCircle, Settings, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student',
    department: 'Science',
    grade: '10A',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigationItems = [
    { title: 'Dashboard', url: '/admin-dashboard', icon: User },
    { title: 'Users', url: '#', icon: Users },
    { title: 'Announcements', url: '#', icon: BookOpen },
    { title: 'Calendar', url: '#', icon: Calendar },
    { title: 'Fees', url: '#', icon: DollarSign },
    { title: 'Settings', url: '#', icon: Settings },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = () => {
    // In a real app, this would create a new user in the database
    toast({
      title: "User created successfully",
      description: `${newUserData.name} has been registered as a ${newUserData.role}.`
    });
    
    setNewUserData({
      name: '',
      email: '',
      role: 'student',
      department: 'Science',
      grade: '10A',
    });
    
    setShowCreateForm(false);
  };

  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalParents = mockParents.length;
  const totalUsers = totalStudents + totalTeachers + totalParents + mockAdmins.length;

  return (
    <MainLayout 
      role="admin" 
      navigationItems={navigationItems}
      userName={user?.name || 'Admin'}
      userRole="Administrator"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Users"
            value={`${totalUsers}`}
            description="All registered users"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Students"
            value={`${totalStudents}`}
            description="Enrolled students"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Teachers"
            value={`${totalTeachers}`}
            description="Teaching staff"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
          <DashboardCard
            title="Parents"
            value={`${totalParents}`}
            description="Registered parents"
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="chats">PTA Group Chats</TabsTrigger>
            <TabsTrigger value="fees">Fee Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>
                    Register, edit, and manage all users in the system
                  </CardDescription>
                </div>
                <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                  <DialogTrigger asChild>
                    <Button>Register New User</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Register New User</DialogTitle>
                      <DialogDescription>
                        Create a new account for a student, teacher, or parent
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">User Role</Label>
                        <Select 
                          value={newUserData.role}
                          onValueChange={(value) => handleSelectChange('role', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={newUserData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={newUserData.email}
                            onChange={handleInputChange}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                      </div>

                      {newUserData.role === 'student' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="grade">Grade/Class</Label>
                            <Select 
                              value={newUserData.grade}
                              onValueChange={(value) => handleSelectChange('grade', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10A">10A</SelectItem>
                                <SelectItem value="10B">10B</SelectItem>
                                <SelectItem value="11A">11A</SelectItem>
                                <SelectItem value="11B">11B</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select 
                              value={newUserData.department}
                              onValueChange={(value) => handleSelectChange('department', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Science">Science</SelectItem>
                                <SelectItem value="Arts">Arts</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {newUserData.role === 'teacher' && (
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select 
                            value={newUserData.department}
                            onValueChange={(value) => handleSelectChange('department', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Science">Science</SelectItem>
                              <SelectItem value="Arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                      <Button onClick={handleCreateUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Students */}
                    {mockStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell><Badge>Active</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Teachers */}
                    {mockTeachers.map(teacher => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.teacherId}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell><Badge>Active</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button variant="outline">Export User List</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="chats">
            <Card>
              <CardHeader>
                <CardTitle>PTA Group Chats</CardTitle>
                <CardDescription>
                  Manage parent-teacher association group chats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      PTA General Discussion
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Active members: 45 • Last active: Today
                    </p>
                    <div className="flex justify-end mt-2 space-x-2">
                      <Button variant="outline" size="sm">View Messages</Button>
                      <Button size="sm">Moderate</Button>
                    </div>
                  </div>
                  
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      PTA Events Planning
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Active members: 22 • Last active: Yesterday
                    </p>
                    <div className="flex justify-end mt-2 space-x-2">
                      <Button variant="outline" size="sm">View Messages</Button>
                      <Button size="sm">Moderate</Button>
                    </div>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Science Department PTA
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Active members: 18 • Last active: 2 days ago
                    </p>
                    <div className="flex justify-end mt-2 space-x-2">
                      <Button variant="outline" size="sm">View Messages</Button>
                      <Button size="sm">Moderate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create New PTA Chat Group</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle>Fee Management</CardTitle>
                <CardDescription>
                  Manage fees, payments and financial records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount ($)</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tuition Fee (Term 1)</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tuition Fee (Term 2)</TableCell>
                      <TableCell>5,000</TableCell>
                      <TableCell>2024-05-15</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Laboratory Fee</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>2024-02-20</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sport Activities Fee</TableCell>
                      <TableCell>300</TableCell>
                      <TableCell>2024-03-10</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                          Overdue
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Generate Reports</Button>
                <Button>Create New Fee</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
