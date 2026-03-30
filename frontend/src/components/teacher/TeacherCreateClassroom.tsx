import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { createClassroom as createClassroomAPI } from "../../api"; 
import { toast } from "sonner";  


import {
  BookOpen,
  Globe,
  Cpu,
  Sigma,
  Atom,
  FlaskRound,
  Eye,
  Save,
  PlusCircle,
  Copy
} from 'lucide-react';

const subjectIcons: Record<string, any> = {
  "Web Development": Globe,
  "Computer Science": Cpu,
  "Mathematics": Sigma,
  "Physics": Atom,
  "Chemistry": FlaskRound,
  "Software Engineering": BookOpen,
};

const subjectColors: Record<string, string> = {
  "Web Development": "text-edu-blue",
  "Computer Science": "text-edu-green",
  "Mathematics": "text-edu-purple",
  "Physics": "text-edu-amber",
  "Chemistry": "text-edu-red",
  "Software Engineering": "text-edu-blue",
};
interface TeacherCreateClassroomProps {
  onTabChange: (tab: string) => void;
}

export default function TeacherCreateClassroom({onTabChange,}:TeacherCreateClassroomProps) {
  const [previewMode, setPreviewMode] = useState(false);

  const [classroom, setClassroom] = useState({
    name: "",
    description: "",
    allowJoinWithCode: true
  });

  const handleCreate = async () => {
  if (!classroom.name) {
    toast.error("Classroom name and subject are required!");
    return;
  }

  try {
    const payload = {
      name: classroom.name,
      description: classroom.description,
      allowJoinWithCode: classroom.allowJoinWithCode,
    };

    console.log("Sending to backend:", payload);

    const res = await createClassroomAPI(payload);

    toast.success("Classroom created successfully!");
    if (onTabChange) {
      onTabChange("classrooms");
    }
    console.log("Created classroom:", res.data);
    

  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to create classroom.");
  }
};


  if (previewMode) {
    const Icon = BookOpen;
    const colorClass =  "text-edu-blue";

    return (
      <div className="p-6 h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl neon-blue">Classroom Preview</h1>
              <p className="text-muted-foreground">How your classroom will appear</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
              className="glass border-[var(--glass-border)]"
            >
              Back to Editor
            </Button>
          </div>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl neon-blue flex items-center gap-3">
                <Icon className={`w-7 h-7 ${colorClass}`} />
                {classroom.name || "Untitled Classroom"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-muted-foreground">
                  {classroom.description || "No description added"}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Join Settings</h3>
                <p className="text-sm text-muted-foreground">
                  {classroom.allowJoinWithCode
                    ? "Students can join using the classroom code."
                    : "Students require approval to join."}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-mono text-edu-blue">Code will be generated after creation</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl neon-green">Create Classroom</h1>
            <p className="text-muted-foreground">Organize students under a new class</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setPreviewMode(true)}
              variant="outline"
              className="glass border-[var(--glass-border)] hover:glow-blue"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 neon-green" />
                  Basic Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <Label>Classroom Name *</Label>
                    <Input
                      placeholder="e.g., Data Structures 101"
                      className="glass border-[var(--glass-border)] focus:glow-green"
                      value={classroom.name}
                      onChange={(e) => setClassroom({ ...classroom, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    placeholder="Write a short description or welcome message..."
                    className="glass border-[var(--glass-border)] focus:glow-green"
                    value={classroom.description}
                    onChange={(e) => setClassroom({ ...classroom, description: e.target.value })}
                  />
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 neon-blue" />
                  Settings
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Joining with Code</Label>
                    <p className="text-xs text-muted-foreground">
                      Students can join directly if they have the code.
                    </p>
                  </div>
                  <Switch
                    checked={classroom.allowJoinWithCode}
                    onCheckedChange={(checked:boolean) =>
                      setClassroom({ ...classroom, allowJoinWithCode: checked })
                    }
                  />
                </div>

                <div className="p-4 glass border border-[var(--glass-border)] rounded-lg">
                  <p className="text-sm text-muted-foreground">Classroom Code:</p>
                  <p className="font-mono text-edu-blue mt-1">
                    Will be generated after creation
                  </p>
                </div>

              </CardContent>
            </Card>

            <Button
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Classroom
            </Button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
