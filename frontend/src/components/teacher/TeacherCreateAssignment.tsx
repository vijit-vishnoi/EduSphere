import React, { useState } from "react";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { createAssignment } from "../../api";

export default function TeacherCreateAssignment({
  classroomId,
  onTabChange,
}: {
  classroomId: string;
  onTabChange: (tab: string) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: undefined as Date | undefined,
    maxPoints: 100,
    allowLateSubmissions: false,
    requireTextSubmission: true,  
    requireFileUpload: false      
  });

  const handleCreate = async () => {
  try {
    const payload = {
      classroomId,
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      points: form.maxPoints,
      allowLateSubmissions: form.allowLateSubmissions,
      requireTextSubmission: form.requireTextSubmission,    
      requireFileUpload: form.requireFileUpload           
    };

    const res = await createAssignment(payload);
    onTabChange("classroom-details");

  } catch (err) {
    console.error("Assignment create failed:", err);
    alert("Failed to create assignment");
  }
};

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <div>
          <h1 className="text-3xl text-edu-blue font-semibold">
            Create Assignment
          </h1>
          <p className="text-muted-foreground">
            Add a new assignment for your students.
          </p>
        </div>

        <Card className="glass-card border border-[var(--edu-border)]">
          <CardHeader>
            <CardTitle className="text-lg text-edu-blue">
              Assignment Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="space-y-2">
              <Label>Assignment Title *</Label>
              <Input
                placeholder="e.g., React Project"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="glass border-[var(--edu-border)]"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Write assignment description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="min-h-28 glass border-[var(--edu-border)]"
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start glass border-[var(--edu-border)]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.dueDate ? format(form.dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 glass-card w-auto border-[var(--edu-border)]">
                  <Calendar
                    mode="single"
                    selected={form.dueDate}
                    onSelect={(date: Date | undefined) => setForm({ ...form, dueDate: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Maximum Points</Label>
              <Input
                type="number"
                min={1}
                value={form.maxPoints}
                onChange={(e) =>
                  setForm({ ...form, maxPoints: parseInt(e.target.value) || 1 })
                }
                className="glass border-[var(--edu-border)]"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Allow Late Submissions</Label>
              <Switch
                checked={form.allowLateSubmissions}
                onCheckedChange={(checked: boolean) =>
                  setForm({ ...form, allowLateSubmissions: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Require Text Submission</Label>
              <Switch
                checked={form.requireTextSubmission}
                onCheckedChange={(checked: boolean) =>
                  setForm({ ...form, requireTextSubmission: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Require File Upload</Label>
              <Switch
                checked={form.requireFileUpload}
                onCheckedChange={(checked: boolean) =>
                  setForm({ ...form, requireFileUpload: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] text-background hover:glow-green"
            onClick={handleCreate}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Publish Assignment
          </Button>

          <Button
            variant="outline"
            className="glass border-[var(--edu-border)]"
            onClick={() => onTabChange("classroom-details")}
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
