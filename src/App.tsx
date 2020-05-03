import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Song from './components/pages/Song';
import AppStateProvider from './state/AppStateProvider';

const App: React.FC<any> = () => {
	return <AppStateProvider>
		<Router>
			<Switch>
				<Route path='/song/:songId'>
					<Song />
				</Route>
			</Switch>
		</Router>
	</AppStateProvider>
};

export default App;