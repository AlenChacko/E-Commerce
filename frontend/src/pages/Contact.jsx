import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p>Our Store</p>
          <p>
            Dummy building, Cherupuzha, <br /> 670511, Kannur, Kerala
          </p>
          <p>
            Phone: 7034226368 <br />
            Email: the.alenchacko@gmail.com
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
