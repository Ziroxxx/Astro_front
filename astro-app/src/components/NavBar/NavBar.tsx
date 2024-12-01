import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../../Routes';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
//@ts-ignore
import * as dataSlice from '../../slices/dataSlice'
import { api } from '../../api';
import {useDispatch} from "react-redux";

function NavbarComponent() {
  const user = dataSlice.useUserInfo()
  const dispatch = useDispatch()

  const exitHandler = () => {
    dispatch(dataSlice.setUserInfoAction({}))
    dispatch(dataSlice.setPlanetNameAction(''))
    dispatch(dataSlice.setWishIDAction(''))
    dispatch(dataSlice.setWishCountAction(0))
    dispatch(dataSlice.setDateStartAction(''))
    dispatch(dataSlice.setDateEndAction(''))
    dispatch(dataSlice.setConstellationAction(''))
    api.user.userLogoutCreate()
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
            <Nav.Link as={Link} to={ROUTES.CONSTABLE} hidden={Object.keys(user).length === 0}>Созвездия</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to={ROUTES.AUTH} hidden={Object.keys(user).length !== 0}>Войти</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.REGISTER} hidden={Object.keys(user).length !== 0}>Регистрация</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.HOME} onClick={exitHandler} hidden={Object.keys(user).length === 0}>Выйти</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.PROFILE}>{user.username}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;