import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/MainPage/MainPage';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import Layout from './Layout/Layout';
import { DataProvider } from './context/DataContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const header = <Header />;

const content = (
  <>
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  </>
);

const footer = <Footer />;

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout header={header} content={content} footer={footer} />
      </Router>
    </DataProvider>
  );
}

export default App;
