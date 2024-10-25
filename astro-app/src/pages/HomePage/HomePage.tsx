import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./HomePage.css"

export const HomePage: FC = () => {
  return (
    <Container className="container">
      <Row className="RowClass">
        <Col md={10}>
          <h1 className="titleName">AstroGid</h1>
          <p>
            Добро пожаловать в Gid! Здесь очень информативный и полезный текст про этот сервис.
          </p>
          <Link to={ROUTES.PLANETS} className="linkToPlanets">
            <Button className="custom-button" variant="outline-warning">Просмотреть планеты</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
