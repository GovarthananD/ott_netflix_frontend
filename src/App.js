import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from './components/welcome';
import Sign from './components/sign';
import Home from './components/home';
import TVShow from "./components/tv";
import Movies from './components/movies';
import Popular from './components/popular';
import Register from './components/register';
import MovieDetail from './components/search';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tv" element={<TVShow />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/popular" element={<Popular />} />
        <Route path='/search/:query' element={<MovieDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
