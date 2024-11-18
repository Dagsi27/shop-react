import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/MainPage/MainPage'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import Layout from './Layout/Layout'

const header = <Header/>

const content = (
  <>
    <Routes>
     {/*Home Page*/}
      <Route path="/" element={<HomePage />} /> 
    </Routes>
  </>
);

const footer = <Footer />;

function App() {
  return (
    <Router>
      <Layout header={header} content={content} footer={footer} />
    </Router>
  );
}

export default App;
