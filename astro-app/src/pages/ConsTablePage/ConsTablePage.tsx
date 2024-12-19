import { FC, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavBar/NavBar";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { api } from "../../api";
import { RequestSerial } from "../../api/Api";
import { Container, Row } from "react-bootstrap";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import ConsCard from "../../components/ConsCard/ConsCard";

const ConsTablePage: FC = () => {
    const [consResult, setConsResult] = useState<RequestSerial[]>([])

    useEffect(() => {
        handleGetConses()
    }, [])

    const handleGetConses = () => {
        api.consPeriods.consPeriodsList().then((response) => {
            setConsResult(response.data)
        }).catch(() => console.log('failed to get conses'))
    }

    return (
        <div>
            <NavbarComponent />
            <BreadCrumbs 
                crumbs={[{label: ROUTE_LABELS.CONSTABLE, path: ROUTES.CONSTABLE}]}
            />
            <Container>
                <Row xs={1} className="g-4 justify-content-center">
                    {consResult.map((constellation) => (
                        <ConsCard 
                        id={constellation.reqID}
                        creator={constellation.userID}
                        dateCreated={constellation.dateCreated}
                        dateSaved={constellation.dateSaved}
                        status={constellation.status}
                        dateStart={constellation.dateStart}
                        dateEnd={constellation.dateEnd}
                        constellation={constellation.constellation}
                        dateModerated={constellation.dateModerated}
                        moder={constellation.moderID}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default ConsTablePage