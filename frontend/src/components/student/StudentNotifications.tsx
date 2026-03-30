import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  FileText, 
  User,
  Settings,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment: React Fundamentals Project',
      message: 'Prof. Johnson has posted a new assignment in Web Development',
      timestamp: '5 minutes ago',
      read: false,
      priority: 'high',
      icon: FileText
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment on Database Design',
      message: 'Dr. Smith left feedback on your ERD submission',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium',
      icon: MessageSquare
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Assignment Due Tomorrow',
      message: 'UI/UX Design Principles assignment is due tomorrow at 11:59 PM',
      timestamp: '2 hours ago',
      read: true,
      priority: 'high',
      icon: Clock
    },
    {
      id: 4,
      type: 'grade',
      title: 'Grade Posted: Algorithm Analysis',
      message: 'You received 95% on your Algorithm Analysis assignment',
      timestamp: '1 day ago',
      read: true,
      priority: 'low',
      icon: CheckCircle
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      message: 'EduSphere will undergo maintenance on Sunday from 2-4 AM',
      timestamp: '2 days ago',
      read: false,
      priority: 'low',
      icon: Info
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    gradeNotifications: true,
    commentNotifications: true,
    systemUpdates: false
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'neon-blue';
      case 'comment':
        return 'neon-green';
      case 'deadline':
        return 'neon-pink';
      case 'grade':
        return 'neon-purple';
      case 'system':
        return 'neon-orange';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-[var(--neon-pink)] text-[var(--neon-pink)]';
      case 'medium':
        return 'border-[var(--neon-orange)] text-[var(--neon-orange)]';
      case 'low':
        return 'border-[var(--neon-green)] text-[var(--neon-green)]';
      default:
        return '';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl neon-blue">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)] text-background notification-badge">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={markAllAsRead}
              variant="outline" 
              className="glass border-[var(--glass-border)] hover:glow-green"
              disabled={unreadCount === 0}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" className="glass border-[var(--glass-border)] hover:glow-blue">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 neon-blue" />
                  <span>Recent Notifications</span>
                </CardTitle>
                <CardDescription>
                  Stay updated with your latest activities and announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 glass border border-[var(--glass-border)] rounded-lg interactive-hover ${
                        !notification.read ? 'glow-blue' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                          notification.type === 'assignment' ? 'from-[var(--neon-blue)] to-[var(--neon-purple)]' :
                          notification.type === 'comment' ? 'from-[var(--neon-green)] to-[var(--neon-blue)]' :
                          notification.type === 'deadline' ? 'from-[var(--neon-pink)] to-[var(--neon-orange)]' :
                          notification.type === 'grade' ? 'from-[var(--neon-purple)] to-[var(--neon-pink)]' :
                          'from-[var(--neon-orange)] to-[var(--neon-green)]'
                        } p-1`}>
                          <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                            <notification.icon className={`w-5 h-5 ${getNotificationColor(notification.type)}`} />
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className={`font-medium ${!notification.read ? 'neon-blue' : ''}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getPriorityBadge(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="hover:glow-green"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="hover:glow-pink"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {notifications.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">No notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 neon-purple" />
                    <span>Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Customize your notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(settings).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'pushNotifications' && 'Browser push notifications'}
                          {key === 'assignmentReminders' && 'Reminders for due assignments'}
                          {key === 'gradeNotifications' && 'Alerts when grades are posted'}
                          {key === 'commentNotifications' && 'New comments from teachers'}
                          {key === 'systemUpdates' && 'System maintenance updates'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Notification Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Notifications</span>
                      <Badge variant="outline" className="neon-blue">
                        {notifications.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Unread</span>
                      <Badge className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)] text-background">
                        {unreadCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Priority</span>
                      <Badge variant="outline" className="border-[var(--neon-pink)] text-[var(--neon-pink)]">
                        {notifications.filter(n => n.priority === 'high').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}