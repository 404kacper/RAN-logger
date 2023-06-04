import React from "react";
import { Container } from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretRight, faCaretLeft} from "@fortawesome/free-solid-svg-icons"

interface FilterProps {
  collapsed: boolean;
  collapsedChanger: any;
}

const Filters: React.FC<FilterProps> = ({collapsed, collapsedChanger}) => {
    return (
      <Container className={`py-2 sidebar ${collapsed ? "collapsed" : ""}`} style={{height:"5.4vh", backgroundColor: "black", borderTopRightRadius: "4px", borderBottomRightRadius:"4px"}} >
        <div className="d-flex justify-content-start">
          {collapsed ? ( <FontAwesomeIcon className="sidebar_expand_icon" icon={faCaretRight} onClick={() => collapsedChanger(!collapsed)} style={{marginLeft: 'auto', marginTop: '1rem', color:"white"}}/>) 
            : (<FontAwesomeIcon  className="sidebar_expand_icon" icon={faCaretLeft} onClick={() => collapsedChanger(!collapsed)} style={{marginLeft: 'auto', marginTop: '1rem', color:"white"}}/>)}
        </div>
      </Container>
    );
  };
  
  export default Filters;