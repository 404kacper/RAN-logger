import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

import Files from "../layout/Files";
import Filters from "../layout/Filters";
import LogsList from "../layout/LogsList";
import NavbarCentre from "../layout/NavbarCentre";
import PanelThemeIcons from "../layout/PanelThemeIcons";

import "../../App.css";
import SearchBar from "../layout/SearchBar";

const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Fragment>
      {/* Initial grid = Row 1 - 3 Col | Row 2 - 2 Col - second row is further divided */}
      <Row style={{ height: "8vh" }}>
        <Col
          lg={1}
          style={{ borderRight: "1px solid" , ...{backgroundColor: "lightgray"}}}
          className="border-light d-flex justify-content-start align-items-center"
        >
          {/* Place for toolbar icons */}
        </Col>
        <Col
          lg={10}
          style={{ borderRight: "1px solid" }}
          className="border-light bg-warning d-flex justify-content-center align-items-center"
        >
          <NavbarCentre />
        </Col>
        <Col
          lg={1}
          style={{backgroundColor: "lightgray"}}
          className=" d-flex justify-content-center align-items-center"
        >
          <PanelThemeIcons />
          {/* Place for theme icon */}
        </Col>
      </Row>
      <Row style={{ height: "95vh" }}>
        <Col
          lg={"auto"}
          className="bg-success border border-2 border-dark p-0"
          style={collapsed ? { width: "1.8vw" } : { width: "8.33vw" }}
        >
          {/* Grid of 2 rows 1 column */}
          <Row style={{ height: "47.5vh" }} className="align-items-top">
            <Col>
              <Filters collapsed={collapsed} collapsedChanger={setCollapsed} />
            </Col>
          </Row>

          <Row style={{ height: "47.5vh" }} className="border-top border-dark">
            <Col>
              {/* Dropzone component to be reworked - needs new state for errors => alerts */}
              {/* Also needs to be secured only to accept specific format of files(potential errors) - .txt for example */}
              <Files collapsed={collapsed} />
            </Col>
          </Row>
        </Col>
        <Col style={{ backgroundColor: "lightgray" }}>
          {/* Grid of 3 rows 1 column */}
          <Row
            style={{ height: "10vh" }}
            className="align-items-center bg-danger"
          >
            <Col className="d-flex justify-content-center">
              {/* Place for log filters and/or search bar */}
              <SearchBar />
            </Col>
          </Row>
          <Row style={{ height: "85vh" }}>
            <Col style={{ height: "100%" }}>
              <LogsList />
            </Col>
          </Row>
          {/* <LogsList /> */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
