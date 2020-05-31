import * as React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, Image, Nav } from 'react-bootstrap';
import logo from '../../assets/img/logo_white.png';

const Header: React.FC<any> = () => {
	const history = useHistory();

	return <Navbar bg={'dark'} variant={'dark'}>
		<Link to={'/'}>
			<Navbar.Brand>
				<Image src={logo} height={25} />
			</Navbar.Brand>
		</Link>
		<Navbar.Toggle />
		<Navbar.Collapse className={'justify-content-end'}>
			<Nav>
				<Nav.Link as={Link} to={'/'}>
					Home
				</Nav.Link>
				<Nav.Link as={Link} to={'/creator'}>
					Publish
				</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
};

export default Header;