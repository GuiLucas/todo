import React, { useState } from 'react';
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';

// Styling
import styles from './AppController.module.css';

export default function AppController() {
	const [currentTaskList, setCurrentTaskList] = useState([]);
	const [completedList, setCompletedList] = useState([]);

	const addTask = (content) => {
		const newTask = {
			content: content,
			createdAt: new Date(),
			isCompleted: false,
		};
		setCurrentTaskList([...currentTaskList, newTask]);
	};

	const removeTaskFromCurrent = (task) => {
		setCurrentTaskList(currentTaskList.filter((result) => result !== task));
	};

	const updateTaskCompleted = (task) => {
		const newTask = {
			...task,
			isCompleted: true,
			completedAt: new Date(),
		};
		setCompletedList([...completedList, newTask]);
		removeTaskFromCurrent(task);
	};

	let currentTasks = null;

	if (currentTaskList) {
		currentTasks =
			currentTaskList &&
			currentTaskList.map((task, index) => {
				return (
					<Task
						key={index}
						task={task}
						updateTask={updateTaskCompleted}
						removeTask={removeTaskFromCurrent}
					/>
				);
			});
	}

	let completedTasks = null;

	if (completedList) {
		completedTasks =
			completedList &&
			completedList.map((task, index) => {
				// Remove buttons from task if completed
				return <Task key={index} task={task} />;
			});
	}

	return (
		<Container>
			<FormContainer addTask={addTask} />
			<h1>Current Tasks</h1>
			{currentTasks}
			<h1>Completed Tasks</h1>
			{completedTasks}
		</Container>
	);
}
