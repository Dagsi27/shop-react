import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/MainPage/MainPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import ProductsPageList from './Pages/ProductsPageList/ProductsPageList';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ProductForm from "./Pages/ProductForm/ProductForm";
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import Layout from './Layout/Layout';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const header = <Header />;
  const content = (
    <>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profilePage" element={<ProfilePage/>}/>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/products" element={<ProductsPageList />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </>
  );
  const footer = <Footer />;

  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <Layout header={header} content={content} footer={footer} />
          <ToastContainer />
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;