import { FC, useState, useEffect } from 'react'
import { Row, Col, Spinner, Container } from 'react-bootstrap';

import { planetInfo, getPlanetByName } from '../../modules/AstroAPI';
import InputField from '../../components/InputField/InputField';
import PlanetCard from '../../components/PlanetCard/PlanetCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS } from '../../Routes';
import { PLANETS_MOCK } from '../../modules/mock';

const PlanetListPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [planet, setPlanet] = useState<planetInfo[]>([])
    const [loading, setLoading] = useState(false)


    const handleSearch = async () =>{
        setLoading(true)
        getPlanetByName(searchValue).then((response) => {
                setPlanet(response.planets)
                setLoading(false)
            }).catch(() => {
                setPlanet(PLANETS_MOCK.planets)
                setLoading(false)
            })
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <div className='RootPage'>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PLANETS }]} />
    
            <InputField
                value={searchValue}
                setValue={(value: string) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
                placeholder='Найти планету'
            />

            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <Container className='container'>
                <Row md={4} className="g-4 justify-content-center">
                    {planet.map((item, index)=> (
                        <Col key={index}>
                            <PlanetCard {...item}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default PlanetListPage