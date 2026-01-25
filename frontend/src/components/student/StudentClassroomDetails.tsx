import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getClassroomById, getAssignmentsByClassroom } from "../../api";

import {
  Users,
  User,
  NotebookText,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

interface Props {
  classroomId: string;
  onTabChange: (tab: string) => void;
  setSelectedAssignment: (id: string) => void;
}

interface Student {
  id: string;
  name: string;
}

export default function StudentClassroomDetails({classroomId,
  onTabChange,
  setSelectedAssignment, }: Props) {
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getClassroomById(classroomId);
        setClassroom(res.data.classroom);

        const a = await getAssignmentsByClassroom(classroomId);
        setAssignments(a.data.assignments || []);
      } catch (err) {
        console.error("Error loading classroom:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [classroomId]);

  if (!classroom || loading) {
    return (
      <div className="p-4 text-center text-white opacity-70">
        Loading classroom...
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto space-y-8">

      {/* ---------- CLASS HEADER ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-[var(--edu-border)] shadow-xl space-y-3"
      >
        <h1 className="text-3xl font-bold text-white">{classroom.name}</h1>

        <div className="flex flex-wrap gap-6 text-gray-300 text-lg">

          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-edu-blue" />
            <span className="text-white">Teacher:</span>
            {classroom.classTeacher?.name}
          </div>

          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-edu-green" />
            <span className="text-white">Code:</span>
            {classroom.code}
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-edu-purple" />
            <span className="text-white">Students:</span>
            {classroom.students?.length || 0}
          </div>

        </div>
      </motion.div>

      {/* ---------- TABS (FIXED SPACING) ---------- */}
      <div className="flex items-center border-b border-white/10 pb-3 gap-10 pl-1 tab-fix">

        {[
          { key: "overview", label: "Overview" },
          { key: "assignments", label: "Assignments" },
          { key: "students", label: "Students" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-xl relative transition-all
              ${
                tab === t.key
                  ? "text-edu-blue font-bold"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {t.label}

            {tab === t.key && (
              <span className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-edu-blue rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* ---------- TAB CONTENT ---------- */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >

        {/* ===== Overview ===== */}
        {tab === "overview" && (
          <div className="space-y-8">

            {/* Description */}
            <div className="glass-card p-6 rounded-xl border border-white/10 space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <NotebookText className="w-5 h-5 text-edu-purple" />
                Class Overview
              </h2>

              <p className="text-gray-300">
                {classroom.description || "No description added."}
              </p>

              <div className="text-gray-300">
                <span className="text-white font-medium">Teacher:</span>{" "}
                {classroom.classTeacher?.name}
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-edu-green" />
                Recent Assignments
              </h3>

              {assignments.length === 0 ? (
                <p className="text-gray-500">No assignments yet.</p>
              ) : (
                <div className="space-y-4">
                  {assignments
                    .sort(
                      (a, b) =>
                        new Date(b.deadline).getTime() -
                        new Date(a.deadline).getTime()
                    )
                    .slice(0, 3)
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setSelectedAssignment(a.id);
                          onTabChange("assignment-details");
                        }}
                        className="p-5 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center hover:border-edu-blue transition cursor-pointer"
                      >
                        <div>
                          <p className="text-white font-medium">{a.title}</p>
                          <p className="text-gray-400 text-sm">{a.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Due: {a.dueDate}
                          </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ===== Assignments ===== */}
        {tab === "assignments" && (
          <div className="glass-card p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl text-white font-semibold mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-edu-green" />
              All Assignments
            </h2>

            {assignments.length === 0 ? (
              <p className="text-gray-500">No assignments posted</p>
            ) : (
              <div className="space-y-4">
                {assignments.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedAssignment(a.id);
                      onTabChange("assignment-details");
                    }}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-edu-blue transition cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white">{a.title}</p>
                      <p className="text-gray-400 text-sm">{a.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Due: {a.dueDate}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== Students ===== */}
        {tab === "students" && (
          <div className="glass-card p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-edu-purple" />
              Students
            </h2>

            {!classroom.students || classroom.students.length === 0 ? (
              <p className="text-gray-500">No students joined yet</p>
            ) : (
              <ul className="space-y-3">
                {classroom.students.map((s: Student) => (
                  <li
                    key={s.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3"
                  >
                    <User className="w-6 h-6 text-edu-blue" />
                    <p className="text-white">{s.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
}
