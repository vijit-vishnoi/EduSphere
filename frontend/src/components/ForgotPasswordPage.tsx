import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Mail, CheckCircle, RotateCcw } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
}

export default function ForgotPasswordPage({ onNavigateToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setEmail('');
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
              className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)] p-1"
            >
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                {isSubmitted ? (
                  <CheckCircle className="w-8 h-8 neon-green" />
                ) : (
                  <Mail className="w-8 h-8 neon-pink" />
                )}
              </div>
            </motion.div>
            
            <CardTitle className="text-2xl neon-pink">
              {isSubmitted ? 'Check Your Email' : 'Forgot Password?'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSubmitted 
                ? "We've sent a password reset link to your email address"
                : "Don't worry! Enter your email and we'll send you a reset link"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass border-[var(--glass-border)] focus:glow-pink"
                    required
                    disabled={isLoading}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)] hover:glow-pink border-0 text-background"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="loading-spinner w-4 h-4"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-lg glass border border-[var(--glass-border)]">
                    <p className="text-sm text-muted-foreground">
                      If an account with <span className="neon-green">{email}</span> exists, 
                      you'll receive a password reset email within a few minutes.
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleResend}
                      variant="outline"
                      className="glass border-[var(--glass-border)] hover:glow-orange"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onNavigateToLogin}
                variant="ghost"
                className="text-muted-foreground hover:neon-blue"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}