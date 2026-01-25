import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Save,
  User,
  FileText,
} from "lucide-react";

import {
  getSubmissionsForAssignment,
  gradeSubmission,
} from "../../api";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

interface Props {
  assignmentId: string;
  onBack: () => void;
}

export default function TeacherAssignmentSubmissions({
  assignmentId,
  onBack,
}: Props) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [initialGradedIds, setInitialGradedIds] = useState<number[]>([]);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSubmissionsForAssignment(assignmentId);
        setSubmissions(res.data || []);
        const graded = (res.data || [])
        .filter((s: any) => s.grade)
        .map((s: any) => s.id);

        setInitialGradedIds(graded);
      } catch (err) {
        console.error("Error loading submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [assignmentId]);

  const updateField = (
    submissionId: number,
    field: "grade" | "feedback",
    value: string
  ) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId ? { ...s, [field]: value } : s
      )
    );
  };

  const handleSaveGrade = async (submission: any) => {
    try {
      setSavingId(submission.id);

      await gradeSubmission(submission.id, {
        grade: submission.grade,
        feedback: submission.feedback,
      });
      setSavedIds((prev) => [...prev, submission.id]);
    } catch (err) {
      console.error("Error grading submission:", err);
      
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading submissions…
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto space-y-6 max-w-5xl mx-auto">

      {/* BACK */}
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Assignment
      </Button>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Student Submissions
        </h1>
        <p className="text-gray-400 mt-1">
          Total submissions: {submissions.length}
        </p>
      </motion.div>

      {/* EMPTY STATE */}
      {submissions.length === 0 && (
        <Card className="glass-card border-0">
          <CardContent className="py-12 text-center text-gray-400">
            No students have submitted yet.
          </CardContent>
        </Card>
      )}

      {/* SUBMISSIONS */}
      <div className="space-y-6">
        {submissions.map((s) =>{
        const isGraded =
        initialGradedIds.includes(s.id) || savedIds.includes(s.id);
        return (    
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-edu-blue" />
                    <span className="text-white">
                      Student ID: {s.studentId}
                    </span>
                  </div>

                  {isGraded && (
                <Badge className="bg-edu-green text-black">
                    Already Graded
                </Badge>
                )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* TEXT SUBMISSION */}
                {s.content && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      Text Submission
                    </p>
                    <div className="p-4 rounded-lg bg-white/5 text-gray-200">
                      {s.content}
                    </div>
                  </div>
                )}

                {/* FILE SUBMISSION */}
                {s.fileUrl && (
                  <a
                    href={`http://localhost:5000${s.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-edu-blue hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Download Submitted File
                  </a>
                )}

                {/* GRADING */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Grade (e.g. 8/10 or A+)"
                    value={s.grade || ""}
                    onChange={(e) =>
                      updateField(s.id, "grade", e.target.value)
                    }
                  />

                  <Textarea
                    placeholder="Feedback (optional)"
                    value={s.feedback || ""}
                    onChange={(e) =>
                      updateField(s.id, "feedback", e.target.value)
                    }
                    className="min-h-24"
                  />
                </div>

                <Button
                    onClick={() => handleSaveGrade(s)}
                    disabled={savingId === s.id || isGraded}
                    className="bg-edu-blue"
                    >
                    <Save className="w-4 h-4 mr-2" />
                    {savingId === s.id
                        ? "Saving..."
                        : isGraded
                        ? "Graded"
                        : "Save Grade"}
                </Button>

                {savedIds.includes(s.id) && (
                    <p className="text-sm text-edu-green mt-2">
                        ✓ Grade saved successfully
                    </p>
                    )}
              </CardContent>
            </Card>
          </motion.div>
        );
    })}
      </div>
    </div>
  );
}
