import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import SamsungLogo from '../../assets/samsung.png';

const NavbarCentre: React.FC = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img src={SamsungLogo} width='170' height='27' alt='' />
        </Navbar.Brand>
        <Navbar.Brand style={{ fontWeight: 'bold' }}>RAN</Navbar.Brand>
        <Navbar.Brand>|</Navbar.Brand>
        <Navbar.Brand>Log Viewer</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarCentre;
