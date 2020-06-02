import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AppStateProvider from '@scw/store/AppStateProvider';
import { HomePage, SongPage, CreatorPage, Header } from './components';

const App: React.FC<any> = () => {
	return <AppStateProvider>
		<Router>
			<Header />
			<Container className={'mt-5'} fluid>
				<Row>
					<Col xs={12} md={{ offset: 1, span: 10 }} lg={{ offset: 2, span: 8 }}>
						<Switch>
							{/* PRIVATE ROUTES */}
							<Route path='/creator'>
								<CreatorPage />
							</Route>
							{/* PUBLIC ROUTES */}
							<Route path='/song/:songId'>
								<SongPage />
							</Route>
							<Route>
								<HomePage />
							</Route>
						</Switch>
					</Col>
				</Row>
			</Container>
		</Router>
	</AppStateProvider>
};

export default App;