import api from './axios';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

// --------------------
// AUTH
// --------------------
export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });

  // store token
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }

  return res;
};

export const register = (data: RegisterData) =>
  api.post('/auth/register', data);

export const fetchProfile = () =>
  api.get('/auth/profile');

// --------------------
// CLASSROOMS
// --------------------
export const createClassroom = (data: any) =>
  api.post('/classrooms', data);

export const joinClassroom = (code: string) =>
  api.post('/classrooms/join', { code });

export const getMyClassrooms = () =>
  api.get('/classrooms/my');

export const getClassroomById = (classroomId: string) =>
  api.get(`/classrooms/${classroomId}`);

// --------------------
// ASSIGNMENTS
// --------------------
export const getAssignmentsByClassroom = (classroomId: string) =>
  api.get(`/assignments/${classroomId}`);

export const createAssignment = (data: any) =>
  api.post('/assignments', data);

// --------------------
// SUBMISSIONS
// --------------------
export const submitAssignment = (data: any) =>
  api.post('/submissions', data);

export const getMySubmissions = (assignmentId: string) =>
  api.get(`/submissions/${assignmentId}/mine`);

export const gradeSubmission = (submissionId: string, grade: number) =>
  api.patch(`/submissions/${submissionId}/grade`, { grade });

// --------------------
// COMMENTS
// --------------------
export const addComment = (data: any) =>
  api.post('/comments', data);

export const getComments = (assignmentId: string) =>
  api.get(`/comments/${assignmentId}`);
