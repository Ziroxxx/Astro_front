import { FC, useState, useEffect } from "react";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import NavbarComponent from "../../components/NavBar/NavBar";
import PlanetCard from "../../components/PlanetCardHorizontal/PlanetCardHorizontal";
// @ts-ignore
import * as dataSlice from "../../slices/dataSlice"
import {useDispatch} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { api } from "../../api";
import { PlanetSerial } from "../../api/Api";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import './ConsPage.css'

const ConsPage: FC = () => {
    const { id } = useParams()
    const [validated, setValidated] = useState(false)
    const [data1Valid, setData1Valid] = useState(true)
    const [data2Valid, setData2Valid] = useState(true)
    const [dataValid, setDataValid] = useState(true)
    const [planetsInConstellation, setPlanetsInConstellation] = useState<PlanetSerial[]>([])
    const wish = dataSlice.useWishID()
    const dateStart = dataSlice.useDateStart()
    const dateEnd = dataSlice.useDateEnd()
    const constellation = dataSlice.useConstellation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGetPlanets = () => {
        if(id)
        api.consPeriod.consPeriodRead(id.toString()).then((response) => {
            if(response.data.planets){
                const planets = response.data.planets.map((planetEntry: any) => planetEntry.planetID)
                dispatch(dataSlice.setDateStartAction(response.data.dateStart || ''))
                dispatch(dataSlice.setDateEndAction(response.data.dateEnd || ''))
                dispatch(dataSlice.setConstellationAction(response.data.constellation || ''))
                setPlanetsInConstellation(planets)
            }
        }).catch(() => {
            console.log('error while getting planets in wish')
        })
    }
    const handleDelFromWish = (idCons: string, idPlanet: string) => {
        api.mm.mmDelete(idCons, idPlanet).then((response) => {
            dispatch(dataSlice.delWishCountAction())
            setPlanetsInConstellation(response.data.map((planetEntry: any) => planetEntry.planetID))
            if(response.data.length === 0){
                dispatch(dataSlice.setWishIDAction(''))
                navigate(ROUTES.PLANETS)
            }
        })
    }

    const handleDelWish = (idCons: string) => {
        api.consPeriod.consPeriodDelete(idCons).then(() => {
            dispatch(dataSlice.setWishIDAction(''))
            dispatch(dataSlice.setWishCountAction(0))
            dispatch(dataSlice.setDateStartAction(''))
            dispatch(dataSlice.setDateEndAction(''))
            dispatch(dataSlice.setConstellationAction(''))
            navigate(ROUTES.PLANETS)
        }).catch(() => {
            console.log("Не удаллось удалить созвездие")
        })
    }


    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        dateStart === '' ? setData1Valid(false) : setData1Valid(true)
        dateEnd === '' ? setData2Valid(false) : setData2Valid(true)

        if (form.checkValidity() === false) {
            setValidated(true)
            return
          }
          
          api.consPeriod.consPeriodUpdate(wish, { 
            dateStart: dateStart, 
            dateEnd: dateEnd, 
            constellation: constellation}).then(() => {
                handleSaveByCreator()
            }).catch(() => {
                setDataValid(false)
                setValidated(true)
                return
            }).finally(() => setValidated(true))
    }

    const handleSaveByCreator = () => {
        api.consPeriod.consPeriodSaveByCreatorUpdate(wish, {}).then(() => {
            dispatch(dataSlice.setWishIDAction(''))
            dispatch(dataSlice.setWishCountAction(0))
            dispatch(dataSlice.setDateStartAction(''))
            dispatch(dataSlice.setDateEndAction(''))
            dispatch(dataSlice.setConstellationAction(''))
            navigate(ROUTES.PLANETS)
        })
    }

    useEffect(() => {
        handleGetPlanets()
    }, [])

    return (
        <div>
            <NavbarComponent />
            
            <div className="bgForm">
                <Form className="consForm" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Дата вхождения в созвездие</Form.Label>
                            <Form.Control 
                                required
                                type="date"
                                value={dateStart}
                                onChange={(el) => dispatch(dataSlice.setDateStartAction(el.target.value))}
                                isInvalid={!dataValid || !data1Valid}
                                disabled={id != wish}
                            />
                            <Form.Control.Feedback type="invalid">{!data1Valid ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{!dataValid ? "Некорректная дата!" : ""}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Дата выхода из созвездия</Form.Label>
                            <Form.Control 
                                required
                                type="date"
                                value={dateEnd}
                                onChange={(el) => dispatch(dataSlice.setDateEndAction(el.target.value))}
                                isInvalid={!dataValid || !data2Valid}
                                disabled={id != wish}
                            />
                            <Form.Control.Feedback type="invalid">{!data2Valid ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{!dataValid ? "Некорректная дата!" : ""}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mt-3">
                        <Form.Group as={Col} className="w-200">
                            <Form.Label>Созвездие</Form.Label>
                            <Form.Control 
                                required
                                type="text"
                                placeholder="Дева"
                                value={constellation}
                                disabled={id != wish}
                                onChange={(el) => dispatch(dataSlice.setConstellationAction(el.target.value))}
                            />
                            <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mt-5">
                        <Col md="6" className="d-flex flex-column align-items-right">
                            <Button type="submit" variant="outline-success" disabled={id != wish}>Сохранить</Button>
                        </Col>
                        <Col md="6" className="d-flex flex-column align-items-left">
                            <Button type="button" variant="outline-danger" onClick={() => handleDelWish(wish)} disabled={id != wish}>Очистить</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            {wish == id ? (<BreadCrumbs crumbs={[
                {label: ROUTE_LABELS.PLANETS, path: ROUTES.PLANETS},
                {label: 'Созвездие Черновик'}]}/>) : (<BreadCrumbs crumbs={[
                    {label: ROUTE_LABELS.CONSTABLE, path:ROUTES.CONSTABLE},
                    {label: 'Сохраненное созвездие'}
                ]}/>)}
            <Container className='container mt-5 rootConsPage'>
                <Row xs={1} className="g-4 justify-content-center w-75">
                    {planetsInConstellation.map((item: any, index: any)=> (
                        <Col key={index}>
                            <PlanetCard 
                                {...item}
                                delFromWish={() => handleDelFromWish(wish, item.planetID)}
                                disabled={id != wish}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ConsPage