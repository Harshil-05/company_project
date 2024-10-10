import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import useDataFetching from './DataFetching';
import './App.css';

const App = () => {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [showOptions, setShowOptions] = useState(false); // State to toggle the display of options
  const { tickets, users, isLoading } = useDataFetching('https://api.quicksell.co/v1/internal/frontend-assignment');

  // Save grouping and ordering state in localStorage
  useEffect(() => {
    const savedGrouping = localStorage.getItem('kanban-grouping');
    const savedOrdering = localStorage.getItem('kanban-ordering');
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedOrdering) setOrdering(savedOrdering);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('kanban-ordering', ordering);
  }, [ordering]);

  // Toggle the visibility of grouping and ordering options
  const toggleOptions = () => {
    setShowOptions((prevShow) => !prevShow);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div><button onClick={toggleOptions} className="display-button">
          Display
        </button></div>
      <div className="kanban-header">
        {/* Show options when display button is clicked */}
        {showOptions && (
          <div className="options-panel">
            <div>
              <label>Grouping:</label>
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div>
              <label>Ordering:</label>
              <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <KanbanBoard tickets={tickets} users={users} groupBy={grouping} sortBy={ordering} />
    </div>
  );
};

export default App;
