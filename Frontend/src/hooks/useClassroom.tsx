import { useState, useEffect, useCallback } from 'react';
import api from '../others/Api';

// TypeScript interfaces
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  experience: number;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  attendance: number;
}

export interface Classroom {
  id: string;
  name: string;
  section: string;
  subject: string;
  roomNumber: string;
  capacity: number;
  currentStrength: number;
  teacher?: Teacher;
  schedule: Schedule[];
  students: Student[];
}

export interface CreateClassroomData {
  classroomName: string;
  teacherId: string;
  sections: number;
  subject?: string;
  roomNumber?: string;
  capacity?: number;
}

export interface UseClassroomReturn {
  classrooms: Classroom[];
  loading: boolean;
  error: string | null;
  fetchClassrooms: () => Promise<void>;
  createClassroom: (data: CreateClassroomData) => Promise<Classroom | null>;
  updateClassroom: (id: string, data: Partial<Classroom>) => Promise<Classroom | null>;
  deleteClassroom: (id: string) => Promise<boolean>;
  getClassroomById: (id: string) => Classroom | undefined;
  refreshClassrooms: () => Promise<void>;
}

export const useClassroom = (): UseClassroomReturn => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all classrooms
  const fetchClassrooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/classrooms');
      setClassrooms(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch classrooms';
      setError(errorMessage);
      console.error('Error fetching classrooms:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new classroom
  const createClassroom = useCallback(async (data: CreateClassroomData): Promise<Classroom | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/classrooms/create', data);
      const newClassroom: Classroom = {
        id: response.data.id.toString(),
        name: response.data.name,
        section: response.data.section || 'A',
        subject: response.data.subject || '',
        roomNumber: response.data.roomNumber || '',
        capacity: response.data.capacity || 30,
        currentStrength: response.data.currentStrength || 0,
        teacher: response.data.teacher,
        schedule: response.data.schedule || [],
        students: response.data.students || [],
      };

      setClassrooms(prev => [...prev, newClassroom]);
      return newClassroom;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create classroom';
      setError(errorMessage);
      console.error('Error creating classroom:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing classroom
  const updateClassroom = useCallback(async (id: string, data: Partial<Classroom>): Promise<Classroom | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/classrooms/${id}`, data);
      const updatedClassroom = response.data;

      setClassrooms(prev => 
        prev.map(classroom => 
          classroom.id === id ? { ...classroom, ...updatedClassroom } : classroom
        )
      );

      return updatedClassroom;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update classroom';
      setError(errorMessage);
      console.error('Error updating classroom:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a classroom
  const deleteClassroom = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/classrooms/${id}`);
      setClassrooms(prev => prev.filter(classroom => classroom.id !== id));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete classroom';
      setError(errorMessage);
      console.error('Error deleting classroom:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get classroom by ID
  const getClassroomById = useCallback((id: string): Classroom | undefined => {
    return classrooms.find(classroom => classroom.id === id);
  }, [classrooms]);

  // Refresh classrooms (alias for fetchClassrooms)
  const refreshClassrooms = useCallback(async () => {
    await fetchClassrooms();
  }, [fetchClassrooms]);

  // Auto-fetch classrooms on mount
  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  return {
    classrooms,
    loading,
    error,
    fetchClassrooms,
    createClassroom,
    updateClassroom,
    deleteClassroom,
    getClassroomById,
    refreshClassrooms,
  };
};