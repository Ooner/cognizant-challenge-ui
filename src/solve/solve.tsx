import React, { useState, useEffect, useCallback } from 'react';
import './solve.css';
import { axiosClient } from '../axios';

type Task = {
  id?: number;
  name?: string;
  description?: string;
  parameter?: string;
  output?: string;
};

const Solve = () => {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>({});
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [solution, setSolution] = useState('');

  const { id: taskId, description, parameter, output } = selectedTask;

  useEffect(() => {
    axiosClient.get('api/task').then(resp => {
      setTasks(resp.data);
      setSelectedTask(resp.data[0]);
    });
  }, []);

  const onSelectTask = useCallback(
    (selectedTaskId: string) => {
      const task = tasks.find(t => t.id === +selectedTaskId);
      if (task) {
        setSelectedTask(task);
      }
    },
    [tasks]
  );

  const onFormSubmit = useCallback(
    e => {
      e.preventDefault();
      axiosClient
        .post('api/execute', {
          script: solution,
          language: selectedLanguage,
          userName: name,
          taskId,
        })
        .then(() => {
          alert('Your Solution is Accepted');
        })
        .catch(() => alert('Your Solution is not accepted'));
    },
    [solution, selectedLanguage, name, taskId]
  );

  return (
    <div className="solve-container">
      <form onSubmit={onFormSubmit}>
        <div className="solve-item-container">
          <div className="solve-item-label">NAME</div>
          <input
            className="solve-item solve-item-input"
            type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="solve-item-container">
          <div className="solve-item-label">SELECT TASK</div>
          <select
            className="solve-item solve-item-input"
            value={taskId}
            required
            onChange={e => onSelectTask(e.target.value)}
          >
            {tasks.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="solve-item-container">
          <div className="solve-item-label">SELECT LANGUAGE</div>
          <select
            className="solve-item solve-item-input"
            value={selectedLanguage}
            required
            onChange={e => setSelectedLanguage(e.target.value)}
          >
            <option value={'java'}>JAVA</option>
            <option value={'nodejs'}>JavaScript</option>
          </select>
        </div>
        <div className="solve-item-container">
          <div className="solve-item-label">DESCRIPTION</div>
          <div className="solve-item">
            {description} <br />
            <b>{'for example; '}</b>
            <br />
            {`input(s): ${parameter} `}
            <br />
            {`output: ${output} 
          `}
          </div>
        </div>
        <div className="solve-item-container">
          <div className="solve-item-label">SOLUTION CODE</div>
          <textarea
            required
            className="solve-item solve-item-textarea"
            value={solution}
            onChange={e => setSolution(e.target.value)}
          ></textarea>
        </div>
        <div className="solve-item-container">
          <input
            type="submit"
            value="SUBMIT"
            className="solve-item-submit-btn"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Solve;
