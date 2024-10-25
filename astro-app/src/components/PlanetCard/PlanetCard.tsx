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
    detDes: string
}

export const PlanetCard: FC<Props> = ({ name, description, img, planetID}) => (
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src={img || defaultImage} height={100} width={100}  />
        <Card.Body className='cardBody'>            
            <div className="textStyle">
                <Card.Title>{name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {description}
                </Card.Text>
            </div>
            <Link to={`${ROUTES.PLANETS}/${planetID}`} className="linkCardButton">
                <Button className="cardButton" variant="primary">Подробнее</Button>
            </Link>
        </Card.Body>
    </Card>
)

export default PlanetCard;