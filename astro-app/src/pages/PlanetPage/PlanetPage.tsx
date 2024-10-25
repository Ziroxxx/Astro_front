import "./PlanetPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { planetInfo, getPlanetById } from "../../modules/AstroAPI";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import { PLANETS_MOCK } from "../../modules/mock";
import defaultImage from "./default.jpg";

export const PlanetPage: FC = () => {
  const [pageData, setPageDdata] = useState<planetInfo>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getPlanetById(id)
      .then((response) => setPageDdata(response))
      .catch(() => {
        setPageDdata(PLANETS_MOCK.planets.find((planet) => String(planet.planetID) == id))
      })
  }, [id]);

  return (
    <div>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.PLANETS, path: ROUTES.PLANETS },
          { label: pageData?.name || "Планета" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="container">
          <Row>
            <Col md={4}>
              <Image className="img"
                src={pageData.img || defaultImage} // дефолтное изображение, если нет artworkUrl100
                alt="Картинка"
                width={350}
              />
            </Col>
            <Col md={8}>
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