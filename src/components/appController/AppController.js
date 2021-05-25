import React, { useReducer, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
	tasksReducer,
	init,
	initialState,
	addTask,
	updateTask,
	queueForRemoval,
	undoTask,
	cleanTasks,
	resetState,
} from '../reducer/Reducer';

//Components
import Container from '../core/container/Container';
import FormContainer from '../formContainer/FormContainer';
import Task from '../task/Task';
import Undo from '../core/undo/Undo';
import Button from '../core/button/Button';

// Styling
import styles from './AppController.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AppController() {
	const [state, dispatch] = useReducer(tasksReducer, initialState, init);

	useEffect(() => {
		localStorage.setItem('localTasks', JSON.stringify(state.tasks));
	}, [state.tasks]);

	const removeTask = (id) => {
		dispatch(queueForRemoval(id));

		toast.info(<Undo onUndo={() => dispatch(undoTask(id))} />, {
			onClose: () => dispatch(cleanTasks(id)),
		});
	};

	const currentList = state.tasks
		.filter((task) => !task.isCompleted && !state.toRemove.includes(task.id))
		.map((task) => {
			return (
				<Task
					key={task.id}
					{...task}
					updateTask={() => dispatch(updateTask(task.id))}
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
					updateTask={() => dispatch(updateTask(task.id))}
					removeTask={() => removeTask(task.id)}
				/>
			);
		});

	return (
		<Container>
			<FormContainer addTask={(content) => dispatch(addTask(content))} />

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

			{!state.toRemove.length && state.tasks.length > 0 && (
				<Button
					type={'reset'}
					buttonStyle={'resetButton'}
					onClick={() => dispatch(resetState())}
				>
					Clear all tasks
				</Button>
			)}

			<ToastContainer
				closeOnClick={false}
				closeButton={false}
				autoClose={5000}
				progressClassName={styles.toastProgress}
			/>
		</Container>
	);
}
