import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, fetchBanner } from "../redux/informationSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { services, banners, loading, error } = useSelector(
    (state) => state.information
  );

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);

  const carouselSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
 
  };

  return (
    <Layout summary={true} header={true}>
      <div className="mt-12 w-full">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center w-full space-x-6">
          {services.map((item, index) => (
            <Link to={`/payments`}
              key={index}
              state={{
                service_name: item.service_name,
                service_icon: item.service_icon,
                service_code: item.service_code
              }}
              className="flex flex-col space-y-2 text-center items-center"
            >
              <img
                src={item.service_icon}
                alt={item.service_name}
                className="w-18 h-18 object-cover"
              />
              <span className="text-xs w-[80%]">{item.service_name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <p className="font-bold mb-6">Temukan promo menarik</p>
          <Slider {...carouselSettings}>
            {banners.map((item, index) => (
              <div key={index} className="pr-6">
                <img src={item.banner_image} className="w-full" alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;