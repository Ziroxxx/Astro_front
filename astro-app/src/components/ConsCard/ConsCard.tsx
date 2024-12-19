import { ROUTES } from "../../Routes"
import "./ConsCard.css"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface props {
    id?: number,
    creator?: string,
    dateCreated?: string,
    dateSaved?: string | null,
    dateModerated?: string | null,
    status?: string,
    dateStart?: string | null,
    dateEnd?: string | null,
    constellation?: string | null,
    moder?: string
}

const ConsCard: FC<props> = ({id, creator, dateCreated, dateSaved, dateModerated, status, moder}) => {
    const decStatus = (status?: string) => {
        if(status === 'saved')
            return 'Сохранена'
        if(status == 'accepted')
            return 'Принята'
        return 'Отклонена'
    }

    const decStatusClass = (status?: string) => {
        if(status === 'saved')
            return 'savedClass'
        if(status == 'accepted')
            return 'acceptedClass'
        return 'rejectedClass'
    }

    const navigate = useNavigate()

    return (
            <div className="cardWrapper" onClick={() => navigate(`${ROUTES.CONS}/${id}`)}>
                <div className="field">
                    <div>#{id}</div>
                    <div className={decStatusClass(status)}>{decStatus(status)}</div>
                </div>
                <div className="field">
                    <div className="fieldName">Астролог:</div>
                    <div className="fieldValue">{creator}</div>
                </div>
                <div className="field">
                    <div className="fieldName">Астроном:</div>
                    <div className="fieldValue">{moder || '-'}</div>
                </div>
                <div className="field">
                    <div className="fieldName">Создание: </div>
                    <div className="fieldValue">{dateCreated}</div>
                </div>
                <div className="field">
                    <div className="fieldName">Формирование: </div>
                    <div className="fieldValue">{dateSaved}</div>
                </div>
                <div className="field">
                    <div className="fieldName">Модерирование: </div>
                    <div className="fieldValue">{dateModerated || '-'}</div>
                </div>

                {/* <Col className="firstCol">
                    <div className="field">
                        <div className="fieldName">Астролог:</div>
                        <div className="fieldValue">&emsp;{creator}</div>
                    </div>
                    <div className="field">
                        <div className="fieldName">Астроном:</div>
                        <div className="fieldValue">&emsp;{moder || '-'}</div>
                    </div>
                    <div className="idStatus">
                        <div>#{id}</div>
                        <div className={decStatusClass(status)}>{decStatus(status)}</div>
                    </div>
                </Col>
                <Col className="secondCol">
                    <div className="field">
                        <div className="fieldName">Создание: </div>
                        <div className="fieldValue">&emsp;{dateCreated}</div>
                    </div>
                    <div className="field">
                        <div className="fieldName">Формирование: </div>
                        <div className="fieldValue">&emsp;{dateSaved}</div>
                    </div>
                    <div className="field">
                        <div className="fieldName">Модерирование: </div>
                        <div className="fieldValue">&emsp;{dateModerated || '-'}</div>
                    </div>
                    <Link to={`${ROUTES.CONS}/${id}`} className="marginTop">
                        <Button className="consCardBtn">Подробнее</Button>
                    </Link>
                </Col>
                <Col className="thirdCol">
                    <div className="field">
                        <div className="fieldName">С:</div>
                        <div className="fieldValue">&emsp;{dateStart}</div>
                    </div>
                    <div className="field">
                        <div className="fieldName">По:</div>
                        <div className="fieldValue">&emsp;{dateEnd}</div>
                    </div>
                    <div className="field">
                        <div className="fieldName">В созвездии:</div>
                        <div className="fieldValue">&emsp;{constellation}</div>
                    </div>
                </Col> */}
            </div>
    )
}

export default ConsCard