import React, { useState } from 'react';

const TodoForm = ({ addTodo, targetId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ title, description, isComplete: false, targetId });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do TODO"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do TODO"
            />
            <button type="submit">Adicionar TODO</button>
        </form>
    );
};

export default TodoForm;
