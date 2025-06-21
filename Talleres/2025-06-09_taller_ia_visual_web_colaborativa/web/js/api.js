// Configuración de la API
const API_CONFIG = {
    baseURL: 'http://localhost:5000',
    endpoints: {
        health: '/health',
        detect: '/detect',
        detectBase64: '/detect-base64',
        results: '/results',
        resultFile: (filename) => `/results/${filename}`
    }
};

// Clase para manejar la API
class APIService {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
    }

    // Verificar salud del servidor
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.health}`);
            return await response.json();
        } catch (error) {
            throw new Error('No se puede conectar al servidor');
        }
    }

    // Detectar objetos con archivo
    async detectObjects(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.detect}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return await response.json();
    }

    // Detectar objetos con base64
    async detectObjectsBase64(imageBase64) {
        const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.detectBase64}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageBase64 })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return await response.json();
    }

    // Listar archivos de resultados
    async listResults() {
        const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.results}`);
        
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return await response.json();
    }

    // Obtener archivo de resultado
    async getResultFile(filename) {
        const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.resultFile(filename)}`);
        
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return await response.blob();
    }

    // Obtener URL de imagen de resultado
    getResultImageURL(filename) {
        return `${this.baseURL}${API_CONFIG.endpoints.resultFile(filename)}`;
    }
}

// Exportar instancia
export const apiService = new APIService();
export default apiService; 