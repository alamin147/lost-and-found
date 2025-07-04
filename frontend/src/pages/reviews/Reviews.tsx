"use client";
import "./review.css";
import { FaUser } from "react-icons/fa";
import StarRatings from "react-star-ratings";
const testimonials = [
  {
    rating: 5,
    feedback:
      "The Lost and Found system has streamlined our process of returning lost items to their owners. It's incredibly user-friendly and efficient.",
    name: "Michael T.",
    position: "Operations Manager",
  },
  {
    rating: 4,
    feedback:
      "I was able to quickly report my lost item, and the system helped me track its status until it was returned. Excellent service!",
    name: "Sarah L.",
    position: "Frequent Traveler",
  },
  {
    rating: 3,
    feedback:
      "This system has drastically reduced the time and effort needed to manage lost items. It's a game-changer for our department.",
    name: "David R.",
    position: "Customer Service Lead",
  },
];

const Reviews = () => {
  return (
    <section className="w-full pt-12 md:pt-20 lg:pt-24 bg-gray-900 text-white ">
      <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className=" text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white ">
            What Our Customers Say
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Hear from the people
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-gray-00">
          {testimonials?.map((e, i) => {
            return (
              <div
                key={`${e.name + i}`}
                className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray p-6 shadow-sm"
              >
                <div className="grid gap-1 text-center">
                  <div className="text-center mx-auto rounded-full border p-3">
                    <FaUser size="40" />
                  </div>
                  <h3 className="text-lg font-semibold">{e.name}</h3>
                  <p className="text-sm text-muted-foreground">{e.position}</p>
                </div>
                <div className="text-blue-600 flex justify-center gap-0.5">
                  {/* <FaStar className="w-5 h-5 fill-primary" />
            <FaStar className="w-5 h-5 fill-primary" />
            <FaStar className="w-5 h-5 fill-primary" />
            <FaStar className="w-5 h-5 fill-primary" />
            <FaStar className="w-5 h-5 fill-primary" /> */}

                  <StarRatings
                    rating={e.rating}
                    starDimension="25px"
                    starSpacing="3px"
                    starRatedColor="rgb(8 145 178)"
                  />
                </div>

                <blockquote className="text-center text-lg leading-relaxed">
                  {e.feedback}
                </blockquote>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Reviews;
