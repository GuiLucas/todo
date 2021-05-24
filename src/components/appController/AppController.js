import React, { useReducer, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { tasksReducer, init, initialState } from '../reducer/Reducer';

//Components
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';
import Undo from '../core/undo/Undo';

// Styling
import styles from './AppController.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AppController() {
	const [state, dispatch] = useReducer(tasksReducer, initialState, init);

	useEffect(() => {
		localStorage.setItem('localTasks', JSON.stringify(state.tasks));
	}, [state.tasks]);

	// Actions
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
