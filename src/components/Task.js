import React from 'react';
import Button from './Button';
import { XCircle, CheckCircle } from 'react-feather';
import styles from '../styles/Task.module.css';

export default function Task({ isCompleted, content, removeTask, updateTask }) {
	return (
		<div className={styles.task}>
			<p
				className={styles.taskContent}
				style={{
					textDecoration: isCompleted ? 'line-through' : '',
				}}
			>
				{content}
			</p>
			<div className={styles.buttonGroup}>
				<Button
					type={'button'}
					buttonStyle={'defaultButton'}
					onClick={removeTask}
				>
					<XCircle className={styles.removeButton} />
				</Button>
				{!isCompleted && (
					<Button
						type={'button'}
						buttonStyle={'defaultButton'}
						onClick={updateTask}
					>
						<CheckCircle className={styles.completeButton} />
					</Button>
				)}
			</div>
		</div>
	);
}
