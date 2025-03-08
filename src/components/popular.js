import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Netflix_Logo from "../asset/Netflix_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, openModal, closeModal } from "../redux/dataSlice";
import { top10data, openTopModal, closeTopModal } from "../redux/topSlice";
import { TVShowing, openTvModal, closeTvModal } from "../redux/tvShow";
import { FetchUSMovie, openModalUS, closeModalUS } from "../redux/usMovie";
import { FetchRomance, openRomanceModal, closeRomanceModal } from "../redux/romance";
import { FetchEurope, openEuropeModal, closeEuropeModal } from "../redux/europe";
import Slider from "react-slick";
import { fetchSearchResults } from "../redux/search";




const Popular = () => {

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

    const { movies, isModalOpen, selectedData = [], status, error } = useSelector((state) => state.movies);
    const { top10, isModalOpenTop, selectedTop = [] } = useSelector((state) => state.top10);
    const { tvShows, isModalOpenTv, selectedTV = [] } = useSelector((state) => state.tvShows);
    const { usMovieData, isModalOpenUS, selectedUS = [] } = useSelector((state) => state.usMovieData);
    const { romance, isOpenModalRomance, selectedRomance = [] } = useSelector((state) => state.romance);
    const { europe, isOpenModalEurope, selectedEurope = [] } = useSelector((state) => state.europe);


    useEffect(() => {
        dispatch(fetchData());
        dispatch(top10data());
        dispatch(TVShowing());
        dispatch(FetchUSMovie());
        dispatch(FetchRomance());
        dispatch(FetchEurope());
    }, [dispatch]);


    if (status === "Loading...") return <div className="container-fluid vh-100 d-flex justify-content-center align-items-center"> <div className="loading-icon"></div></div>
    if (status === "Failed!") return <p>Error: {error}</p>
    if (!movies || movies.length === 0) return <p>No Movies available</p>;
    if (!top10 || top10.length === 0) return <p>No Movies available</p>
    if (!tvShows || tvShows.length === 0) return <p>No TVShows available</p>
    if (!usMovieData || usMovieData.length === 0) return <p>No US Movies available</p>
    if (!romance || romance.length === 0) return <p>No Romance Shows available</p>
    if (!europe || europe.length === 0) return <p>No Europe Movies available</p>


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

    return (<>
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
                                    onChange={(e) => setQuery(e.target.value)}/>
                                <button className="english" onClick={handleLogout}>Logout</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <div className="container-fluid back-nav">
            <div className="container">
                <h5 className="text-white pt-3">Continue Watching</h5>
                <Slider {...settings} className="container mt-4">
                    {movies && movies.data.map((film) => {
                        return (<div className="container mouse w-48 h-64 flex items-center justify-center bg-gray-700 cursor-pointer rounded-xl" key={film.id} onClick={() => dispatch(openModal(film))}>
                            <img className="home-img" src={film.image} alt="poster" />
                        </div>)
                    })}
                </Slider>
            </div>
        </div>

        <div className="container-fluid back-nav">
            <div className="container">
                <h5 className="text-white pt-5">Top 10</h5>
                <Slider {...settings} className="container mt-3">
                    {top10 && top10.data.map((top) => {
                        return (<div className="container mouse" key={top.id} onClick={() => dispatch(openTopModal(top))}>
                            <img className="home-img" src={top.image} alt="poster" />
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

        <div className="container-fluid back-nav">
            <div className="container">
                <h5 className="text-white pt-5">US Movies</h5>
                <Slider {...settings} className="container mt-3 ">
                    {usMovieData && usMovieData.usMovies.map((tv) => {
                        return (<div className="container mouse" key={tv.id} onClick={() => dispatch(openModalUS(tv))}>
                            <img className="home-img" src={tv.image} alt="poster" />
                        </div>)
                    })}
                </Slider>
            </div>
        </div>

        <div className="container-fluid back-nav">
            <div className="container">
                <h5 className="text-white pt-5">Korian Movies</h5>
                <Slider {...settings} className="container mt-3 ">
                    {romance && romance.romance.map((koria) => {
                        return (<div className="container mouse" key={koria.id} onClick={() => dispatch(openRomanceModal(koria))}>
                            <img className="home-img" src={koria.image} alt="poster" />
                        </div>)
                    })}
                </Slider>
            </div>
        </div>

        <div className="container-fluid back-nav">
            <div className="container">
                <h5 className="text-white pt-5">Europe Movies</h5>
                <Slider {...settings} className="container mt-3">
                    {europe && europe.europe.map((rome) => {
                        return (<div className="container mouse" key={rome.id} onClick={() => dispatch(openEuropeModal(rome))}>
                            <img className="home-img" src={rome.image} alt="poster" />
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

        {isModalOpen && selectedData && (
            <div className="modal">
                <div class="modal-content">
                    <div className="card-heading">

                        <span className="close" onClick={() => dispatch(closeModal())}>&times;</span>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6">
                                <img src={selectedData.image} class="img-fluid" alt={selectedData.title} />
                            </div>
                            <div class="col-sm-12 col-lg-6 text-start">
                                <h3>{selectedData.title}</h3><br />
                                <h6>{selectedData.releaseDate} - {selectedData.duration}</h6>
                                <h6>{selectedData.rating}/10</h6>
                                <h6>{selectedData.language}</h6>
                                <h6>{selectedData.genres}</h6>
                                <h6>{selectedData.industry}</h6>
                                <p>{selectedData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isModalOpenTop && selectedTop && (
            <div className="modal">
                <div class="modal-content">
                    <div className="card-heading">

                        <span className="close" onClick={() => dispatch(closeTopModal())}>&times;</span>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6">
                                <img src={selectedTop.image} class="img-fluid" alt={selectedTop.title} />
                            </div>
                            <div class="col-sm-12 col-lg-6 text-start">
                                <h3>{selectedTop.title}</h3><br />
                                <h6>{selectedTop.releaseDate} - {selectedTop.duration}</h6>
                                <h6>{selectedTop.rating}/10</h6>
                                <h6>{selectedTop.language}</h6>
                                <h6>{selectedTop.genres}</h6>
                                <h6>{selectedTop.industry}</h6>
                                <p>{selectedTop.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

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

        {isModalOpenUS && selectedUS && (
            <div className="modal">
                <div class="modal-content">
                    <div className="card-heading">
                        <span className="close" onClick={() => dispatch(closeModalUS())}>&times;</span>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6">
                                <img src={selectedUS.image} class="img-fluid" alt={selectedUS.title} />
                            </div>
                            <div class="col-sm-12 col-lg-6 text-start">
                                <h2>{selectedUS.title}</h2><br />
                                <h6>{selectedUS.releaseDate} - {selectedUS.duration}</h6>
                                <h6>{selectedUS.rating}/10</h6>
                                <h6>{selectedUS.language}</h6>
                                <h6>{selectedUS.genres}</h6>
                                <h6>{selectedUS.industry}</h6>
                                <p>{selectedUS.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isOpenModalRomance && selectedRomance && (
            <div className="modal">
                <div class="modal-content">
                    <div className="card-heading">
                        <span className="close" onClick={() => dispatch(closeRomanceModal())}>&times;</span>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6">
                                <img src={selectedRomance.image} class="img-fluid" alt={selectedRomance.title} />
                            </div>
                            <div class="col-sm-12 col-lg-6 text-start">
                                <h2>{selectedRomance.title}</h2><br />
                                <h6>{selectedRomance.releaseDate} - {selectedRomance.duration}</h6>
                                <h6>{selectedRomance.rating}/10</h6>
                                <h6>{selectedRomance.language}</h6>
                                <h6>{selectedRomance.genres}</h6>
                                <h6>{selectedRomance.industry}</h6>
                                <p>{selectedRomance.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isOpenModalEurope && selectedEurope && (
            <div className="modal">
                <div class="modal-content">
                    <div className="card-heading">
                        <span className="close" onClick={() => dispatch(closeEuropeModal())}>&times;</span>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6">
                                <img src={selectedEurope.image} class="img-fluid" alt={selectedEurope.title} />
                            </div>
                            <div class="col-sm-12 col-lg-6 text-start">
                                <h2>{selectedEurope.title}</h2><br />
                                <h6>{selectedEurope.releaseDate} - {selectedEurope.duration}</h6>
                                <h6>{selectedEurope.rating}/10</h6>
                                <h6>{selectedEurope.language}</h6>
                                <h6>{selectedEurope.genres}</h6>
                                <h6>{selectedEurope.industry}</h6>
                                <p>{selectedEurope.description}</p>
                            </div>
                        </div>
                    </div>
                </div>y
            </div>
        )}

    </>)
}

export default Popular;