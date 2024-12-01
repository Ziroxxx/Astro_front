import { FC } from 'react'
import { Button, Card, Row, Col, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import './PlanetCardHorizontal.css'
import defaultImage from './default.jpg'

interface Props {
    planetID: number,
    name: string,
    description: string,
    img: string,
    detDes: string,
    delFromWish: () => void,
    disabled: boolean
}

export const PlanetCard: FC<Props> = ({ name, description, img, planetID, delFromWish, disabled}) => (
    // <Card className="card">
        
    //         <Card.Img className="cardImage" width={50} src={img || defaultImage} alt='Картинка' />
    //         <Card.Body className='cardBody'>            
    //             <Card.Title className='textTitle'>{name}</Card.Title>
    //             <Card.Text>
    //                 {description}
    //             </Card.Text>
    //             <div className="blockButtons">
    //                 <Link to={`${ROUTES.PLANETS}/${planetID}`} className="linkCardButton">
    //                     <Button className="cardButton" variant="primary">Подробнее</Button>
    //                 </Link>
    //                 <Button className='cardButton' variant='primary' onClick={() => delFromWish()} disabled={disabled}>Удалить</Button>
    //             </div>
    //         </Card.Body>
        
    // </Card>
    <div className='cardH'>
        <Row>
            <Col className='col-auto'>
                <Image className='cardImageH' width={200} height={200} src={img || defaultImage}></Image>
            </Col>
            <Col >
                <div className='cardBodyH'>
                    <Row>
                        <Col>
                            <h4 className='textTitle'>{name}</h4>
                            <div className=''>{description}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="blockButtonsH">
                                <Link to={`${ROUTES.PLANETS}/${planetID}`}>
                                    <Button className="cardButtonH" variant="primary">Подробнее</Button>
                                </Link>
                                <Button className='cardButtonH' variant='primary' onClick={() => delFromWish()} disabled={disabled}>Удалить</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </div>

)

export default PlanetCard;