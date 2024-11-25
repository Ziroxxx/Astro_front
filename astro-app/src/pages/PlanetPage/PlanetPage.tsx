import "./PlanetPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import { PLANETS_MOCK } from "../../modules/mock";
import defaultImage from "./default.jpg";
import NavbarComponent from "../../components/NavBar/NavBar";

import { api } from "../../api";
import { PlanetSerial } from "../../api/Api";

export const PlanetPage: FC = () => {
  const [pageData, setPageDdata] = useState<PlanetSerial>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    api.planet.planetRead(id)
      .then((response) => setPageDdata(response.data))
      .catch(() => {
        setPageDdata(PLANETS_MOCK.planets.find((planet) => String(planet.planetID) == id))
      })
  }, [id]);

  return (
    <div>
      <NavbarComponent />
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.PLANETS, path: ROUTES.PLANETS },
          { label: pageData?.name || "Планета" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="container">
          <Row>
            <Col xl={4} md={1} xs={1} >
              <Image className="img"
                src={pageData.img || defaultImage} // дефолтное изображение, если нет artworkUrl100
                alt="Картинка"
                width={350}
              />
            </Col>
            <Col xl={8}>
              <p>
                <strong>{pageData.name}</strong>
              </p>
              <p>
                {pageData.detDes}
              </p>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};