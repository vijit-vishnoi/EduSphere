import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, GraduationCap, BookOpen } from 'lucide-react';
import { login } from '../api';

interface LoginPageProps {
  onLogin: (role: 'student' | 'teacher') => void;
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
}

export default function LoginPage({ onLogin, onNavigateToSignup, onNavigateToForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await login(email, password);
      const user = res.data.user;
      const token = res.data.token;
      const userRole: 'student' | 'teacher' = user.role;

      localStorage.setItem('user', JSON.stringify(user));
       localStorage.setItem('token', token);

      onLogin(userRole);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-full bg-edu-blue p-1"
            >
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl text-edu-blue">Welcome to EduSphere</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your learning platform
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Login as</Label>
                <Select value={role} onValueChange={(value: 'student' | 'teacher') => setRole(value)}>
                  <SelectTrigger className="glass border-[var(--edu-border)] hover:glow-blue">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-[var(--edu-border)]">
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Teacher
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@edusphere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass border-[var(--edu-border)] focus:glow-blue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass border-[var(--edu-border)] focus:glow-blue pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full edu-button-primary border-0">
                  Sign In
                </Button>
              </motion.div>
              {error && (
                <div className="flex justify-center">
                  <div className="text-red-600 text-sm font-medium  bg-red-100 rounded text-center">
                    {error}
                  </div>
                </div>
              )}
            </form>

            <div className="space-y-4">
              <button
                onClick={onNavigateToForgotPassword}
                className="w-full text-center text-sm text-muted-foreground hover:text-edu-blue cursor-pointer"
              >
                Forgot your password?
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Don't have an account?</p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onNavigateToSignup}
                    variant="outline"
                    className="w-full glass border-[var(--edu-border)] hover:glow-green"
                  >
                    Create Account
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
