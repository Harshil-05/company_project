import React from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'status':
        return tickets.reduce((acc, ticket) => {
          acc[ticket.status] = acc[ticket.status] || [];
          acc[ticket.status].push(ticket);
          return acc;
        }, {});
      case 'user':
        return tickets.reduce((acc, ticket) => {
          const user = users.find((u) => u.id === ticket.userId)?.name || 'Unknown';
          acc[user] = acc[user] || [];
          acc[user].push(ticket);
          return acc;
        }, {});
      case 'priority':
        return tickets.reduce((acc, ticket) => {
          const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
          const priorityLabel = priorityLabels[ticket.priority];
          acc[priorityLabel] = acc[priorityLabel] || [];
          acc[priorityLabel].push(ticket);
          return acc;
        }, {});
      default:
        return tickets;
    }
  };

  const sortTickets = (group) => {
    return Object.keys(group).reduce((acc, key) => {
      acc[key] = group[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      return acc;
    }, {});
  };

  const groupedTickets = groupTickets(tickets);
  const sortedGroupedTickets = sortTickets(groupedTickets);

  return (
    <div className="kanban-board">
      {Object.entries(sortedGroupedTickets).map(([group, tickets]) => (
        <KanbanColumn key={group} title={group} tickets={tickets} />
      ))}
    </div>
  );
};

export default KanbanBoard;
