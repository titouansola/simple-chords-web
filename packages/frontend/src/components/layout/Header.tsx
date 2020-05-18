import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Button, Image } from 'react-bootstrap';
import logo from '../../assets/img/logo_white.png';

const Header: React.FC<any> = () => {
	const history = useHistory();

	const goToHome = () => history.push('/');

	const goToCreator = () => history.push('/creator');

	return <Navbar bg={'dark'} variant={'dark'}>
		<Navbar.Brand onClick={goToHome}>
			<Image src={logo} height={25} />
		</Navbar.Brand>
		<Navbar.Toggle />
		<Navbar.Collapse className={'justify-content-end'}>
			<Button variant={'success'} onClick={goToCreator}>Add a song</Button>
		</Navbar.Collapse>
	</Navbar>
};

export default Header;