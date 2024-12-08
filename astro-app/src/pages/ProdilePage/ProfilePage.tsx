import { FC, useState } from "react";
//@ts-ignore
import { useUserInfo, setUserInfoAction } from '../../slices/dataSlice'
import NavbarComponent from "../../components/NavBar/NavBar";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "../../api";

const ProfilePage: FC = () => {
    const user = useUserInfo()

    const [userName, setUserName] = useState(user?.username)
    const [pass, setPass] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFistName] = useState(user?.first_name)
    const [lastName, setLastName] = useState(user?.last_name)
    const [email, setEmail] = useState(user?.email)

    const [validated, setValidated] = useState(false)
    const [loginValid, setLoginValid] = useState(true)
    const [logErr, setLogErr] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [sendInfo, setSendInfo] = useState(false)

    const dispatch = useDispatch()

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (userName === "") {
            setLoginValid(false);
        } else {
            setLoginValid(true);
        }

        if (pass !== confirmPassword) {
            setPasswordMatch(false);
            return
        } else {
            setPasswordMatch(true);
        }

        if (form.checkValidity() === false || !passwordMatch) {
            setValidated(true);
            return;
        }

        if(user?.id)
        api.user.userUpdate(user.id.toString(), {
            username: userName,
            ...(pass !== "" && { password: pass }),
            first_name: firstName,
            last_name: lastName,
            email: email
        })
        .then((response) => {
            dispatch(setUserInfoAction(response.data))
            setSendInfo(true)
        })
        .catch(() => {
            setLogErr(true)
        }).finally(() => setValidated(true))
    }
    return(
        <div>
            <NavbarComponent />
            <Form className="d-flex flex-column align-items-center gap-3 mt-5" noValidate validated={validated} onSubmit={onSubmitHandler}>
                <Col md="3">
                    <Form.Group as={Row} md="4" controlId="validationCustom01" className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Имя"
                            value={firstName}
                            onChange={(el) => setFistName(el.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom02" className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(el) => setLastName(el.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom03" className="mb-3">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            value={email}
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
                            value={userName}
                            onChange={(el) => {
                                setUserName(el.target.value)
                                setLoginValid(true)
                                setLogErr(false)
                            }}
                            isInvalid={!loginValid || logErr}
                        />
                        <Form.Control.Feedback type="invalid">{loginValid === false ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{logErr === true ? "Логин занят!" : ""}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom04" className="mb-3">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            value={pass}
                            onChange={(el) => setPass(el.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom05" className="mb-3">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            value={confirmPassword}
                            onChange={(el) => {
                                setConfirmPassword(el.target.value)
                                setPasswordMatch(true)
                            }}
                            isInvalid={!passwordMatch}
                        />
                        <Form.Control.Feedback type="invalid">Пароли не совпадают!</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex flex-column align-items-center text-center mt-3">
                        <Button type="submit" className="cardButton w-50">Сохранить</Button>
                        <Form.Control.Feedback type="valid" hidden={!sendInfo}>Изменения сохранены!</Form.Control.Feedback>
                    </div>
                </Col>
            </Form>
        </div>
    )
}

export default ProfilePage