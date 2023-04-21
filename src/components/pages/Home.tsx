import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import Files from '../layout/Files';
import Filters from '../layout/Filters';
import LogsList from '../layout/LogsList'; 
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import  '../../App.css';

const handleButton1Click = () => {
  console.log("Button 1 clicked!");
};

const handleButton2Click = () => {
  console.log("Button 2 clicked!");
};

const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    
    <Fragment>
      {/* Initial grid = Row 1 - 3 Col | Row 2 - 2 Col - second row is further divided */}
      <Row style={{ height: '2%' }}>
        <Col lg={1} className='border-light bg-success d-flex justify-content-start align-items-center'>
        <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem>
              <Nav.Link href="#" className="btn btn-primary"onClick={handleButton1Click}>
                Button 1
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="#" className="btn btn-success" onClick={handleButton2Click}>
                <FontAwesomeIcon icon={faSave} /> Save
              </Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        </Col>
        <Col lg={10} style={{ borderRight: '1px solid' }} className='border-light bg-warning d-flex justify-content-center align-items-center'>
          Place for title
        </Col>
        <Col lg={1} className='bg-success d-flex justify-content-center align-items-center'>
          
        </Col>
      </Row>
      <Row style={{ height: '95vh' }}>
        <Col lg={"auto"} className='bg-success border border-2 border-dark p-0'  style={collapsed ? {width: '1.8vw'} : {width: '8.33vw'}}>
          {/* Grid of 2 rows 1 column */}
            <Row style={{ height: '47.5vh' }} className='align-items-top'>
              <Col>              
                <Filters collapsed={collapsed} collapsedChanger={setCollapsed} />
              </Col>
            </Row>

          <Row style={{ height: '47.5vh' }} className='border-top border-dark'>
            <Col>
              {/* Dropzone component to be reworked - needs new state for errors => alerts */}
              {/* Also needs to be secured only to accept specific format of files(potential errors) - .txt for example */}
              <Files collapsed={collapsed}/>
            </Col>
          </Row>
        </Col>
        <Col style={{backgroundColor: 'lightgray'}}>
          {/* Grid of 3 rows 1 column */}
          <Row style={{ height: '10vh' }}>
            <Col className='d-flex justify-content-center'>
              
            </Col>
          </Row>
          <Row style={{ height: '75vh' }}>
            <Col style={{ height: '100%' }}>
              <LogsList/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
