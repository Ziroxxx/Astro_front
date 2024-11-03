import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css"
import NavbarComponent from "../../components/NavBar/NavBar";

export const HomePage: FC = () => {
  return (
    <div className="background">
      <NavbarComponent />
      <Container className="container">
        <Row className="RowClass">
          <Col md={7} xs={10}>
            <h1 className="titleName">AstroGid</h1>
            <div className="description">
              <p>
                Добро пожаловать в Gid! Здесь вы сможете фиксировать ваши наблюдения за планетами Солнечной системы. Для этого просто перейдите в раздел "Планеты", выберите нужные вам планеты и укажите их положение!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
