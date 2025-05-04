
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Book, BookOpen, Calendar, GraduationCap, MessageCircle, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}-dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Role-Based Dashboards",
      description: "Specialized dashboards for students, teachers, administrators, and parents."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Department Announcements",
      description: "Stay updated with the latest news from your department and school."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Class Scheduling",
      description: "Easily access and manage your class schedule with real-time updates."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Group Chats",
      description: "Communicate efficiently with class members and PTA groups."
    },
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: "Assignments & Grades",
      description: "Submit assignments and track grades with AI assistance."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Academic Management",
      description: "Comprehensive tools for student registration and performance tracking."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md bg-white text-primary flex items-center justify-center font-bold text-xl">
                SMS
              </div>
              <h1 className="text-2xl font-bold">School Management System</h1>
            </div>
            <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={handleLogin}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Modern School Management System</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
              Streamline education management with our comprehensive platform for students, teachers, administrators, and parents.
            </p>
            <Button size="lg" onClick={handleLogin} className="animate-fade-in">
              Get Started
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow hover-scale">
                  <div className="mb-4 p-3 inline-block rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tailored for Everyone</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Students</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    View department announcements and assignments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Access class schedules and join group chats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Track attendance and manage fee payments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Get AI assistance for assignments
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Teachers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Auto-calculate grades and manage classes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Access student reports and provide feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Communicate with students and parents
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Participate in PTA group chats
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Administrators</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Control registration and authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Manage students, teachers, and announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Control school-wide calendar and events
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Monitor grades and manage fees
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Parents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    View student progress and announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Access PTA group chats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Receive event notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Schedule meetings with teachers
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg" onClick={handleLogin}>
                Start Using the System
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-slate-400">© 2024 School Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
