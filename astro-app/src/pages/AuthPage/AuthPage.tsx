import { FC, useState } from 'react'
import NavbarComponent from "../../components/NavBar/NavBar";
import { Button, Form, Row, Col } from 'react-bootstrap'
import { ROUTES } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import { loginAction } from "../../slices/dataSlice"
import { useAppDispatch } from '../../slices/dataSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const AuthPage: FC = () => {
    const [userName, setUserName] = useState('')
    const [pass, setPass] = useState('')
    const [passValid, setPassValid] = useState(true)
    const [validated, setValidated] = useState(false)
    const [logErr, setLogErr] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (event: any) => {
        const formm = event.currentTarget
        event.preventDefault()

        if(pass === "")
            setPassValid(false)
        else
            setPassValid(true)

        if(formm.checkValidity() === false || logErr === true){
            setValidated(true)
            return
        }

        dispatch(loginAction({username: userName, password: pass}))
        .then((unwrapResult) => {
            if(unwrapResult.payload)
                navigate(ROUTES.HOME)
            else
                setLogErr(true)
        }).finally(() => setValidated(true))
    }

    return (
        <div>
            <NavbarComponent />
            <Form className="d-flex flex-column align-items-center gap-3 mt-5" noValidate validated={validated} onSubmit={onSubmitHandler}>
                <Col md="3">
                    <Form.Group as={Row} md="4" className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control 
                            required
                            type="text"
                            placeholder="Логин"
                            onChange={(el) => setUserName(el.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>Обязательное поле!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            required
                            type="password"
                            placeholder="Пароль"
                            onChange={(el) => {
                                setPass(el.target.value)
                                setLogErr(false)
                            }}
                            isInvalid={!passValid || logErr}
                        />
                        <Form.Control.Feedback type='invalid'>{pass === "" ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{logErr === true ? "Неверный логин или пароль!" : ""}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-3">
                        <Button type="submit" className="cardButton w-50">Войти</Button>
                    </div>
                </Col>
            </Form>
        </div>
    )
}

export default AuthPage