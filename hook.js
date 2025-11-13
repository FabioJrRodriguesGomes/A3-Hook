import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Ajuste para a URL do seu backend Spring Boot

export function useFAQCrud() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Função auxiliar para limpar mensagens
    const clearMessages = () => {
        setError(null);
        setSuccess(false);
    };

    // Buscar todos os FAQs
    const fetchFaqs = async () => {
        clearMessages();
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/faqs`);
            setFaqs(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar FAQs');
            console.error('Erro ao buscar FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Criar novo FAQ
    const createFaq = async (pergunta, resposta) => {
        clearMessages();
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/faqs`, {
                pergunta,
                resposta
            });
            setFaqs(prev => [...prev, response.data]);
            setSuccess(true);
            return true;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao criar FAQ');
            console.error('Erro ao criar FAQ:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Atualizar FAQ existente
    const updateFaq = async (id, pergunta, resposta) => {
        clearMessages();
        setLoading(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/faqs/${id}`, {
                id,
                pergunta,
                resposta
            });
            setFaqs(prev =>
                prev.map(faq =>
                    faq.id === id ? response.data : faq
                )
            );
            setSuccess(true);
            return true;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao atualizar FAQ');
            console.error('Erro ao atualizar FAQ:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Deletar FAQ
    const deleteFaq = async (id) => {
        clearMessages();
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/faqs/${id}`);
            setFaqs(prev => prev.filter(faq => faq.id !== id));
            setSuccess(true);
            return true;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao deletar FAQ');
            console.error('Erro ao deletar FAQ:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Buscar FAQ por ID
    const getFaqById = async (id) => {
        clearMessages();
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/faqs/${id}`);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Erro ao buscar FAQ específico');
            console.error('Erro ao buscar FAQ específico:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return {
        faqs,
        loading,
        error,
        success,
        createFaq,
        updateFaq,
        deleteFaq,
        getFaqById,
        refreshFaqs: fetchFaqs
    };
}