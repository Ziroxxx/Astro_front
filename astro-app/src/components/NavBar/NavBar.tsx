import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../../Routes';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import * as dataSlice from '../../slices/dataSlice'
import { useAppDispatch } from '../../slices/dataSlice';

function NavbarComponent() {
  const user = dataSlice.useUserInfo()
  const dispatch = useAppDispatch()

  const exitHandler = () => {
    dispatch(dataSlice.logOutAction())
  }

  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container>
          <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-text-white">
              <Image src='/Astro_front/logo2.png' width={30}/>
              AstroGid
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={ROUTES.PLANETS} className="navbar-text-white">Планеты</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.CONSTABLE} hidden={user === null}>Созвездия</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to={ROUTES.AUTH} hidden={user !== null}>Войти</Nav.Link>
          <Nav.Link as={Link} to={ROUTES.REGISTER} hidden={user !== null}>Регистрация</Nav.Link>
          <Nav.Link as={Link} to={ROUTES.HOME} onClick={exitHandler} hidden={user === null}>Выйти</Nav.Link>
          <Nav.Link as={Link} to={ROUTES.PROFILE}>{user?.username}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;