import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getClassroomById, getAssignmentsByClassroom } from "../../api";
import { Users } from "lucide-react";

interface Props {
  classroomId: string;
}

interface Student {
  id: string;
  name: string;
}

export default function StudentClassroomDetails({ classroomId }: Props) {
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
    <div className="p-6 h-full overflow-y-auto space-y-6">

      {/* ---------- CLASS HEADER CARD ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-4 border border-[var(--edu-border)] shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-white mb-2">
          {classroom.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-[oklch(0.68_0_0)]">

          <p>
            <span className="text-white font-medium">Teacher:</span>{" "}
            {classroom.classTeacher?.name}
          </p>

          <p>
            <span className="text-white font-medium">Code:</span>{" "}
            <span >{classroom.code}</span>
          </p>

          <p className="flex items-center gap-2">
            <Users className="w-4 h-4 text-edu-green" />
            {classroom.students?.length || 0} Students
          </p>

        </div>
      </motion.div>

      {/* ---------- TABS ---------- */}
      <div className="flex items-center tab-fix border-b border-white/10 pb-3 mt-4 pl-1">

  {[
    { key: "overview", label: "Overview" },
    { key: "assignments", label: "Assignments" },
    { key: "students", label: "Students" }
  ].map((t) => (
    <button
  type="button"
  onClick={() => setTab(t.key)}
  className={`flex relative pb-3 transition-all flex-shrink-0
    ${
      tab === t.key
        ? "text-edu-blue text-xl font-semibold"
        : "text-[oklch(0.68_0_0)] text-xl font-medium hover:text-white"
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 mt-6"
      >
        {/* -------- Overview Tab -------- */}
        {tab === "overview" && (
          <div className="space-y-8">
            <div className="glass-card p-4 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-3">
                Class Overview
              </h2>
              <p className="text-[oklch(0.68_0_0)]">
                {classroom.description || "No description added."}
              </p>
              {/* Teacher Info */}
            <div className="mt-4 text-[oklch(0.68_0_0)]">
                <span className="text-white font-medium">Teacher:</span>{" "}
                {classroom.classTeacher?.name}
            </div>
            </div>

            {/* Recent Assignments */}
            <div className="glass-card p-4 rounded-xl border border-white/10">
              <h3 className="text-xl text-white font-medium mb-3">
                Recent Assignments
              </h3>

              {assignments.length === 0 ? (
                <p className="text-gray-500">No assignments yet.</p>
              ) : (
                <div className="space-y-4 mt-3">
                  {assignments.sort((a, b) => 
                    new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
                    )
                    .slice(0, 3)
                    .map((a) => (

                    <div
                      key={a.id}
                      className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-edu-blue transition"
                    >
                      <p className="text-white">{a.title}</p>
                      <p className="text-gray-400 text-sm">{a.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Due: {a.deadline}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------- Assignments Tab -------- */}
        {tab === "assignments" && (
          <div className="glass-card p-4 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl text-white font-semibold mb-3">Assignments</h2>

            {assignments.length === 0 ? (
              <p className="text-gray-500">No assignments posted</p>
            ) : (
              <div className="space-y-4">
                {assignments.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-edu-blue transition cursor-pointer"
                  >
                    <p className="text-white">{a.title}</p>
                    <p className="text-gray-400 text-sm">{a.description}</p>
                    <p className="text-gray-500 text-xs mt-1">Due: {a.deadline}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------- Students Tab -------- */}
        {tab === "students" && (
          <div className="glass-card p-4 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl text-white font-semibold mb-3">
              Students
            </h2>

            <p className="text-[oklch(0.68_0_0)]">
              <span className="text-white font-medium">Teacher:</span>{" "}
              {classroom.classTeacher?.name}
            </p>

            <h3 className="text-lg text-white font-medium mt-4 mb-2">
              Classmates
            </h3>

            {!classroom.students ||classroom.students?.length === 0 ? (
              <p className="text-gray-500">No students joined yet</p>
            ) : (
              <ul className="space-y-3">
                {classroom.students.map((s: Student) => (
                  <li
                    key={s.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
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
