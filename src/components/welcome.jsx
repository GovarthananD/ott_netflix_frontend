import React, { useState } from "react";
import Netflix_Logo from "../asset/Netflix_Logo.png";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




const Welcome = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email) {
            navigate(`/sign?email=${encodeURIComponent(email)}`)
        }
    }

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (<>
        <div className="container-fluid back">
            <nav class="navbar">
                <div class="container-fluid">
                    <img src={Netflix_Logo} alt="Logo" class="img-fluid" style={{ height: "60px" }} />
                    <form class="d-flex me-5">
                        <button className="me-3 english-1">English</button>
                        <button className="me-5 english" onClick={()=>navigate("/sign")}>Sign In</button>
                    </form>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div class="d-flex flex-column mb-3 align-items-center text-center">
                        <div class="p-2 fs-1 fw-bold text-white">Unlimited movies,</div>
                        <div class="p-2 fs-1 fw-bold text-white">TV shows and more</div>
                        <div class="p-2 fw-bold text-white">Starts at ₹149. Cancel at any time.</div>
                        <div class="p-2 text-white">Ready to watch? Enter your email to create or restart your membership.
                        </div>
                        <div class="container text-center mt-4">
                            <div class="row">
                                <div class="col-sm-8">
                                    <input type="email" class=" form-control address" id="email" placeholder="Enter address" required value={email}
                                        onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div class="col-sm-4">
                                    <button class="btn w-100 get fw-bold" onClick={handleSubmit}>Get Started &gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid home-card">
            <h3 className="fw-bold text-white pt-5 mb-3">Trending Now</h3>
            <div className="slider-container game">
                <Slider {...settings}>
                    <div>
                        <img src="https://static.displate.com/324x454/displate/2022-03-04/7f2be31591202c32f16989084bd09d20_5625617065f2ede08dda84067d62627a.avif" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://external-preview.redd.it/official-first-poster-for-venom-the-last-dance-v0-QRoTFuj9xNnWiaJ5TZveODcuYA2WwSaRsMVXdb3kAJ8.jpg?width=640&crop=smart&auto=webp&s=88b1953dc6b0733bcd3482038f51fd3060fe0ea8" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://m.media-amazon.com/images/I/51SsLHV77FL._AC_UF1000,1000_QL80_.jpg" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://pbs.twimg.com/media/GYYk6rMXIAAWufA?format=jpg&name=large" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/736x/e2/d5/9c/e2d59c89af6af87cebd7d8578e714975.jpg" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://preview.redd.it/devara-is-going-to-flop-v0-gvrw8tl2pb1d1.jpeg?auto=webp&s=b8891511c1b6a118dfa9f8b1e6dd6d4585ce03da" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/originals/c8/a6/3f/c8a63f3698e82c3d3d64d38b0838eec6.jpg" class="poster" alt="..." />
                    </div>
                    <div>
                        <img src="https://image.tmdb.org/t/p/original/lJV3bfyrzl1SduQjl6y5lqolwA7.jpg" class="poster" alt="..." />
                    </div>
                </Slider>
            </div>
        </div>

        <div className="container-fluid home-card mb-0">
            <h3 className="fw-bold text-white pt-5 mb-5">More reasons to join</h3>
            <div class="row">
                <div class="col">
                    <div class="card text-white mb-5 home-cards" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <h5 class="card-title mb-5 fw-bold">Enjoy on your TV</h5>
                            <p class="card-text">Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-white mb-5 home-cards" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <h5 class="card-title mb-5 fw-bold">Download your shows to watch offline</h5>
                            <p class="card-text">Save your favourites easily and always have something to watch.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card text-white mb-5 home-cards" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <h5 class="card-title mb-5 fw-bold">Watch everywhere</h5>
                            <p class="card-text">Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p>
                        </div>
                    </div>
                </div>
                <div class="col"><div class="card text-white mb-5 home-cards" style={{ width: "18rem" }}>
                    <div class="card-body">
                        <h5 class="card-title mb-5 fw-bold">Create profiles for kids</h5>
                        <p class="card-text">Send kids on adventures with their favourite characters in a space made just for them — free with your membership.</p>
                    </div>
                </div></div>
            </div>
        </div>

        <div className="container-fluid home-card pb-5">
            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
                        What is Netflix?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample1">
                    <div class="card card-body col-div">
                        Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.

                        You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!
                    </div>
                </div>
            </div>

            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                        How much does Netflix cost?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample2">
                    <div class="card card-body col-div">
                        Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.
                    </div>
                </div>
            </div>
            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
                        Where can I watch?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample3">
                    <div class="card card-body col-div">
                        Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

                        You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
                    </div>
                </div>
            </div>
            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample">
                        How do I cancel?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample4">
                    <div class="card card-body col-div">
                        Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
                    </div>
                </div>
            </div>
            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample5" aria-expanded="false" aria-controls="collapseExample">
                        What can I watch on Netflix?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample5">
                    <div class="card card-body col-div">
                        Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
                    </div>
                </div>
            </div>
            <div className="container w-60">
                <p class="d-inline-flex gap-1 coll-btn">
                    <button class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample6" aria-expanded="false" aria-controls="collapseExample">
                        Is Netflix good for Kids?
                    </button>
                </p>
                <div class="collapse col-div mb-3" id="collapseExample6">
                    <div class="card card-body col-div">
                        The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.

                        Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid text-white home-card">
            <p className="mb-5 foot-link">Questions? Call 000-800-919-1743</p>
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

    </>
    )
}

export default Welcome;