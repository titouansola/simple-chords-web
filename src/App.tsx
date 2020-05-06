import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AppStateProvider from './store/provider/AppStateProvider';
import Song from './components/pages/Song';
import Creator from './components/pages/Creator';

const App: React.FC<any> = () => {
	return <AppStateProvider>
		<Container fluid>
			<Row>
				<Col xs={{ offset: 2, span: 8 }}>
					<Router>
						<Switch>
							{/* PRIVATE ROUTES */}
							<Route path='/creator'>
								<Creator />
							</Route>
							{/* PUBLIC ROUTES */}
							<Route path='/song/:songId'>
								<Song />
							</Route>
						</Switch>
					</Router>
				</Col>
			</Row>
		</Container>
	</AppStateProvider>
};

export default App;