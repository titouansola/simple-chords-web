import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AppStateProvider from './store/provider/AppStateProvider';
import Header from './components/layout/Header';
import Song from './components/pages/Song';
import SongList from './components/pages/SongList';
import Creator from './components/pages/Creator';

const App: React.FC<any> = () => {
	return <AppStateProvider>
		<Router>
			<Header />
			<Container className={'mt-5'} fluid>
				<Row>
					<Col xs={{ offset: 2, span: 8 }}>
						<Switch>
							{/* PRIVATE ROUTES */}
							<Route path='/creator'>
								<Creator />
							</Route>
							{/* PUBLIC ROUTES */}
							<Route path='/song/:songId'>
								<Song />
							</Route>
							<Route>
								<SongList />
							</Route>
						</Switch>
					</Col>
				</Row>
			</Container>
		</Router>
	</AppStateProvider>
};

export default App;