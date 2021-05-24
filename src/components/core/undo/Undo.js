import React from 'react';
import Button from '../button/Button';
import styles from './Undo.module.css';

export default function Undo({ onUndo, closeToast }) {
	const handleClick = () => {
		onUndo();
		closeToast();
	};

	return (
		<div className={styles.toast}>
			<h3>
				Task Deleted{' '}
				<Button buttonStyle={'undoButton'} onClick={handleClick}>
					UNDO
				</Button>
			</h3>
		</div>
	);
}
