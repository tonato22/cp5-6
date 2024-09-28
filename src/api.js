import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-caio.azurewebsites.net/api/',
});

export const getTargets = () => api.get('/targets');
export const getTodosByTarget = (targetId) => api.get(`/targets/${targetId}/todos`);
export const createTarget = (data) => api.post('/targets', data);
export const createTodo = (targetId, data) => api.post(`/targets/${targetId}/todos`, data);
export const updateTarget = (targetId, data) => api.put(`/targets/${targetId}`, data);
export const updateTodo = (todoId, data) => api.put(`/todos/${todoId}`, data);
export const deleteTarget = (targetId) => api.delete(`/targets/${targetId}`);
export const deleteTodo = (todoId) => api.delete(`/todos/${todoId}`);

