import { useState, useEffect, useCallback } from 'react';
import api from '../others/Api';

// TypeScript interfaces
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  experience: number;
  phone?: string;
  department?: string;
  qualification?: string;
  joiningDate?: string;
}

export interface CreateTeacherData {
  name: string;
  subject: string;
  email: string;
  experience: number;
  phone?: string;
  department?: string;
  qualification?: string;
  joiningDate?: string;
}

export interface UseTeacherReturn {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
  fetchTeachers: () => Promise<void>;
  createTeacher: (data: CreateTeacherData) => Promise<Teacher | null>;
  updateTeacher: (id: string, data: Partial<Teacher>) => Promise<Teacher | null>;
  deleteTeacher: (id: string) => Promise<boolean>;
  getTeacherById: (id: string) => Teacher | undefined;
  refreshTeachers: () => Promise<void>;
}

export const useTeacher = (): UseTeacherReturn => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all teachers
  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/teachers');
      setTeachers(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch teachers';
      setError(errorMessage);
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new teacher
  const createTeacher = useCallback(async (data: CreateTeacherData): Promise<Teacher | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/teachers/create', data);
      const newTeacher: Teacher = {
        id: response.data.id.toString(),
        name: response.data.name,
        subject: response.data.subject,
        email: response.data.email,
        experience: response.data.experience,
        phone: response.data.phone,
        department: response.data.department,
        qualification: response.data.qualification,
        joiningDate: response.data.joiningDate,
      };

      setTeachers(prev => [...prev, newTeacher]);
      return newTeacher;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create teacher';
      setError(errorMessage);
      console.error('Error creating teacher:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing teacher
  const updateTeacher = useCallback(async (id: string, data: Partial<Teacher>): Promise<Teacher | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/teachers/${id}`, data);
      const updatedTeacher = response.data;

      setTeachers(prev => 
        prev.map(teacher => 
          teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
        )
      );

      return updatedTeacher;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update teacher';
      setError(errorMessage);
      console.error('Error updating teacher:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a teacher
  const deleteTeacher = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/teachers/${id}`);
      setTeachers(prev => prev.filter(teacher => teacher.id !== id));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete teacher';
      setError(errorMessage);
      console.error('Error deleting teacher:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get teacher by ID
  const getTeacherById = useCallback((id: string): Teacher | undefined => {
    return teachers.find(teacher => teacher.id === id);
  }, [teachers]);

  // Refresh teachers (alias for fetchTeachers)
  const refreshTeachers = useCallback(async () => {
    await fetchTeachers();
  }, [fetchTeachers]);

  // Auto-fetch teachers on mount
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return {
    teachers,
    loading,
    error,
    fetchTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
    refreshTeachers,
  };
};