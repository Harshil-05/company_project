import React from 'react';

const KanbanCard = ({ ticket }) => {
  return (
    <div className="kanban-card">
      <p>{ticket.id}</p>
      <h3>{ticket.title}</h3>
      <div><div>{ticket.tag[0]}</div></div>
    </div>
  );
};

export default KanbanCard;
