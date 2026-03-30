import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  PlusCircle,
  BarChart3,
  Award,
  BookOpen,
  Activity,
  Star
} from 'lucide-react';

export default function TeacherOverview() {
  const stats = [
    { label: 'Total Students', value: 124, icon: Users, change: '+12 this month', trend: 'positive' },
    { label: 'Active Assignments', value: 8, icon: FileText, change: '+2 this week', trend: 'positive' },
    { label: 'Pending Reviews', value: 23, icon: Clock, change: '+5 today', trend: 'warning' },
    { label: 'Average Grade', value: '87%', icon: TrendingUp, change: '+3% improvement', trend: 'positive' }
  ];

  const recentSubmissions = [
    {
      id: 1,
      student: 'Sarah Johnson',
      assignment: 'React Fundamentals Project',
      subject: 'Web Development',
      submittedAt: '2 hours ago',
      status: 'pending',
      priority: 'high',
      score: null
    },
    {
      id: 2,
      student: 'Michael Chen',
      assignment: 'Database Design',
      subject: 'Computer Science',
      submittedAt: '4 hours ago',
      status: 'pending',
      priority: 'medium',
      score: null
    },
    {
      id: 3,
      student: 'Emily Davis',
      assignment: 'Algorithm Analysis',
      subject: 'Mathematics',
      submittedAt: '1 day ago',
      status: 'reviewed',
      priority: 'low',
      score: 92
    }
  ];

  const upcomingDeadlines = [
    {
      assignment: 'Machine Learning Project',
      dueDate: '2025-01-15',
      subject: 'AI & ML',
      students: 45,
      submissions: 12,
      daysLeft: 3
    },
    {
      assignment: 'Web Security Assessment',
      dueDate: '2025-01-18',
      subject: 'Cybersecurity',
      students: 32,
      submissions: 28,
      daysLeft: 6
    },
    {
      assignment: 'Data Visualization',
      dueDate: '2025-01-20',
      subject: 'Data Science',
      students: 38,
      submissions: 15,
      daysLeft: 8
    }
  ];

  const subjectPerformance = [
    { subject: 'Web Development', avgGrade: 89, students: 45, engagement: 94 },
    { subject: 'Computer Science', avgGrade: 85, students: 52, engagement: 87 },
    { subject: 'Mathematics', avgGrade: 91, students: 38, engagement: 92 },
    { subject: 'Data Science', avgGrade: 87, students: 41, engagement: 89 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-edu-amber/20 text-edu-amber';
      case 'reviewed': return 'bg-edu-green/20 text-edu-green';
      case 'in-progress': return 'bg-edu-blue/20 text-edu-blue';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-edu-red';
      case 'medium': return 'text-edu-amber';
      case 'low': return 'text-edu-green';
      default: return 'text-edu-blue';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'text-edu-green';
      case 'warning': return 'text-edu-amber';
      case 'negative': return 'text-edu-red';
      default: return 'text-edu-blue';
    }
  };
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user ? `${user.name}` : 'Teacher';

  return (
    <div className="p-6 h-full overflow-y-auto bg-[var(--edu-bg-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-edu-blue">Welcome back, Professor {userName}!</h1>
            <p className="text-[var(--edu-text-secondary)]">Here's your teaching dashboard overview</p>
          </div>
          <div className="flex gap-3">
            <Button className="edu-button-secondary">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
            <Button className="edu-button-primary">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="edu-card glass-hover border-[var(--edu-border)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-edu-blue" />
                    <div className="text-right">
                      <p className="text-2xl text-edu-blue">{stat.value}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--edu-text-secondary)] mb-1">{stat.label}</p>
                  <p className={`text-xs ${getTrendColor(stat.trend)}`}>{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Submissions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="edu-card border-[var(--edu-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-edu-amber" />
                    <span>Recent Submissions</span>
                  </CardTitle>
                  <CardDescription>
                    Latest student submissions awaiting review with priority indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 glass border border-[var(--edu-border)] rounded-lg hover:glow-blue transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[var(--edu-text-primary)]">{submission.student}</h4>
                            {submission.score && (
                              <Badge className="bg-edu-green/20 text-edu-green">
                                {submission.score}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[var(--edu-text-secondary)]">{submission.assignment}</p>
                          <p className="text-xs text-[var(--edu-text-secondary)]">{submission.subject}</p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-[var(--edu-text-secondary)]" />
                            <span className="text-sm text-[var(--edu-text-secondary)]">{submission.submittedAt}</span>
                          </div>
                        </div>
                        <div className="space-y-2 flex flex-col items-end">
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                          <Badge variant="outline" className={`${getPriorityColor(submission.priority)} border-current`}>
                            {submission.priority}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button className="w-full edu-button-primary">
                    Review All Submissions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="edu-card border-[var(--edu-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-edu-red" />
                    <span>Assignment Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <motion.div
                      key={deadline.assignment}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 glass border border-[var(--edu-border)] rounded-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm text-[var(--edu-text-primary)]">{deadline.assignment}</h4>
                            <p className="text-xs text-[var(--edu-text-secondary)]">{deadline.subject}</p>
                            <p className="text-xs text-edu-red">{deadline.daysLeft} days left</p>
                          </div>
                          {deadline.submissions < deadline.students * 0.5 && (
                            <AlertTriangle className="w-4 h-4 text-edu-amber" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--edu-text-secondary)]">
                              {deadline.submissions}/{deadline.students} submitted
                            </span>
                            <span className="text-edu-blue">
                              {Math.round((deadline.submissions / deadline.students) * 100)}%
                            </span>
                          </div>
                          <Progress value={(deadline.submissions / deadline.students) * 100} className="h-1.5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="outline" className="w-full border-[var(--edu-border)] hover:glow-green">
                    Manage Deadlines
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="edu-card border-[var(--edu-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-edu-purple" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full edu-button-primary text-sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                  <Button className="w-full edu-button-secondary text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                  <Button variant="outline" className="w-full border-[var(--edu-border)] hover:glow-purple text-sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review Comments
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="edu-card border-[var(--edu-border)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-edu-blue" />
                <span>Subject Performance Analytics</span>
              </CardTitle>
              <CardDescription>
                Average grades and student engagement across your subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjectPerformance.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 glass border border-[var(--edu-border)] rounded-lg hover:glow-blue transition-all"
                  >
                    <div className="text-center space-y-3">
                      <BookOpen className="w-8 h-8 text-edu-blue mx-auto" />
                      <div>
                        <h4 className="text-[var(--edu-text-primary)]">{subject.subject}</h4>
                        <p className="text-sm text-[var(--edu-text-secondary)]">{subject.students} students</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xl text-edu-blue">{subject.avgGrade}%</p>
                          <p className="text-xs text-[var(--edu-text-secondary)]">Average Grade</p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Activity className="w-3 h-3 text-edu-green" />
                          <span className="text-xs text-edu-green">{subject.engagement}% engagement</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="edu-card border-[var(--edu-border)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-edu-green" />
                <span>Teaching Insights</span>
              </CardTitle>
              <CardDescription>
                AI-powered insights to improve your teaching effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 glass border border-[var(--edu-border)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-edu-green" />
                    <span className="text-sm text-edu-green">Performance Trend</span>
                  </div>
                  <p className="text-xs text-[var(--edu-text-secondary)]">
                    Your students' average grades have improved by 5% this semester. 
                    Interactive assignments show 23% higher engagement.
                  </p>
                </div>
                <div className="p-4 glass border border-[var(--edu-border)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-edu-blue" />
                    <span className="text-sm text-edu-blue">Discussion Activity</span>
                  </div>
                  <p className="text-xs text-[var(--edu-text-secondary)]">
                    Students are most active in discussions during 2-4 PM. 
                    Consider scheduling live sessions during these hours.
                  </p>
                </div>
                <div className="p-4 glass border border-[var(--edu-border)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-edu-amber" />
                    <span className="text-sm text-edu-amber">At-Risk Students</span>
                  </div>
                  <p className="text-xs text-[var(--edu-text-secondary)]">
                    3 students haven't submitted assignments in 2 weeks. 
                    Consider reaching out with additional support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}