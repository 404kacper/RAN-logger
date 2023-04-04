import { Fragment } from 'react';
import {Row, Col } from 'react-bootstrap';

import Dropzone from '../layout/Dropzone';
import Filters from '../layout/Filters';

const Home = () => (
  <Fragment>
    {/* Initial grid = Row 1 - 3 Col | Row 2 - 2 Col - second row is further divided */}
    <Row style={{height: '5vh'}}>
      <Col lg={1} style={{borderRight: '1px solid'}} className='border-light bg-success d-flex justify-content-center align-items-center'> Place for toolbar icons</Col>
      <Col lg={10} style={{borderRight: '1px solid'}} className='border-light bg-warning d-flex justify-content-center align-items-center'> Place for title</Col>
      <Col lg={1} className='bg-success d-flex justify-content-center align-items-center'> Place for theme icon</Col>
    </Row>
    <Row style={{height: '95vh'}}>
      <Col lg={1} className='bg-success border-top no-padding'>
      {/* Grid of 2 rows 1 column */}
        <Row style={{height: '47.5vh'}} className='align-items-top'>
          <Col className='d-flex justify-content-left'>
            <Filters></Filters>
          </Col>
        </Row>
        <Row style={{height: '47.5vh'}} className='border-top align-items-center'>
          <Col className='d-flex justify-content-center'> Place for files</Col>
        </Row>
      </Col>
      <Col lg={11} className='bg-primary'>
        {/* Grid of 2 rows 1 column */}
        <Row style={{height: '10vh'}} className='align-items-center bg-danger'>
          <Col className='d-flex justify-content-center'> Place for log filters and/or search bar</Col>
        </Row>
        <Row style={{height: '85vh'}} className='align-items-center bg-info'>
          <Col className='d-flex flex-column justify-content-center'>
            {/* Dropzone component to be reworked - needs new state for errors => alerts */}
            {/* Also needs to be secured only to accept specific format of files(potential errors) - .txt for example */}
            <Dropzone></Dropzone>
          </Col>
        </Row>
      </Col>
    </Row>
  </Fragment>
);

export default Home;
