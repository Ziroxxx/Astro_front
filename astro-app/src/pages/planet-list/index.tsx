import { FC, useState, useEffect } from 'react'
import { Row, Col, Spinner, Container, Button, Image } from 'react-bootstrap';

import { getPlanetByName, planetInfo } from '../../modules/AstroAPI';
import InputField from '../../components/InputField/InputField';
import PlanetCard from '../../components/PlanetCard/PlanetCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../../Routes';
import { PLANETS_MOCK } from '../../modules/mock';
import "./PlanetList.css"
import NavbarComponent from '../../components/NavBar/NavBar';
// @ts-ignore
import { setPlanetNameAction, usePlanetName } from "../../slices/dataSlice"
import {useDispatch} from "react-redux";

const PlanetListPage: FC = () => {
    const [loading, setLoading] = useState(false)
    const [PlanetsResult, setPlanetResults] = useState<planetInfo[]>([])

    const dispatch = useDispatch()
    const PlanetName = usePlanetName()

    const handleSearch = async () =>{
        setLoading(true)
        getPlanetByName(PlanetName).then((response) => {
                setPlanetResults(response.planets)
                setLoading(false)
            }).catch(() => {
                const resultPlanets = []
                for (let i = 0; i < PLANETS_MOCK.planets.length; i++)
                    if (PLANETS_MOCK.planets[i].name.toLowerCase().includes(PlanetName.toLowerCase()))
                        resultPlanets.push(PLANETS_MOCK.planets[i])
                setPlanetResults(resultPlanets)
                setLoading(false)
            })
        dispatch(setPlanetNameAction(PlanetName))
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
            <Container className='container'>
                <Row md={3} xs={1} className="g-4 justify-content-center widthOnXs">
                    {PlanetsResult.map((item: any, index: any)=> (
                        <Col key={index}>
                            <PlanetCard {...item}/>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Button className="btnConsPeriod" variant="outline-warning">
                    <Image className='btnImage' src='/Astro_front/wishLogo.png' width={100}/>
            </Button>
        </div>
    )
}

export default PlanetListPage