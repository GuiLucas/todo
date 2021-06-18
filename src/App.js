import React from 'react';
import TaskList from './components/TaskList';
import styles from './styles/App.module.css';

export default function App() {
	return (
		<div className={styles.appContainer}>
			<header className={styles.header}>
				<h1 className={styles.mainHeading}>TSKS</h1>
				<p className={styles.mainP}>Organize your day better!</p>
			</header>
			<main className={styles.main}>
				<TaskList />
			</main>
			<footer className={styles.footer}>
				<p>
					Made by{' '}
					<a
						className={styles.footerLink}
						href='https://github.com/GuiLucas'
						target='_blank'
						rel='noopener noreferrer'
					>
						Guilherme Lucas
					</a>
					.
				</p>
			</footer>
		</div>
	);
}
