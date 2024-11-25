import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
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
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src={img || defaultImage} alt='Картинка' height={100} width={100}  />
        <Card.Body className='cardBody'>            
            <div className="textStyle">
                <Card.Title>{name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {description}
                </Card.Text>
            </div>
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