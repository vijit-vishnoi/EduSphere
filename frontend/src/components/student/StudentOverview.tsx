import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
  BookOpen
} from 'lucide-react';

export default function StudentOverview() {
  const upcomingAssignments = [
    {
      id: 1,
      title: 'React Fundamentals Project',
      subject: 'Web Development',
      dueDate: '2025-01-15',
      status: 'pending',
      priority: 'high',
      timeLeft: '3 days'
    },
    {
      id: 2,
      title: 'Database Design Assignment',
      subject: 'Computer Science',
      dueDate: '2025-01-18',
      status: 'in-progress',
      priority: 'medium',
      timeLeft: '6 days'
    },
    {
      id: 3,
      title: 'Algorithm Analysis',
      subject: 'Mathematics',
      dueDate: '2025-01-20',
      status: 'pending',
      priority: 'low',
      timeLeft: '8 days'
    }
  ];

  const recentComments = [
    {
      id: 1,
      assignment: 'React Fundamentals',
      teacher: 'Prof. Johnson',
      comment: 'Great progress on the component structure! Keep up the excellent work.',
      time: '2 hours ago'
    },
    {
      id: 2,
      assignment: 'Database Design',
      teacher: 'Dr. Smith',
      comment: 'Please review the normalization concepts before the next submission.',
      time: '1 day ago'
    }
  ];

  const stats = [
    { label: 'Completed Assignments', value: 12, icon: CheckCircle, trend: '+2 this week' },
    { label: 'Pending Assignments', value: 3, icon: Clock, trend: 'Due soon' },
    { label: 'Grade Average', value: '87%', icon: TrendingUp, trend: '+3% this month' },
    { label: 'Learning Streak', value: '15 days', icon: Calendar, trend: 'Personal best!' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-edu-red';
      case 'medium': return 'text-edu-amber';
      case 'low': return 'text-edu-green';
      default: return 'text-edu-blue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-edu-amber/20 text-edu-amber';
      case 'in-progress': return 'bg-edu-blue/20 text-edu-blue';
      case 'completed': return 'bg-edu-green/20 text-edu-green';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user ? `${user.name} ` : 'Student';

  return (
    <div className="p-6 h-full overflow-y-auto bg-[var(--edu-bg-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl text-edu-blue">Welcome back, {userName}!</h1>
          <p className="text-[var(--edu-text-secondary)]">Here's your learning progress overview</p>
        </div>

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
                  <p className="text-xs text-edu-green">{stat.trend}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="edu-card border-[var(--edu-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-edu-blue" />
                    <span>Upcoming Assignments</span>
                  </CardTitle>
                  <CardDescription>
                    Your pending and in-progress assignments with countdown timers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAssignments.map((assignment, index) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 glass border border-[var(--edu-border)] rounded-lg hover:glow-blue transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h4 className="text-[var(--edu-text-primary)]">{assignment.title}</h4>
                          <p className="text-sm text-[var(--edu-text-secondary)]">{assignment.subject}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-[var(--edu-text-secondary)]">Due: {assignment.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 text-edu-amber" />
                              <span className="text-edu-amber">{assignment.timeLeft} left</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 flex flex-col items-end">
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                          <Badge variant="outline" className={`${getPriorityColor(assignment.priority)} border-current`}>
                            {assignment.priority}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button className="w-full edu-button-primary">
                    View All Assignments
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="edu-card border-[var(--edu-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-edu-green" />
                    <span>Recent Feedback</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentComments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 glass border border-[var(--edu-border)] rounded-lg"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm text-[var(--edu-text-primary)]">{comment.assignment}</h5>
                          <span className="text-xs text-[var(--edu-text-secondary)]">{comment.time}</span>
                        </div>
                        <p className="text-xs text-edu-green">by {comment.teacher}</p>
                        <p className="text-sm text-[var(--edu-text-secondary)]">{comment.comment}</p>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="outline" className="w-full border-[var(--edu-border)] hover:glow-green">
                    View All Comments
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
                    <Target className="w-5 h-5 text-edu-purple" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full edu-button-primary">
                    Submit Assignment
                  </Button>
                  <Button className="w-full edu-button-secondary">
                    Ask Question
                  </Button>
                  <Button variant="outline" className="w-full border-[var(--edu-border)] hover:glow-purple">
                    Join Live Class
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
                <TrendingUp className="w-5 h-5 text-edu-blue" />
                <span>Learning Progress</span>
              </CardTitle>
              <CardDescription>
                Your progress across different subjects with interactive charts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { subject: 'Web Development', progress: 85, grade: 'A-' },
                { subject: 'Computer Science', progress: 72, grade: 'B+' },
                { subject: 'Mathematics', progress: 90, grade: 'A' },
                { subject: 'Data Structures', progress: 68, grade: 'B' }
              ].map((item, index) => (
                <motion.div
                  key={item.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-edu-blue" />
                      <span className="text-sm text-[var(--edu-text-primary)]">{item.subject}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-edu-green">{item.grade}</span>
                      <span className="text-sm text-edu-blue">{item.progress}%</span>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}