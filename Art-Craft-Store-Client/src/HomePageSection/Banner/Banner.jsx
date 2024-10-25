import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import moment from 'moment';

const Banner = () => {

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024, // for medium and large devices
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600, // for tablets and small devices
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480, // for small mobile devices
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

      const slides = [
        {
          category: "Landscape Painting",
          subcategories: ["Mountain View Canvas", "Forest-based Landscape"],
          image: "https://images.pexels.com/photos/28858270/pexels-photo-28858270/free-photo-of-scenic-sunset-over-lush-green-valley.png?auto=compress&cs=tinysrgb&w=600",
        },
        {
          category: "Portrait Drawing",
          subcategories: ["Pencil Sketch Portrait", "Ink Outline Portrait"],
          image: "https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          category: "Watercolour Painting",
          subcategories: ["Floral Watercolor Art", "Animal Watercolor Portrait"],
          image: "https://images.pexels.com/photos/4708734/pexels-photo-4708734.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          category: "Oil Painting",
          subcategories: ["Realistic Oil Portrait", "Abstract Oil Painting"],
          image: "https://images.pexels.com/photos/1045299/pexels-photo-1045299.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          category: "Charcoal Sketching",
          subcategories: ["Figure Charcoal Sketch", "Architectural Charcoal Drawing"],
          image: "https://images.pexels.com/photos/1148633/pexels-photo-1148633.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          category: "Cartoon Drawing",
          subcategories: ["Comic Strip Drawing", "Superhero Cartoon Design"],
          image: "https://images.pexels.com/photos/1766231/pexels-photo-1766231.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ];
    
    return (
    
    <div className="w-full max-w-7xl mx-auto py-8 px-4 overflow-hidden">
          <p className="text-center mb-3 text-xs sm:text-sm md:text-base lg:text-lg">{moment().format('h:mm a, dddd, MMM D, YYYY')}</p>
          
          
          <Marquee speed={150} pauseOnHover={true} className="text-center text-xs sm:text-sm md:text-base lg:text-lg mb-4">
              <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                    <span className="text-rose-600 font-medium">Explore the World of Art:</span> Masterpieces in Every Style
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                    <span className="text-fuchsia-700 font-medium">The Art of Expression:</span> Painting, Drawing & More
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg mr-8">
                    <span className="text-pink-900 font-medium">Timeless Art Forms:</span> From Watercolor to Cartoon
                  </p>
              </div>
          </Marquee>

       
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="relative h-60 sm:h-70 md:h-80 lg:h-[22rem] xl:h-[24rem] mx-auto">
                <img
                  src={slide.image}
                  alt={slide.category}
                  className="w-full h-full object-cover object-center rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 w-full rounded-b-lg text-center">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">{slide.category}</h3>
                  <p className="text-xs sm:text-sm md:text-base">{slide.subcategories.join(", ")}</p>
                </div>
              </div>
            ))}
          </Slider>
      </div>

    

  );
    
};

export default Banner;