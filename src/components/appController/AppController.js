import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

//Components
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';
import Undo from '../core/undo/Undo';

// Styling
import styles from './AppController.module.css';
import 'react-toastify/dist/ReactToastify.css';

const initialState = { tasks: [], toRemove: [] };

const taskReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return {
				id: uuidv4(),
				content: action.content,
				createdAt: new Date(),
				isCompleted: false,
				completedAt: null,
			};
		case 'TOGGLE_TASK':
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
		case 'ADD_TASK':
			return {
				...state,
				tasks: [...state.tasks, taskReducer(undefined, action)],
			};
		case 'TOGGLE_TASK':
			return {
				...state,
				tasks: state.tasks.map((t) => taskReducer(t, action)),
			};
		case 'QUEUE_FOR_REMOVAL':
			return {
				...state,
				toRemove: [...state.toRemove, action.id],
			};
		case 'CLEAN_TASKS':
			return {
				tasks: state.tasks.filter((t) => !state.toRemove.includes(t.id)),
				toRemove: [],
			};
		case 'UNDO':
			return {
				...state,
				toRemove: state.toRemove.filter((t) => t !== action.id),
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};

export default function AppController() {
	const [state, dispatch] = useReducer(tasksReducer, initialState);

	const addTask = (content) => dispatch({ type: 'ADD_TASK', content });

	const updateTask = (id) => dispatch({ type: 'TOGGLE_TASK', id });

	const removeTask = (id) => {
		dispatch({ type: 'QUEUE_FOR_REMOVAL', id });

		toast.info(<Undo onUndo={() => dispatch({ type: 'UNDO', id })} />, {
			onClose: () => dispatch({ type: 'CLEAN_TASKS' }),
		});
	};

	// const resetState = () => dispatch({ type: 'RESET' });

	const currentList = state.tasks
		.filter((task) => !task.isCompleted && !state.toRemove.includes(task.id))
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
		.filter((task) => task.isCompleted && !state.toRemove.includes(task.id))
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

			<ToastContainer
				closeOnClick={false}
				closeButton={false}
				autoClose={5000}
				draggable={false}
			/>
		</Container>
	);
}
