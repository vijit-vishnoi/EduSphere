import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Send,
  CheckCircle,
} from "lucide-react";

import {getAssignmentById, getAssignmentsByClassroom, submitAssignment, getMySubmissions } from "../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

interface Props {
  assignmentId: string;
  onBack: () => void;
}
export default function StudentAssignmentPage({
    assignmentId,
    onBack,
  }: Props) {
  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
  const load = async () => {
    try {
      // 1️⃣ ALWAYS load assignment (never fails)
      const a = await getAssignmentById(assignmentId);
      setAssignment(a.data.assignment);

      // 2️⃣ Try loading submission (may not exist)
      try {
        const sub = await getMySubmissions(assignmentId);
        setSubmission(sub.data.submission);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setSubmission(null); // not submitted yet → OK
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error("Error loading assignment:", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [assignmentId]);


  const handleSubmit = async () => {
  try {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("content", text);
    if (file) {
      formData.append("file", file);
    }
    const res = await submitAssignment(formData);

    setSubmission(res.data.submission);

    setText("");
    setFile(null);
  } catch (err) {
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return <div className="p-6 text-gray-400">Loading assignment…</div>;
  }

  if (!assignment) {
    return <div className="p-6 text-red-400">Assignment not found</div>;
  }

  const isSubmitted = Boolean(submission);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* BACK */}
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {assignment.title}
            </CardTitle>
            <div className="flex gap-4 text-gray-400 text-sm mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {assignment.dueDate}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {assignment.points} points
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-300 mb-4">
              {assignment.description}
            </p>

            {isSubmitted && (
              <Badge className="bg-edu-green text-black">
                <CheckCircle className="w-4 h-4 mr-1" />
                Submitted
              </Badge>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* SUBMISSION */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle>Submit Assignment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {isSubmitted ? (
            <p className="text-gray-400">
              You have already submitted this assignment.
            </p>
          ) : (
            <>
              {assignment.requireTextSubmission && (
                <Textarea
                  placeholder="Write your submission here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-40"
                />
              )}
              {assignment.requireFileUpload && (
                <div className="space-y-2">
                  <label htmlFor="assignment-file" className="text-sm text-gray-300">
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="assignment-file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-300
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:bg-edu-blue file:text-black
                              hover:file:bg-edu-blue/80"
                  />
                </div>
              )}
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-edu-blue"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* GRADE */}
      {submission?.grade !== undefined && (
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Grade</CardTitle>
          </CardHeader>
          <CardContent className="text-edu-green text-xl">
            {submission.grade} / {assignment.points}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
