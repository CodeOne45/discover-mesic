
import seperator from '../../asset/seperator.png';
import DownloadAds from './DownloadAds';

const NotAvalable: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start px-[5rem] dark:bg-[#020917] h-[48rem] pt-[18rem] mt-[-12rem] relative z-[0] ">
          {/* tild icon or path icon */}
          <img src={seperator.src} alt="" className="w-[5rem]" />
          {/* heading */}
          <p className="headline pt-5 flex flex-col items-center text-6xl" >Oops!</p>

          <div className="headline mt-10 flex flex-col items-center text-md">
            <span className="text-sm pt-3">For the Best Music Discovery Experience, Hop on Over to Your Desktop!</span>
            <span className="text-md pt-2">
              <b>Bigger is Better for Music Discovery!</b>
            </span>
            <span className="text-sm text-gray-400 px-[5rem] text-center mt-[1rem]">
              Oops! Looks like Discover Me'sic is currently only available as a web app on desktop. 
              But don't worry, we promise it's worth the extra click!
              Unleash your inner music explorer on your desktop to discover new and unknown artists, 
              create personalized playlists, and share your new musical finds with friends. 
              So why wait? Head to your desktop now and start digging for musical gems!
            </span>
          </div>
        </div>
      );
  };
  export default NotAvalable;