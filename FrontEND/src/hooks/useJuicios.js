import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/juicios';

export const useJuicios = () => {
  const [juicios, setJuicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAxiosConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  const fetchJuicios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL, getAxiosConfig());
      setJuicios(response.data.juicios);
    } catch (err) {
      console.error('Error al cargar juicios:', err);
      setError('Error al cargar los juicios');
    } finally {
      setLoading(false);
    }
  };

  const deleteJuicio = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAxiosConfig());
      await fetchJuicios(); // Recargar lista
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar juicio:', err);
      return { success: false, error: 'Error al eliminar juicio' };
    }
  };

  useEffect(() => {
    fetchJuicios();
  }, []);

  return {
    juicios,
    loading,
    error,
    fetchJuicios,
    deleteJuicio
  };
};
