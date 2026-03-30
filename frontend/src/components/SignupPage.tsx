import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, GraduationCap, BookOpen, User, Mail, Lock } from 'lucide-react';
import {register} from '../api.ts'

interface SignupPageProps {
  onSignup: (role: 'student' | 'teacher') => void;
  onNavigateToLogin: () => void;
}

export default function SignupPage({ onSignup, onNavigateToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Account Details', icon: Mail },
    { title: 'Security', icon: Lock }
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    if (e)e.preventDefault();
    console.log("SUBMIT CALLED! formData:", formData); 
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    alert("Please fill out all required fields.");
    return;
  }
    try {
    const res = await register(formData);
    console.log("🚀 Signup request sent to backend with:", formData);

    const user = res.data.user;
    const userRole: 'student' | 'teacher' = user.role;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', res.data.token);

onSignup(userRole);

  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || 'Signup failed');
  }
  };

  const nextStep = () => {
  if (currentStep === 0) {
    if (!formData.firstName || !formData.lastName) {
      alert('Please fill in your name.');
      return;
    }
  } else if (currentStep === 1) {
    if (!formData.email) {
      alert('Please enter your email.');
      return;
    }
  } else if (currentStep === 2) {
    if (!formData.password || !formData.confirmPassword) {
      alert('Please fill in your password.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  }

  if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
};

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-card border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] p-1"
            >
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 neon-green" />
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl neon-green">Join EduSphere</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account and start your learning journey
            </CardDescription>

            <div className="flex justify-center space-x-4 mt-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-2 ${
                    index <= currentStep ? 'neon-green' : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep ? 'border-[var(--neon-green)] glow-green' : 'border-muted-foreground'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{step.title}</span>
                </motion.div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="space-y-4"
            >
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="glass border-[var(--glass-border)] focus:glow-green"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="glass border-[var(--glass-border)] focus:glow-green"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">I am a</Label>
                      <Select value={formData.role} onValueChange={(value: 'student' | 'teacher') => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="glass border-[var(--glass-border)] hover:glow-green">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-[var(--glass-border)]">
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
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@edusphere.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass border-[var(--glass-border)] focus:glow-green"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="glass border-[var(--glass-border)] focus:glow-green pr-10"
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="glass border-[var(--glass-border)] focus:glow-green pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between space-x-4">
                {currentStep > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="glass border-[var(--glass-border)] hover:glow-blue"
                    >
                      Previous
                    </Button>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto"
                >
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green border-0 text-background"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green border-0 text-background"
                    >
                      Create Account
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Already have an account?</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onNavigateToLogin}
                  variant="outline"
                  className="w-full glass border-[var(--glass-border)] hover:glow-blue"
                >
                  Sign In
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}