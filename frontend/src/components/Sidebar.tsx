import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  FileText,
  BarChart3,
  Users,
  PlusCircle,
  Search,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  userRole: 'student' | 'teacher';
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  notificationCount?: number;
}

export default function Sidebar({ 
  userRole, 
  activeTab, 
  onTabChange, 
  onLogout, 
  notificationCount = 0 
}: SidebarProps) {
  const studentMenuItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'classrooms', label: 'Classrooms', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const teacherMenuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'classrooms', label: 'Classrooms', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const menuItems = userRole === 'student' ? studentMenuItems : teacherMenuItems;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-64 h-screen edu-card border-r border-[var(--edu-border)] flex flex-col"
    >
      <div className="p-6 border-b border-[var(--edu-border)]">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-10 h-10 rounded-full bg-edu-blue p-1">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-edu-blue">EduSphere</h1>
            <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
          </div>
        </motion.div>
      </div>

      <div className="p-4 border-b border-[var(--edu-border)]">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 glass border border-[var(--edu-border)] rounded-lg focus:glow-blue focus:outline-none"
          />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => onTabChange(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start sidebar-item relative ${
                activeTab === item.id 
                  ? 'bg-edu-blue/20 glow-blue text-edu-blue' 
                  : 'hover:bg-[var(--glass-bg-hover)]'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                activeTab === item.id ? 'text-edu-blue' : ''
              }`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-2 h-5 px-2 bg-edu-red text-white notification-badge"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--edu-border)] space-y-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[var(--glass-bg-hover)]"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start hover:bg-[var(--glass-bg-hover)] text-destructive hover:text-destructive"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}