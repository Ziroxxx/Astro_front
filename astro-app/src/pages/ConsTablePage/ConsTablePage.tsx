import { FC, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavBar/NavBar";
import { ROUTES } from "../../Routes";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { RequestSerial } from "../../api/Api";
import { Table, Button } from "react-bootstrap";

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
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Логин астролога</th>
                    <th>Дата создания</th>
                    <th>Дата формирования</th>
                    <th>Статус</th>
                    <th>Начало периода</th>
                    <th>Конец периода</th>
                    <th>Созвездие</th>
                    <th>Логин астронома</th>
                    <th>Подробнее</th>
                    </tr>
                </thead>
                <tbody>
                {consResult.map((item) => (
                        <tr key={item.reqID}>
                            <td>{item.reqID}</td>
                            <td>{item.userID || "Не указано"}</td>
                            <td>{item.dateCreated}</td>
                            <td>{item.dateSaved || "Не сохранено"}</td>
                            <td>{item.status}</td>
                            <td>{item.dateStart || "Не указано"}</td>
                            <td>{item.dateEnd || "Не указано"}</td>
                            <td>{item.constellation || "Не указано"}</td>
                            <td>{item.moderID || "Не указано"}</td>
                            <td>
                                <Link to={`${ROUTES.CONS}/${item.reqID}`}>
                                    <Button variant="primary">Подробнее</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ConsTablePage