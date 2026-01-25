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
export const getAssignmentById = (assignmentId: string) =>
  api.get(`/assignments/${assignmentId}`);

export const getAssignmentsByClassroom = (classroomId: string) =>
  api.get(`/assignments/classroom/${classroomId}`);

export const createAssignment = (data: any) =>
  api.post('/assignments', data);

// --------------------
// SUBMISSIONS
// --------------------
export const submitAssignment = (formData: FormData) =>
  api.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


export const getMySubmissions = (assignmentId: string) =>
  api.get(`/submissions/${assignmentId}/mine`);

export const getSubmissionsForAssignment = (assignmentId: string) =>
  api.get(`/submissions/assignment/${assignmentId}`);

export const gradeSubmission = (
  submissionId: string,
  payload: { grade: string; feedback?: string}) =>
  api.patch(`/submissions/${submissionId}/grade`, payload);

// --------------------
// COMMENTS
// --------------------
export const addComment = (data: any) =>
  api.post('/comments', data);

export const getComments = (assignmentId: string) =>
  api.get(`/comments/${assignmentId}`);
