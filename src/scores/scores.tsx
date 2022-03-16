import React, { useEffect, useState } from 'react';
import './scores.css';
import { axiosClient } from '../axios';

const Scores = () => {
  const [tasks, setTasks] = useState<Record<string, string | number>[]>([]);

  useEffect(() => {
    axiosClient.get('api/scores').then(resp => setTasks(resp.data));
  }, []);

  return (
    <div className="scores-container">
      <div className="scores">
        <div className="scores-item scores-item-header">
          <div className="name">NAME</div>
          <div className="solutions">SUCCESS SOLUTIONS</div>
          <div className="tasks">TASKS</div>
        </div>

        {tasks.map(task => (
          <div className="scores-item">
            <div className="name">{task.userName}</div>
            <div className="solutions">{task.numberOfSuccessSolutions}</div>
            <div className="tasks">{task.tasksName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scores;
