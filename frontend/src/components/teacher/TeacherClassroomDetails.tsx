import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Users, FileText, PlusCircle, Copy, ShieldCheck } from "lucide-react";
import { getClassroomById } from "../../api";
import { getAssignmentsByClassroom } from "../../api";


export default function TeacherClassroomDetails({
  classroomId,
  onTabChange,
  setSelectedClassroom
}: {
  classroomId: string;
  onTabChange: (tab: string) => void;
  setSelectedClassroom: (id: string) => void;
}) {
  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<any[]>([]);
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const classroomRes = await getClassroomById(classroomId);
    setClassroom(classroomRes.data.classroom);
    const assignRes = await getAssignmentsByClassroom(classroomId);
    setAssignments(assignRes.data.assignments);
    } catch (err) {
      console.error("Failed to fetch classroom", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [classroomId]);

  if (loading || !classroom) {
    return (
      <div className="p-6 text-center text-edu-text-secondary">
        Loading classroom details...
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-edu-blue">{classroom.name}</h1>
            <p className="text-muted-foreground">
              Classroom Code:{" "}
              <span className="font-mono text-edu-blue">{classroom.code}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => navigator.clipboard.writeText(classroom.code)}
              variant="secondary"
            >
              <Copy className="w-4 h-4 mr-2" /> Copy Code
            </Button>

            <Button
                onClick={() => {
                    setSelectedClassroom(classroom.id);
                    onTabChange("create-assignment");
                }}
                className="edu-button-primary"
                >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </div>

        {/* Description */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-edu-blue">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--edu-text-secondary)]">
              {classroom.description || "No description added."}
            </p>
          </CardContent>
        </Card>

        {/* Students Section */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-edu-blue" />
              Students ({classroom.students?.length || 0})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {classroom.students?.length === 0 ? (
              <p className="text-muted-foreground">No students enrolled yet.</p>
            ) : (
              classroom.students.map((stud: any) => (
                <div
                  key={stud.id}
                  className="flex items-center justify-between p-3 rounded bg-[var(--glass-bg)]"
                >
                  <span>{stud.name}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
<Card className="glass-card border-0">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <FileText className="w-5 h-5 text-edu-purple" />
      Assignments
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {assignments.length === 0 ? (
      <p className="text-muted-foreground">
        No assignments yet. Create one using the button above.
      </p>
    ) : (
      assignments.map((a) => (
        <div
          key={a.id}
          className="p-4 rounded-lg bg-[var(--glass-bg)] flex justify-between items-center hover:glow-blue transition"
        >
          <div>
            <h3 className="text-lg font-semibold text-edu-blue">
              {a.title}
            </h3>

            <p className="text-muted-foreground text-sm">
              Due:{" "}
              {a.dueDate
                ? new Date(a.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
          </div>

          <Badge variant="secondary">
            {a.points || 0} pts
          </Badge>
        </div>
      ))
    )}
  </CardContent>
</Card>


      </motion.div>
    </div>
  );
}
