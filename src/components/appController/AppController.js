import React, { useState } from 'react';
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';

// Styling
import styles from './AppController.module.css';

export default function AppController() {
	const [currentTasks, setCurrentTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);

	const addTask = (content) => {
		const newTask = {
			content: content,
			createdAt: new Date(),
			isCompleted: false,
		};
		setCurrentTasks([...currentTasks, newTask]);
	};

	const removeTaskFromCurrent = (task) => {
		if (!task.isCompleted) {
			setCurrentTasks(currentTasks.filter((result) => result !== task));
		} else {
			setCompletedTasks(completedTasks.filter((result) => result !== task));
		}
	};

	const updateTaskCompleted = (task) => {
		const newTask = {
			...task,
			isCompleted: true,
			completedAt: new Date(),
		};
		setCompletedTasks([...completedTasks, newTask]);
		removeTaskFromCurrent(task);
	};

	let currentList = null;

	if (currentTasks) {
		currentList =
			currentTasks &&
			currentTasks.map((task, index) => {
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

	let completedList = null;

	if (completedTasks) {
		completedList =
			completedTasks &&
			completedTasks.map((task, index) => {
				return (
					<Task key={index} task={task} removeTask={removeTaskFromCurrent} />
				);
			});
	}

	return (
		<Container>
			<FormContainer addTask={addTask} />

			{currentList.length > 0 ? (
				<div className={styles.tasksContainer}>{currentList}</div>
			) : null}

			{completedList.length > 0 ? (
				<>
					<h2
						style={{ paddingTop: currentList.length === 0 ? '2rem' : '' }}
						className={styles.secondaryHeading}
					>
						Completed Tasks
					</h2>
					<div className={styles.tasksContainer}>{completedList}</div>
				</>
			) : null}
		</Container>
	);
}
