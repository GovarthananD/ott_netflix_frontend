import React, { useState } from "react";
import Netflix_Logo from "../asset/Netflix_Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Sign = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        if (!user.email || !user.password) {
            setError("Both fields are required.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("https://ott-netflix-backend.onrender.com/login", user);
            alert("Login Success", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/home");

        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (<>
        <div className="container-fluid back">
            <nav class="navbar">
                <div class="container-fluid">
                    <img src={Netflix_Logo} alt="Logo" class="img-fluid" style={{ height: "60px" }} />
                </div>
            </nav>

            <div className="container ">
                <div className="row  d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-4 md-6 xl-8 outline">
                        <p className="text-white fs-1 fw-bold">Sign In</p>
                        {error && <p className="text-danger">{error}</p>}
                        <form>
                            <div class="mb-3">
                                <input  name="email"
                                    value={user.email}
                                    onChange={handleChange} placeholder="Email" type="email" class="form-control for" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <input placeholder="Password" name="password"
                                    value={user.password}
                                    onChange={handleChange} type="password" class="form-control for" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" class="btn btn-danger w-100 fw-bold" onClick={handleLogin}>Sign In</button>
                            {loading ? "Signing In..." : "Sign In"}
                            <p className="new mt-3">New to Netflix? <span className="text-white home-nav" onClick={() => navigate("/register")}>Sign up now</span></p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Sign;