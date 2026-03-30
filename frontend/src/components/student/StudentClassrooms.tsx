import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Users, Copy } from 'lucide-react';
import { getMyClassrooms } from "../../api";

export default function StudentClassrooms({
  onTabChange,
  setSelectedClassroom
}: {
  onTabChange: (tab: string) => void;
  setSelectedClassroom: (id: string) => void;
}) {

  const [loading, setLoading] = useState(false);
  const [classrooms, setClassrooms] = useState<any[]>([]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse p-6 glass border border-[var(--edu-border)] rounded-2xl">
      <div className="h-5 w-2/3 bg-edu-blue/20 rounded mb-3"></div>
      <div className="h-4 w-1/3 bg-edu-blue/10 rounded mb-6"></div>

      <div className="h-4 w-1/4 bg-edu-blue/20 mb-2 rounded"></div>
      <div className="h-3 w-1/4 bg-edu-blue/10 rounded"></div>
    </div>
  );

  const EmptyState = () => (
    <div className="py-16 flex flex-col items-center justify-center">
      <svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        className="opacity-70 mb-6"
      >
        <circle cx="100" cy="100" r="80" fill="var(--edu-blue-light)" />
        <rect x="65" y="70" width="70" height="50" rx="6" fill="white" opacity="0.9" />
        <rect x="75" y="80" width="50" height="6" rx="3" fill="var(--edu-blue)" />
        <rect x="75" y="95" width="35" height="6" rx="3" fill="var(--edu-purple)" />
      </svg>

      <h2 className="text-xl text-edu-blue mb-2 font-semibold">No Classrooms Joined</h2>
      <p className="text-sm text-muted-foreground max-w-xs text-center">
        Join a classroom using a code shared by your teacher.
      </p>
    </div>
  );

  const handleOpen = (classroomId: string) => {
    setSelectedClassroom(classroomId);
    onTabChange("classroom-details");
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await getMyClassrooms();
        setClassrooms(res.data.classrooms || res.data || []);

      } catch (err) {
        console.error("Error fetching student classrooms:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6 h-full overflow-y-auto bg-[var(--edu-bg-primary)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="space-y-8"
      >
        
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-edu-blue">Your Classrooms</h1>
            <p className="text-[var(--edu-text-secondary)]">View classrooms you have joined</p>
          </div>

          <Button
            onClick={() => onTabChange("join-classroom")}
            className="edu-button-primary"
          >
            Join Classroom
          </Button>
        </div>

        {classrooms.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="text-center py-12">
              <h3 className="font-medium mb-2">No Classrooms Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join a classroom using a code provided by your teacher.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
              : classrooms.map((cls) => {
                  const Icon = BookOpen;
                  const colorClass = "text-edu-blue";

                  return (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <div
  onClick={() => handleOpen(cls.id)}
  className="
    cursor-pointer p-6 glass 
    border border-[var(--edu-border)] rounded-2xl
    hover:glow-blue hover:border-edu-blue hover:-translate-y-1
    transition-all duration-300 group
  "
>
  <div className="flex justify-between items-center mb-6">

    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-edu-blue/20 flex items-center justify-center">
        <BookOpen className="w-7 h-7 text-edu-blue" />
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[var(--edu-text-primary)] group-hover:text-edu-blue transition">
          {cls.name}
        </h3>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Copy className="w-4 h-4 text-edu-blue" />
      <p className="text-sm font-mono text-[var(--edu-text-secondary)]">
        Code: {cls.code}
      </p>
    </div>
  </div>

  <div className="flex justify-between items-center">

    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-edu-green" />
      <p className="text-sm text-[var(--edu-text-secondary)]">
        Teacher: <span className="text-[var(--edu-text-secondary)]">{cls.teacherName}</span>
      </p>
    </div>

    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-edu-purple" />
      <p className="text-sm text-[var(--edu-text-secondary)]">
        {cls.studentCount} Students
      </p>
    </div>

  </div>
</div>

                    </motion.div>
                  );
                })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
