import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSearchResults, clearSearchResults } from "../redux/search";






const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchSearchResults(query));

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, query]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container-fluid back-nav vh-100">
      <h2 className="pt-5">Search Results for: "{query}"</h2>
      <div className="row mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie._id} className="col-md-3 mb-3 poster">
              <div className="card">
                <img
                  src={movie.image}
                  className="card-img-top-fluid"
                  alt={movie.title}
                />
                <div className="card-body ">
                  <p className="card-title fs-3 fw-bold">{movie.title}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>No results found.</h3>
        )}
      </div>
    </div>

    
  );
};

export default SearchResults;
