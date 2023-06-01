import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

import Files from "../layout/Files";
import Filters from "../layout/Filters";
import LogsList from "../layout/LogsList";
import NavbarCentre from "../layout/Navbar";
import "../../App.css";
import SearchBar from "../layout/SearchBar";

const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);


  return (
    <Fragment>
      {/* Initial grid = Row 1 - 3 Col | Row 2 - 2 Col - second row is further divided */}
      <Row style={{ height: "8vh" }}>
        <Col
          //lg={10}
          style={{ borderRight: "1px solid" }}
          className="border-dark bg-light d-flex"
        >
          <NavbarCentre />
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
            style={{ height: "10vh", left:"70rem"}}
            className="align-items-center bg-danger"
          >
            <Col className="d-flex justify-content-end">
              {/* Place for log filters and/or search bar */}
              <SearchBar />
            </Col>
          </Row>
          <Row style={{ height: "85vh" }}>
            <Col style={{ height: "100%" }}>
              <LogsList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
