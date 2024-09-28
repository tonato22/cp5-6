import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TargetList from '../TargetList';
import TargetForm from '../TargetForm';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';

const baseUrl = 'https://todo-caio.azurewebsites.net/api/';

const App = () => {
    const [targets, setTargets] = useState([]);
    const [todos, setTodos] = useState([]);
    const [currentTargetId, setCurrentTargetId] = useState(null);
    const [currentTodoId, setCurrentTodoId] = useState(null);

    const getTargets = async () => {
        const response = await axios.get(`${baseUrl}Targets`);
        setTargets(response.data);
    };

    const getTodosByTarget = async (id) => {
        const response = await axios.get(`${baseUrl}Targets/${id}/Todos`);
        setTodos(response.data);
    };

    const addTarget = async (target) => {
        const response = await axios.post(`${baseUrl}Targets`, target);
        setTargets([...targets, response.data]);
    };

    const updateTarget = async (id, updatedTarget) => {
        const response = await axios.put(`${baseUrl}Targets/${id}`, updatedTarget);
        setTargets(targets.map(t => (t.id === id ? response.data : t)));
    };

    const deleteTarget = async (id) => {
        await axios.delete(`${baseUrl}Targets/${id}`);
        setTargets(targets.filter(t => t.id !== id));
    };

    const addTodo = async (todo) => {
        const response = await axios.post(`${baseUrl}Todo`, todo);
        setTodos([...todos, response.data]);
    };

    const updateTodo = async (id, updatedTodo) => {
        const response = await axios.put(`${baseUrl}Todo/${id}`, updatedTodo);
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${baseUrl}Todo/${id}`);
        setTodos(todos.filter(t => t.id !== id));
    };

    useEffect(() => {
        getTargets();
    }, []);

    return (
        <div>
            <h1>Targets</h1>
            <TargetForm addTarget={addTarget} />
            <TargetList targets={targets} setCurrentTargetId={setCurrentTargetId} deleteTarget={deleteTarget} />
            <h2>TODOs</h2>
            {currentTargetId && (
                <TodoForm addTodo={addTodo} targetId={currentTargetId} />
            )}
            <TodoList todos={todos} setCurrentTodoId={setCurrentTodoId} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
