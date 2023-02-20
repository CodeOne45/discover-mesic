
import {useState } from "react";
import CardLanding from "./cardTracks/CardLanding";
import MusicPlayer from "./music/MusicPlayer";
import VisibilitySensor from "react-visibility-sensor";

const Details: React.FC = () => {

    const [elementIsVisible, setElementIsVisible] = useState(false);
    const bg = {
      true: {
        left: "-44rem",
      },
      false: {
        left: "-50rem",
      },
    };
    const redimg = {
      true: {
        left: "18rem",
      },
      false: {
        left: "16rem",
      },
    };
    const musicimg = {
      true: {
        left: "2rem",
      },
      false: {
        left: "6rem",
      },
    };
    return (
      <div className="search relative mt-[-3] h-[70rem] px-[8rem] dark:bg-[#081730] pt-[10rem] pb-[10rem] mt-[-15rem] z-[1] flex items-center justify-between rounded-b-[5rem]">
        {/* left side */}
        <div className="left flex-1 mt-60">
          <CardLanding />
        </div>
        {/* right side */}
        <div className="right mt-5 flex items-start flex-col justify-start flex-1 h-[100%] pt-[9rem]">  
          {/* paragraph */}
          <div className="detail flex flex-col mt-5 text-4xl">
            <h1>
              <b>Swipe Your Way to Musical Discovery</b>
            </h1>
            <p className="text-base mt-3">Swipe Right for Your New Favorite Song!</p>
            <span className="text-sm mt-3 text-[#4D586A]">
            Discover Me'sic lets you explore new and exciting music in a fun and interactive way. 
            Swipe left or right on the cards to listen to new songs and discover unknown artists. 
            Create your own personalized playlist by swiping right on your favorite songs. Who knows what musical treasures you might find? Start swiping now!
            </span>
          </div>
          {/* Music Player */}
          {/* Search */}
          <h1 className="pt-4">
            <b>Uncover Hidden Gems with Your YouTube URL!</b>
          </h1>
          <span className="text-sm mt-3 text-[#4D586A]">
            At Discover Me'sic, we believe in the power of discovering new and upcoming talent. 
            With our unique feature, you can add any song by simply sharing a YouTube URL, 
            and we'll add it to our library! We focus on promoting music with less than <b>50k views</b>.
            Share your favorite undiscovered songs with us today!
          </span>
          <div className="pt-4 addbar flex justify-start w-[80%]">
            <input
              type="text"
              placeholder="Enter the song name or URL"
              className="flex-[19] outline-none bg-[#020917] rounded-xl p-3 h-[3rem]"
            />
            {/* SearchIcon */}
            <div className="addIcon w-[35%] flex  items-center rounded-xl ml-4 bg-gradient-to-bl from-[#F3071D] to-[#E600FF] p-4 h-[2.5rem]">
              <p className="text-white">Make it shine</p>
            </div>
          </div>

          <VisibilitySensor
            onChange={(isVisible) => setElementIsVisible(isVisible)}
          >
            <MusicPlayer />
          </VisibilitySensor>
        </div>
      </div>
    );
  };
  export default Details;