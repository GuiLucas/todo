import React, { useState } from 'react';
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';

// Styling
import styles from './AppController.module.css';

export default function AppController() {
	const [taskList, setTaskList] = useState([]);

	const addTask = (content) => {
		const newTask = {
			content: content,
			createdAt: new Date(),
			isCompleted: false,
		};
		setTaskList([...taskList, newTask]);
	};

	const removeTask = (task) => {
		setTaskList(taskList.filter((result) => result !== task));
	};

	const updateTask = (index) => {
		const newTasks = [...taskList];
		newTasks[index].isCompleted = true;
		setTaskList(newTasks);
	};

	let tasks = null;

	if (taskList) {
		tasks =
			taskList &&
			taskList.map((task, index) => {
				return (
					<Task
						key={index}
						index={index}
						task={task}
						updateTask={updateTask}
						removeTask={removeTask}
					/>
				);
			});
	}

	return (
		<Container>
			<FormContainer addTask={addTask} />
			{tasks}
		</Container>
	);
}
