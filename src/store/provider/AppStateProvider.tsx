import * as React from 'react';
import { AppContext } from '..';
import { appStateReducer } from '../reducers';

const AppStateProvider: React.FC<{ children }> = ({ children }) => {
	const contextReducer = React.useReducer(appStateReducer, null);
	const [state, dispatch] = contextReducer;

	React.useEffect(() => {
		// Initialisation, run every reducers with initial states
		dispatch({ type: null });
	}, []);

	return <AppContext.Provider value={contextReducer}>
		{ state ? children : <div>Loading...</div> }
	</AppContext.Provider>
};

export default AppStateProvider;