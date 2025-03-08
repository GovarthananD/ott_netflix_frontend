import React, { useState } from "react";
import Netflix_Logo from "../asset/Netflix_Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Register = () => {
    const [user, setUser] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!user.name || !user.mobile || !user.email || !user.password) {
            setError("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post("https://ott-netflix-backend.onrender.com/signup", user);
            alert("Registration Success", response.data);
            navigate("/sign");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    }


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
                        <form onSubmit={handleRegister}>
                            <div class="input-group mb-3">
                                <input name="name" value={user.name}
                                    onChange={handleChange} type="text" class="form-control for" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div class="input-group mb-3">
                                <input type="number" name="mobile" value={user.mobile}
                                    onChange={handleChange} class="form-control for" placeholder="Mobile" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div class="mb-3">
                                <input placeholder="Email" name="email" value={user.email}
                                    onChange={handleChange} type="email" class="form-control for" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <input placeholder="Password" name="password" value={user.password}
                                    onChange={handleChange} type="password" class="form-control for" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" class="btn btn-danger w-100 fw-bold" >Sign In</button>
                            {loading ? "Registering..." : "Register"}
                            <p className="new mt-3">New to Netflix? <span className="text-white home-nav" onClick={() => navigate("/register")}>Sign up now</span></p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Register;