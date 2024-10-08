import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {

const { data, loading } = useFetch("/hotels?featured=true","","")
  return (
    <div className="fp">
      {loading ? ("Loading Please Wait...") : (<>
        {data.map((item =>
          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
            </div>}
          </div>
        ))}
      </>)}
    </div>
  );
};

export default FeaturedProperties;