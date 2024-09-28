import React from 'react';

const TodoList = ({ todos, setCurrentTodoId, deleteTodo }) => {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.title}
                    <button onClick={() => setCurrentTodoId(todo.id)}>Editar</button>
                    <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
