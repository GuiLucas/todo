import React from 'react';
import Button from './Button';
import styles from '../styles/Undo.module.css';

export default function Undo({ onUndo, closeToast }) {
	const handleClick = () => {
		onUndo();
		closeToast();
	};

	return (
		<div className={styles.toast}>
			<h3 className={styles.heading}>
				Task Deleted{' '}
				<Button buttonStyle={'undoButton'} onClick={handleClick}>
					UNDO
				</Button>
			</h3>
		</div>
	);
}
