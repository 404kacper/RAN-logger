import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
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
      {/* Initial grid = Row 1 - 1 Col | Row 1 - 2 Col - second row is further divided */}
      <Row style={{ height: "8vh"}}>
        <Col
          //lg={10}
          className="bg-white d-flex"
        >
          <NavbarCentre />
        </Col>
      </Row>
      <Row style={{ height: "95vh" }} className="align-items-top">
        <Col
          lg={"auto"}
          className="p-0"
        >
          {/* Dropzone component to be reworked - needs new state for errors => alerts */}
          {/* Also needs to be secured only to accept specific format of files(potential errors) - .txt for example */}
          <Files collapsed={collapsed} />
        </Col>
        <Col  lg={"auto"} style={{backgroundColor: "rgb(248,248,248)" }} className="p-0">
            <Filters collapsed={collapsed} collapsedChanger={setCollapsed}/>
        </Col>
        <Col style={{ backgroundColor: "rgb(248,248,248)" }}>
          {/* Grid of 3 rows 1 column */}
          <Row
            style={{ height: "10vh", left:"70rem"}}
            className="align-items-center"
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
