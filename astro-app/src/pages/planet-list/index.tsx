import { FC, useState, useEffect } from 'react'
import { Row, Col, Spinner, Container, Button, Image } from 'react-bootstrap';

import InputField from '../../components/InputField/InputField';
import PlanetCard from '../../components/PlanetCard/PlanetCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { PLANETS_MOCK } from '../../modules/mock';
import "./PlanetList.css"
import NavbarComponent from '../../components/NavBar/NavBar';
import { Link } from "react-router-dom";
// @ts-ignore
import { setPlanetNameAction, usePlanetName, setWishIDAction, setWishCountAction, useWishID, useWishCount, addWishCountAction } from "../../slices/dataSlice"
import {useDispatch} from "react-redux";

import { api } from '../../api';
import { PlanetSerial } from '../../api/Api';

const PlanetListPage: FC = () => {
    const [loading, setLoading] = useState(false)
    const [PlanetsResult, setPlanetResults] = useState<PlanetSerial[]>([])

    const dispatch = useDispatch()
    const PlanetName = usePlanetName()
    const wishID = useWishID()
    const wishCount = useWishCount()

    const handleSearch = async () =>{
        setLoading(true)
        api.planets.planetsList({PlanetName: PlanetName}).then((response) => {
                setPlanetResults(response.data.planets)
                dispatch(setWishCountAction(response.data.wishCount))
                dispatch(setWishIDAction(response.data.wishID))
            }).catch(() => {
                const resultPlanets = []
                for (let i = 0; i < PLANETS_MOCK.planets.length; i++)
                    if (PLANETS_MOCK.planets[i].name.toLowerCase().includes(PlanetName.toLowerCase()))
                        resultPlanets.push(PLANETS_MOCK.planets[i])
                setPlanetResults(resultPlanets)
                console.log('mocks read')
            }).finally(() => {
                setLoading(false)
                dispatch(setPlanetNameAction(PlanetName))
            })
    }

    const checkWish = () => {
        return (wishCount === 0 ? '' : `${ROUTES.CONS}/${wishID}`)
    }

    const handleAddToWish = (planetID: string) => {
        api.planet.planetCreate(planetID).then((response) => {
            if (response.status == 200){
                dispatch(addWishCountAction())
                dispatch(setWishIDAction(response.data.reqID))
            }
        }).catch(()=>{
            console.log('уже добавлено')
        })
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <div className='RootPage'>
            <NavbarComponent />
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PLANETS }]} />
    
            <InputField
                value={PlanetName}
                setValue={(value: string) => {
                    dispatch(setPlanetNameAction(value));
                }}
                loading={loading}
                onSubmit={handleSearch}
                placeholder='Найти планету'
            />

            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <Container>
                <Row xxl={4} lg={3} md={2} xs={1} className="g-4 justify-content-center widthOnXs">
                    {PlanetsResult.map((item: any, index: any)=> (
                        <Col key={index}>
                            <PlanetCard 
                                {...item}
                                addToWish={() => handleAddToWish(item.planetID)}
                                mode='add'
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Link to={checkWish()}>
                <Button className="btnConsPeriod" variant="outline-warning">
                        <Image className='btnImage' src='/Astro_front/wishLogo.png' width={100}/>
                </Button>
                <div className='wishCount' hidden={wishCount == 0}>{wishCount}</div>
            </Link>
        </div>
    )
}

export default PlanetListPage