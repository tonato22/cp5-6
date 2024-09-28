import React from 'react';

const TargetList = ({ targets, setCurrentTargetId, deleteTarget }) => {
    return (
        <ul>
            {targets.map(target => (
                <li key={target.id}>
                    {target.title}
                    <button onClick={() => setCurrentTargetId(target.id)}>Ver TODOs</button>
                    <button onClick={() => deleteTarget(target.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    );
};

export default TargetList;
