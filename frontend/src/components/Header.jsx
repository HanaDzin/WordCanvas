import { assets, sampleImgs } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-blue-100">
        <p>The most modern text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </div>
      <h1 className="text-4xl max-w-[450px] sm:text-7xl sm:max-w-[650px] mx-auto text-center mt-10">
        Turn <span className="text-blue-600">thoughts</span> into{" "}
        <span className="text-blue-500">images</span>, in seconds.
      </h1>
      <p className="text-center max-w-2xl mx-auto mt-5">
        Unleash your creativity using AI. Turn your imagination into visual art
        in seconds - type out your thoughts and watch the magic happen.
      </p>
      <button className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-110 transition-all duration-300">
        Generate Images{" "}
        <img src={assets.star_group} alt="group of stars" className="h-7" />
      </button>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:flex lg:flex-wrap justify-center mt-16 gap-8 px-4">
        {sampleImgs.map((item, index) => (
          <img
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer w-full md:w-auto lg:w-28"
            src={item}
            key={index}
          />
        ))}
      </div>
      <p className="m-2 text-neutral-600">Images generated by WordCanvas</p>
    </div>
  );
};

export default Header;