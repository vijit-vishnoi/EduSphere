import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { joinClassroom as joinClassroomAPI } from '../../api';

export default function StudentJoinClassroom({
  onTabChange
}: {
  onTabChange: (tab: string) => void;
}) {
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!code.trim()) {
      toast.error("Please enter a classroom code");
      return;
    }

    try {
      setLoading(true);
      const res = await joinClassroomAPI(code);

      toast.success("Successfully joined classroom!");

      onTabChange("classrooms");

    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to join classroom");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl text-edu-blue">Join a Classroom</h1>
          <p className="text-muted-foreground">
            Enter the classroom code shared by your teacher
          </p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-xl text-edu-blue">
              Enter Classroom Code
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Classroom Code</Label>
              <Input
                placeholder="e.g., A1B2C3"
                className="glass border-[var(--edu-border)] focus:glow-blue"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <Button
              onClick={handleJoin}
              disabled={loading}
              className="w-full edu-button-primary"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              {loading ? "Joining..." : "Join Classroom"}
            </Button>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="glass hover:glow-blue"
          onClick={() => onTabChange("classrooms")}
        >
          Back to Classrooms
        </Button>
      </motion.div>
    </div>
  );
}
