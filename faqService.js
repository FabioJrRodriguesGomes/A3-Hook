import apiFaq from "./apiFaq"

const API_ENDPOINT = "/api/faq"

export const getAllFaqs = async () => {
    try {
        const response = await apiFaq.get(API_ENDPOINT)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar FAQs:", error)
        throw error
    }
}

export const getFaqById = async (id) => {
    try {
        const response = await apiFaq.get(`${API_ENDPOINT}/${id}`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar FAQ por ID:", error)
        throw error
    }
}

export const createFaq = async (faqData) => {
    try {
        const response = await apiFaq.post(API_ENDPOINT, faqData)
        return response.data
    } catch (error) {
        console.error("Erro ao criar FAQ:", error)
        throw error
    }
}

export const updateFaq = async (id, faqData) => {
    try {
        const response = await apiFaq.put(`${API_ENDPOINT}/${id}`, faqData)
        return response.data
    } catch (error) {
        console.error("Erro ao atualizar FAQ:", error)
        throw error
    }
}

export const patchFaq = async (id, faqData) => {
    try {
        const response = await apiFaq.patch(`${API_ENDPOINT}/${id}`, faqData)
        return response.data
    } catch (error) {
        console.error("Erro ao fazer patch no FAQ:", error)
        throw error
    }
}

export const deleteFaq = async (id) => {
    try {
        const response = await apiFaq.delete(`${API_ENDPOINT}/${id}`)
        return response.data
    } catch (error) {
        console.error("Erro ao deletar FAQ:", error)
        throw error
    }
}
