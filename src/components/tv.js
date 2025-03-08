import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Netflix_Logo from "../asset/Netflix_Logo.png";
import { TVShowing, openTvModal, closeTvModal } from "../redux/tvShow";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/search";



const TVShow = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(fetchSearchResults(query));
            navigate(`/search/${query}`);
        }
    };

    const { tvShows, isModalOpenTv, selectedTV = [] } = useSelector((state) => state.tvShows);
    console.log(tvShows);

    useEffect(() => {
        dispatch(TVShowing());
    }, [dispatch]);

    if (!tvShows || tvShows.length === 0) return <p>No TVShows available</p>

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/sign");
    }

    return (
        <div className="">
            <div className="container-fluid back-nav ">
                <div className="container-fluid">
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <img src={Netflix_Logo} alt="Logo" class="img-fluid" style={{ height: "60px" }} />
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon bg-white"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link text-white mouse" aria-current="page" onClick={() => navigate("/home")}>Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white mouse" onClick={() => navigate("/tv")}>TV Shows</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white mouse" onClick={() => navigate("/movies")}>Movies</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white mouse" onClick={() => navigate("/popular")}>New & Popular</a>
                                    </li>
                                </ul>
                                <form class="d-flex" role="search" type="submit" onSubmit={handleSearch}>
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query}
                                        onChange={(e) => setQuery(e.target.value)} />
                                    <button className="english3" onClick={handleLogout}>Logout</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="container-fluid back-nav">
                <div className="container">
                    <h5 className="text-white pt-5">Award - Winning TV Shows</h5>
                    <Slider {...settings} className="container mt-3 ">
                        {tvShows && tvShows.tvdata.map((tv) => {
                            return (<div className="container mouse" key={tv.id} onClick={() => dispatch(openTvModal(tv))}>
                                <img className="home-img" src={tv.image} alt="poster" />
                            </div>)
                        })}
                    </Slider>
                </div>
            </div>

            <div className="container-fluid back-nav">
                <div className="container">
                    <h5 className="text-white pt-5">TV Shows</h5>
                    <Slider {...settings} className="container mt-3 ">
                        {tvShows && tvShows.tvdata.map((tv) => {
                            return (<div className="container mouse" key={tv.id} onClick={() => dispatch(openTvModal(tv))}>
                                <img className="home-img" src={tv.image} alt="poster" />
                            </div>)
                        })}
                    </Slider>
                </div>
            </div>

            <div className="container-fluid text-white home-card">
                <p className="mb-5 foot-link pt-5">Questions? Call 000-800-919-1743</p>
                <div className="row mt-5">
                    <div className="col-3 foot-link">
                        <p>FAQ</p>
                        <p>Investor Relations</p>
                        <p>Privacy</p>
                        <p>Speed Test</p>
                    </div>
                    <div className="col-3 foot-link">
                        <p>Help Centre</p>
                        <p>Jobs</p>
                        <p>Cookie Preferences</p>
                        <p>Legal Notices</p>
                    </div>
                    <div className="col-3 foot-link">
                        <p>
                            Account</p>
                        <p>Ways to Watch</p>
                        <p>Corporate Information</p>
                        <p>Only on Netflix</p>
                    </div>
                    <div className="col-3 foot-link">
                        <p>Media Centre</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                    </div>
                </div>
            </div>

            {isModalOpenTv && selectedTV && (
                <div className="modal">
                    <div class="modal-content">
                        <div className="card-heading">
                            <span className="close" onClick={() => dispatch(closeTvModal())}>&times;</span>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6">
                                    <img src={selectedTV.image} class="img-fluid" alt={selectedTV.title} />
                                </div>
                                <div class="col-sm-12 col-lg-6 text-start">
                                    <h2>{selectedTV.title}</h2><br />
                                    <h6>{selectedTV.releaseDate} - {selectedTV.duration}</h6>
                                    <h6>{selectedTV.rating}/10</h6>
                                    <h6>{selectedTV.language}</h6>
                                    <h6>{selectedTV.genres}</h6>
                                    <h6>{selectedTV.industry}</h6>
                                    <p>{selectedTV.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default TVShow;