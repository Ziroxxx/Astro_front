import { FC } from "react";
import NavbarComponent from "../../components/NavBar/NavBar";
import { useState } from 'react';
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './RegPage.css'

const RegPage: FC = () => {
    const [validated, setValidated] = useState(false);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Для хранения пароля
    const [confirmPassword, setConfirmPassword] = useState(""); // Для хранения подтверждения пароля
    const [passwordMatch, setPasswordMatch] = useState(true); // Для отслеживания совпадения паролей
    const [login, setLogin] = useState("")
    const [loginValid, setLoginValid] = useState(true)
    const [loginUnique, setLoginUnique] = useState(true)

    const navigate = useNavigate()
  
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (login === "") {
            setLoginValid(false);
        } else {
            setLoginValid(true);
        }

        if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }

        if (form.checkValidity() === false || !passwordMatch) {
            setValidated(true);
            return;
        }
        api.user.userRegCreate({
            username: login,
            password: password,
            is_superuser: false,
            is_staff: false,
            email: Email,
            first_name: fName,
            last_name: lName
        }).then(() => {
            navigate(ROUTES.HOME)
        })
        .catch(() => {
            setValidated(true)
            setLoginUnique(false)
            return
        }).finally(() => {setValidated(true)})
    };
  
    return (
        <div>
            <NavbarComponent />
            <Form className="d-flex flex-column align-items-center gap-3 mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
                <Col md="3">
                    <Form.Group as={Row} md="4" controlId="validationCustom01" className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Имя"
                            onChange={(el) => setFName(el.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom02" className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Фамилия"
                            onChange={(el) => setLName(el.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom03" className="mb-3">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            onChange={(el) => setEmail(el.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustomUsername" className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Логин"
                            value={login}
                            onChange={(el) => {
                                setLogin(el.target.value)
                                setLoginValid(true)
                                setLoginUnique(true)
                            }}
                            isInvalid={!loginValid || !loginUnique}
                        />
                        <Form.Control.Feedback type="invalid">{loginValid === false ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{loginUnique === false ? "Логин уже существует!" : ""}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom04" className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(el) => setPassword(el.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom05" className="mb-3">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Пароль"
                            value={confirmPassword}
                            onChange={(el) => setConfirmPassword(el.target.value)}
                            isInvalid={!passwordMatch}
                        />
                        <Form.Control.Feedback type="invalid">Пароли не совпадают!</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-3">
                        <Button type="submit" className="cardButton w-50">Зарегистрироваться</Button>
                    </div>
                </Col>
            </Form>
        </div>
    );
  }
  
  export default RegPage;