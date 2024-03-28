
import seperator from '../../asset/seperator.png';
import DownloadAds from './DownloadAds';

const Download: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start px-[5rem] dark:bg-[#020917] h-[48rem] pt-[18rem] mt-[-12rem] relative z-[0] ">
          {/* tild icon or path icon */}
          <img src={seperator.src} alt="" className="w-[5rem]" />
          {/* heading */}
          <div className="headline mt-10 flex flex-col items-center text-[2rem]">
            <span className="text-base pt-3">Get Ready for the Ultimate Music Discovery Experience!</span>
            <span>
              <b>Discover Me'sic is Coming Soon to a Phone Near You!</b>
            </span>
            <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[1rem]">
            Discover Me'sic is coming soon to the app store near you! 
            Get ready to explore a whole new world of undiscovered music and create your own 
            personalized playlists. Swipe, discover, and share your favorite tracks with friends. 
            Stay tuned for the launch and get ready to unlock the musical treasure trove!
            </span>
          </div>
          {/* dowload ads */}
          <div className="mt-14">
            <DownloadAds />
          </div>
        </div>
      );
  };
  export default Download;