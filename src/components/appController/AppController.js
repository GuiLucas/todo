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
		if (!task.isCompleted) {
			setCurrentTaskList(currentTaskList.filter((result) => result !== task));
		} else {
			setCompletedList(completedList.filter((result) => result !== task));
		}
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
				return (
					<Task key={index} task={task} removeTask={removeTaskFromCurrent} />
				);
			});
	}

	return (
		<Container>
			<FormContainer addTask={addTask} />

			{currentTasks.length > 0 ? (
				<div className={styles.tasksContainer}>{currentTasks}</div>
			) : null}

			{completedTasks.length > 0 ? (
				<>
					<h2
						style={{ paddingTop: currentTasks.length === 0 ? '2rem' : '' }}
						className={styles.secondaryHeading}
					>
						Completed Tasks
					</h2>
					<div className={styles.tasksContainer}>{completedTasks}</div>
				</>
			) : null}
		</Container>
	);
}
