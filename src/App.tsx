import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppContext, appStateReducer } from './state';

import Song from './components/pages/Song';
import State from './state/types';

const App: React.FC<any> = () => {
	const contextReducer = React.useReducer(appStateReducer, new State());
	//
	return <AppContext.Provider value={contextReducer}>
		<Router>
			<Switch>
				<Route path='/song/:songId'>
					<Song />
				</Route>
			</Switch>
		</Router>
	</AppContext.Provider>
};

export default App;