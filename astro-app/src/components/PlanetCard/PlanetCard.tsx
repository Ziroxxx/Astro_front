import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import './PlanetCard.css'
import defaultImage from './default.jpg'

interface Props {
    planetID: number,
    name: string,
    description: string,
    img: string,
    detDes: string,
    addToWish: () => void,
    delFromWish: () => void,
    mode: string,
    disabled: boolean
}

export const PlanetCard: FC<Props> = ({ name, description, img, planetID, addToWish, delFromWish, mode, disabled}) => (
    <Card className="card h-100">
        <Card.Img className="cardImage h-100 w-100" variant="top" src={img || defaultImage} alt='Картинка' />
        <Card.Body className='cardBody'>            
            <Card.Title className='textTitle'>{name}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <div className="blockButtons">
                <Link to={`${ROUTES.PLANETS}/${planetID}`} className="linkCardButton">
                    <Button className="cardButton" variant="primary">Подробнее</Button>
                </Link>
                <Button hidden={mode != 'add'} className='cardButton' variant='primary' onClick={() => addToWish()}>Добваить</Button>
                <Button hidden={mode != 'del'} className='cardButton' variant='primary' onClick={() => delFromWish()} disabled={disabled}>Удалить</Button>
            </div>
        </Card.Body>
    </Card>
)

export default PlanetCard;