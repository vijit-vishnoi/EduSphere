import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  BookOpen,
  Camera,
  Save,
  Shield,
  Eye,
  EyeOff,
  Palette
} from 'lucide-react';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@edusphere.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Computer Science student passionate about web development and machine learning.',
    joinDate: 'September 2024',
    studentId: 'CS2024001'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    showProgress: true,
    allowComments: true
  });

  const [themeSettings, setThemeSettings] = useState({
    darkMode: true,
    accentColor: 'blue',
    animations: true,
    compactMode: false
  });

  const achievements = [
    { name: 'First Assignment', description: 'Submitted your first assignment', icon: BookOpen, earned: true },
    { name: 'Perfect Score', description: 'Got 100% on an assignment', icon: Award, earned: true },
    { name: 'Discussion Starter', description: 'Started 10 discussions', icon: User, earned: false },
    { name: 'Helpful Student', description: 'Received 50 likes on comments', icon: Award, earned: false }
  ];

  const subjects = [
    { name: 'Web Development', progress: 85, grade: 'A-', assignments: 12 },
    { name: 'Computer Science', progress: 72, grade: 'B+', assignments: 8 },
    { name: 'Mathematics', progress: 90, grade: 'A', assignments: 15 },
    { name: 'Data Structures', progress: 68, grade: 'B', assignments: 6 }
  ];

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile:', profile);
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl neon-purple">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`${
              isEditing 
                ? 'bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background' 
                : 'glass border border-[var(--glass-border)] hover:glow-purple'
            }`}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 neon-purple" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-background text-xl">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:glow-blue text-background"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl neon-purple">{profile.firstName} {profile.lastName}</h3>
                      <p className="text-muted-foreground">Student ID: {profile.studentId}</p>
                      <Badge variant="outline" className="border-[var(--neon-green)] text-[var(--neon-green)]">
                        Active Student
                      </Badge>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="glass border-[var(--glass-border)] focus:glow-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="glass border-[var(--glass-border)] focus:glow-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="glass border-[var(--glass-border)] focus:glow-purple"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="glass border-[var(--glass-border)] focus:glow-purple"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="glass border-[var(--glass-border)] focus:glow-purple"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      className="glass border-[var(--glass-border)] focus:glow-purple"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="glass border-[var(--glass-border)]"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 neon-blue" />
                    <span>Academic Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {subject.assignments} assignments • Grade: {subject.grade}
                          </p>
                        </div>
                        <span className="neon-blue">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center space-y-1">
                      <p className="text-2xl neon-green">87%</p>
                      <p className="text-xs text-muted-foreground">Overall Grade</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl neon-blue">41</p>
                      <p className="text-xs text-muted-foreground">Assignments</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl neon-purple">16</p>
                      <p className="text-xs text-muted-foreground">Comments</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-2xl neon-pink">4</p>
                      <p className="text-xs text-muted-foreground">Subjects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 neon-orange" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-3 glass border border-[var(--glass-border)] rounded-lg ${
                        achievement.earned ? 'glow-green' : 'opacity-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <achievement.icon className={`w-5 h-5 ${
                          achievement.earned ? 'neon-green' : 'text-muted-foreground'
                        }`} />
                        <div>
                          <h5 className="text-sm font-medium">{achievement.name}</h5>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 neon-pink" />
                    <span>Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(privacySettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setPrivacySettings(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 neon-green" />
                    <span>Appearance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(themeSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                      </div>
                      {typeof value === 'boolean' ? (
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setThemeSettings(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{value}</span>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}