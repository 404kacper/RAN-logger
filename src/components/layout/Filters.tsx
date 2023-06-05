import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

interface FilterProps {
  collapsed: boolean;
  collapsedChanger: any;
}

const Filters: React.FC<FilterProps> = ({collapsed, collapsedChanger}) => {
    return (
      <Container className='py-2' style={{height:"4rem", width:"1.25rem"  ,backgroundColor: "black", borderTopRightRadius: "4px", borderBottomRightRadius:"4px"}} onClick={() => collapsedChanger(!collapsed)} >
        <div className="d-flex justify-content-center">
          {collapsed ? ( <FontAwesomeIcon className="sidebar_expand_icon" icon={faCaretRight} style={{marginTop: '1rem', color:"white"}}/>) 
            : (<FontAwesomeIcon  className="sidebar_expand_icon" icon={faCaretLeft} style={{marginTop: '1rem', color:"white"}}/>)}
        </div>
      </Container>
    );
  };
  
  export default Filters;
