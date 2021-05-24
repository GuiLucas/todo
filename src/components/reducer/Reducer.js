import { v4 as uuidv4 } from 'uuid';

export const initialState = { tasks: [], toRemove: [] };

export const init = (initialValue = initialState) => {
	if (localStorage.getItem('localTasks')) {
		return {
			...initialState,
			tasks: JSON.parse(localStorage.getItem('localTasks')),
		};
	}
	return initialValue;
};

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

export const tasksReducer = (state = { tasks: [], toRemove: [] }, action) => {
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
			return init();
		default:
			return state;
	}
};
