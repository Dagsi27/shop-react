import "./MainPage.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function MainPage() {
    useWebsiteTitle("Strona główna");

    return (
        <main className="container mt-4">
            <div className="mainContainer row d-flex justify-content-between">
            {/* Slider*/}
                <div className="carousel slide " id="mainSlider" data-bs-ride="carousel">
                    <div className="carousel-inner ">
                            <div className="carousel-item active  ">
                                <img src="https://images.unsplash.com/photo-1683183193480-bda1292dd5ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-500 item-image" alt="Slide 1" />
                                <div className="carousel-caption d-flex flex-column align-items-start text-start">
                                    <h2 className="caption-text">Amazing Discounts</h2>
                                    <p className=" caption-text ms-auto text-endend">Buy yourself a favor</p>
                                    <button className="shop-button ">Shop Now</button>
                                </div>
                            <div className="carousel-item">
                                <img src="https://via.placeholder.com/1200x400" className="d-block w-500" alt="Slide 2" />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* Special categories */}
                <div className="row text-center d-flex justify-content-around" id="specialCategories">
                    <div className="col-2 col-md-4 col-lg-5">
                        <Link to="/discounts" className="text-decoration-none">
                            <img src="https://via.placeholder.com/500x600" className="img-fluid rounded" alt="Cars" />
                            <p className="mt-2">Discounts</p>
                        </Link>
                    </div>
                    <div className="col-2 col-md-4 col-lg-5">
                        <Link to="/popular" className="text-decoration-none">
                            <img src="https://via.placeholder.com/500x600" className="img-fluid rounded" alt="Toys" />
                            <p className="mt-2">Popular</p>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Categories Section */}
            <section className="mt-5">
                <h3 className="text-center">Shop by Categories</h3>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <button className="btn btn-outline-secondary">&larr;</button>
                    <button className="btn btn-outline-secondary">&rarr;</button>
                </div>
                <div className="row text-center">
                    <div className="col-6 col-md-4 col-lg-2">
                        <Link to="/cars" className="text-decoration-none">
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Cars" />
                            <p className="mt-2">Cars</p>
                        </Link>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <Link to="/toys" className="text-decoration-none">
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Toys" />
                            <p className="mt-2">Toys</p>
                        </Link>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <Link to="/music" className="text-decoration-none">
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Music" />
                            <p className="mt-2">Music</p>
                        </Link>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <Link to="/electronics" className="text-decoration-none">
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Electronics" />
                            <p className="mt-2">Electronics</p>
                        </Link>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <Link to="/furniture" className="text-decoration-none">
                            <img src="https://via.placeholder.com/150" className="img-fluid rounded" alt="Furniture" />
                            <p className="mt-2">Furniture</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
