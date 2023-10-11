import React from "react"; //6.9k (gzipped: 2.7k)
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap"; // 124.3k (gzipped: 33.1k)
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";
const FeaturedTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);
  console.log(featuredTours)

  return (
    <React.Fragment>
      {loading && <h4>Loading.......</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour}></TourCard>
          </Col>
        ))}
    </React.Fragment>
  );
};
export default FeaturedTourList;
