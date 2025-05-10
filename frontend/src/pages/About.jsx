import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sed
            blanditiis doloremque quaerat neque rem eum dolorem id porro! Porro
            reiciendis commodi qui delectus quaerat excepturi molestias
            inventore iste quam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus unde temporibus, eos maiores molestiae architecto
            nesciunt beatae placeat officiis fugiat ipsum blanditiis
            exercitationem nemo praesentium sapiente, nisi quasi incidunt iusto?
          </p>
          <div className="text-gray-800">OUR MISSION</div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
            eveniet distinctio modi architecto perferendis. Eius est nostrum
            quae nobis in totam ipsam saepe, deserunt ut soluta accusamus. Esse,
            expedita aperiam.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            reiciendis facilis ex corrupti rem doloremque dolores hic dolore
            sapiente, consequatur labore suscipit necessitatibus a, tempora et
            repellat rerum eos aspernatur.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            reiciendis facilis ex corrupti rem doloremque dolores hic dolore
            sapiente, consequatur labore suscipit necessitatibus a, tempora et
            repellat rerum eos aspernatur.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            reiciendis facilis ex corrupti rem doloremque dolores hic dolore
            sapiente, consequatur labore suscipit necessitatibus a, tempora et
            repellat rerum eos aspernatur.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
