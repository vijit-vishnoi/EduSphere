import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import TeacherOverview from './teacher/TeacherOverview';
import TeacherClassrooms from './teacher/TeacherClassrooms';
import TeacherCreateClassroom from './teacher/TeacherCreateClassroom';
import TeacherStudents from './teacher/TeacherStudents';
import TeacherComments from './teacher/TeacherComments';
import TeacherAnalytics from './teacher/TeacherAnalytics';
import TeacherNotifications from './teacher/TeacherNotifications';
import TeacherProfile from './teacher/TeacherProfile';
import TeacherClassroomDetails from './teacher/TeacherClassroomDetails';
import TeacherCreateAssignment from './teacher/TeacherCreateAssignment';
import TeacherAssignmentSubmissions from './teacher/TeacherAssignmentSubmission';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount] = useState(8);
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeacherOverview />;
      case 'classroom-details':
        if (!selectedClassroom) return <div>No classroom selected</div>;
        return (
          <TeacherClassroomDetails
            classroomId={selectedClassroom}
            onTabChange={setActiveTab}
            setSelectedClassroom={setSelectedClassroom}
            setSelectedAssignment={setSelectedAssignment}
          />
        );
      case 'create-assignment':
        return (
          <TeacherCreateAssignment
            classroomId={selectedClassroom!}
            onTabChange={setActiveTab}
          />
        );
        case 'assignment-submissions':
          if (!selectedAssignment) {
            return <div className="p-6">No assignment selected</div>;
          }
        return (
          <TeacherAssignmentSubmissions
            assignmentId={selectedAssignment}
            onBack={() => setActiveTab('classroom-details')}
          />
        );
      case 'classrooms':
        return <TeacherClassrooms onTabChange={setActiveTab}
        setSelectedClassroom={setSelectedClassroom} />;
      case 'create-classroom':
        return <TeacherCreateClassroom onTabChange={setActiveTab} />;
      case 'notifications':
        return <TeacherNotifications />;
      case 'profile':
        return <TeacherProfile />;
      default:
        return <TeacherOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole="teacher"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        notificationCount={notificationCount}
      />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}