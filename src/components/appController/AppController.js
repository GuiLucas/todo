import React, { useReducer } from 'react';
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';
import { v4 as uuidv4 } from 'uuid';

// Styling
import styles from './AppController.module.css';

const initialState = { tasks: [], toRemove: [] };

const taskReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: uuidv4(),
				content: action.content,
				createdAt: new Date(),
				isCompleted: false,
				completedAt: null,
			};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}

			return {
				...state,
				isCompleted: !state.isCompleted,
				completedAt: new Date(),
			};
		default:
			return state;
	}
};

const tasksReducer = (state = { tasks: [], toRemove: [] }, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				tasks: [...state.tasks, taskReducer(undefined, action)],
			};
		case 'TOGGLE_TODO':
			return {
				...state,
				tasks: state.tasks.map((t) => taskReducer(t, action)),
			};
		case 'REMOVE_TODO':
			return {
				...state,
				tasks: state.tasks.filter((t) => t.id !== action.id),
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};

export default function AppController() {
	const [state, dispatch] = useReducer(tasksReducer, initialState);

	const addTask = (content) => dispatch({ type: 'ADD_TODO', content: content });

	const updateTask = (id) => dispatch({ type: 'TOGGLE_TODO', id: id });

	const removeTask = (id) => dispatch({ type: 'REMOVE_TODO', id: id });

	// const resetState = () => dispatch({ type: 'RESET' });

	const currentList = state.tasks
		.filter((task) => !task.isCompleted)
		.map((task) => {
			return (
				<Task
					key={task.id}
					{...task}
					updateTask={() => updateTask(task.id)}
					removeTask={() => removeTask(task.id)}
				/>
			);
		});

	const completedList = state.tasks
		.filter((task) => task.isCompleted)
		.map((task) => {
			return (
				<Task
					key={task.id}
					{...task}
					updateTask={() => updateTask(task.id)}
					removeTask={() => removeTask(task.id)}
				/>
			);
		});

	return (
		<Container>
			<FormContainer addTask={(inputValue) => addTask(inputValue)} />

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
