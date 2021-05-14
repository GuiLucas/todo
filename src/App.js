import React from 'react';
import AppController from './components/appController/AppController';
import styles from './App.module.css';

export default function App() {
	return (
		<>
			<header>
				<h1 className={styles.mainHeading}>TSKS</h1>
				<p className={styles.mainP}>Organize your day better!</p>
			</header>
			<main className={styles.main}>
				<AppController />
			</main>
		</>
	);
}
