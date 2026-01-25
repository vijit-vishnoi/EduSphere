import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import StudentOverview from './student/StudentOverview';
import StudentComments from './student/StudentComments';
import StudentNotifications from './student/StudentNotifications';
import StudentProfile from './student/StudentProfile';
import StudentClassrooms from './student/StudentClassrooms';
import StudentJoinClassroom from './student/StudentJoinClassroom';
import StudentClassroomDetails from './student/StudentClassroomDetails';
import StudentAssignmentPage from './student/StudentAssignmentsPage';
import { useEffect } from 'react';
import { connectSocket } from "../socket";
import { fetchProfile } from "../api";

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTab, setCurrentTab] = useState("classrooms");
const [selectedClassroom, setSelectedClassroom] = useState<string>("");
const [selectedAssignment, setSelectedAssignment] = useState<string>("");

  const [notificationCount] = useState(5);
  useEffect(() => {
  const initSocket = async () => {
    try {
      const res = await fetchProfile();
      const userId = res.data.user.id;

      const socket = connectSocket(userId);

      // temporary test listener
      socket.on("notification", (data: any) => {
        console.log("🔔 Student notification:", data);
      });
    } catch (err) {
      console.error("Socket init failed:", err);
    }
  };

  initSocket();
}, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StudentOverview />;
      case 'classrooms':
        return <StudentClassrooms
          onTabChange={setActiveTab}
          setSelectedClassroom={setSelectedClassroom}
        />
      case 'classroom-details':
      return <StudentClassroomDetails 
    classroomId={selectedClassroom}
    onTabChange={setActiveTab}
    setSelectedAssignment={setSelectedAssignment}
/>

      case 'join-classroom':
        return <StudentJoinClassroom
        onTabChange={setActiveTab}
        />;
      case 'notifications':
        return <StudentNotifications />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentOverview />;
        case 'assignment-details':
        return (
          <StudentAssignmentPage
            assignmentId={selectedAssignment}
            onBack={() => setActiveTab('classroom-details')}
          />
  );

    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userRole="student"
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