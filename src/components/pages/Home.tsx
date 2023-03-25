import InputForm from '../layout/InputForm';
import ModalButton from '../layout/ModalButton';
import Dropzone from '../layout/Dropzone';
import { Container } from 'react-bootstrap';

const Home = () => (
  <Container>
    {/* Dropzone component to be reworked - needs new state for errors => alerts */}
    {/* Also needs to be secured only to accept specific format of files(potential errors) - .txt for example */}
    <Dropzone></Dropzone>
    <InputForm></InputForm>
    <ModalButton></ModalButton>
  </Container>
);

export default Home;
