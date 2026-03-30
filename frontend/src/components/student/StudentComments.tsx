import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { 
  MessageSquare, 
  Send, 
  Reply, 
  ThumbsUp, 
  Filter,
  Search
} from 'lucide-react';

export default function StudentComments() {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const comments = [
    {
      id: 1,
      assignment: 'React Fundamentals Project',
      teacher: 'Prof. Johnson',
      teacherAvatar: 'PJ',
      comment: 'Great progress on the component structure! I noticed you\'re using functional components with hooks, which is excellent. Make sure to implement proper error boundaries for better user experience.',
      timestamp: '2 hours ago',
      likes: 3,
      replies: [
        {
          id: 11,
          author: 'You',
          avatar: 'ME',
          comment: 'Thank you for the feedback! I\'ll implement error boundaries in the next iteration. Should I use React.ErrorBoundary or create custom ones?',
          timestamp: '1 hour ago',
          likes: 1
        },
        {
          id: 12,
          author: 'Prof. Johnson',
          avatar: 'PJ',
          comment: 'Custom error boundaries would be great for this project. It shows deeper understanding of React concepts.',
          timestamp: '30 minutes ago',
          likes: 2
        }
      ]
    },
    {
      id: 2,
      assignment: 'Database Design Assignment',
      teacher: 'Dr. Smith',
      teacherAvatar: 'DS',
      comment: 'Your ERD looks good, but I think you need to review the normalization process. The current schema has some redundancy that could be eliminated.',
      timestamp: '1 day ago',
      likes: 5,
      replies: []
    },
    {
      id: 3,
      assignment: 'Algorithm Analysis',
      teacher: 'Dr. Wilson',
      teacherAvatar: 'DW',
      comment: 'Excellent analysis of time complexity! Your explanation of the trade-offs between different sorting algorithms is particularly insightful.',
      timestamp: '2 days ago',
      likes: 7,
      replies: [
        {
          id: 31,
          author: 'You',
          avatar: 'ME',
          comment: 'Thank you! I found the comparison between quicksort and mergesort particularly interesting.',
          timestamp: '2 days ago',
          likes: 3
        }
      ]
    }
  ];

  const handlePostComment = () => {
    console.log('Posting comment:', newComment);
    setNewComment('');
  };

  const handleReply = (commentId: number) => {
    console.log('Replying to comment:', commentId, 'with:', replyText);
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl neon-green">Comments & Discussions</h1>
            <p className="text-muted-foreground">Engage with your teachers and get feedback</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="glass border-[var(--glass-border)]">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search comments..." 
                className="pl-10 w-64 glass border-[var(--glass-border)] focus:glow-green" 
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 neon-green" />
                <span>Start a Discussion</span>
              </CardTitle>
              <CardDescription>
                Ask questions or share thoughts about your assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What would you like to discuss?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-24 glass border-[var(--glass-border)] focus:glow-green"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Be respectful and constructive in your discussions
                </p>
                <Button 
                  onClick={handlePostComment}
                  className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] text-background">
                          {comment.teacherAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{comment.teacher}</h4>
                            <Badge variant="outline" className="text-xs">Teacher</Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {comment.assignment}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{comment.comment}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="hover:glow-blue">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setReplyingTo(comment.id)}
                            className="hover:glow-green"
                          >
                            <Reply className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="ml-14 space-y-3"
                      >
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="glass border-[var(--glass-border)] focus:glow-green"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleReply(comment.id)}
                            size="sm"
                            className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] hover:glow-green text-background"
                          >
                            Post Reply
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {comment.replies.length > 0 && (
                      <div className="ml-14 space-y-4 border-l-2 border-[var(--glass-border)] pl-4">
                        {comment.replies.map((reply, replyIndex) => (
                          <motion.div
                            key={reply.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * replyIndex }}
                            className="flex items-start space-x-3"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className={`${
                                reply.author === 'You' 
                                  ? 'bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)]' 
                                  : 'bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)]'
                              } text-background`}>
                                {reply.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{reply.comment}</p>
                              <Button variant="ghost" size="sm" className="hover:glow-blue p-0 h-auto">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Pagination>
            <PaginationContent className="glass border border-[var(--glass-border)] rounded-lg">
              <PaginationItem>
                <PaginationPrevious href="#" className="hover:glow-blue" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] text-background">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:glow-green">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:glow-green">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="hover:glow-blue" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      </motion.div>
    </div>
  );
}