import Feature from './Feature';

const TITLE_1 = "Discover";
const TITLE_1_description = "Explore new and unknown artists from around the world";
import discover_icon from '../asset/discover_icon.png';
const TITLE_2 = "Random Genre";
const TITLE_2_description = "Discover new genres and broaden your musical horizons with Discover Me'sic!";
import shuffle_icon from '../asset/shuffle_icon.png';
const TITLE_3 = "Community";
const TITLE_3_description = "Connect with other music lovers and discover new music together";
import community_icon from '../asset/community_icon.png';

const Experience: React.FC = () => {

    return (
        <div className="experience flex flex-col items-center justify-start px-[5rem] dark:bg-[#020917] h-[50rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
        {/* heading */}
        <div className="dark:text-white headline mt-3 flex flex-col items-center text-[2rem]">
            <span>Discover the Music Beyond Mainstream</span>
            <p className="text-[#707070] mt-4 text-[1.2rem]"> Discover Me'sic helps you escape the same old playlist by exploring unheard of artists and music </p>
        </div>
        {/* features  */}
        <div className="feature text-white flex items-center justify-around mt-[6rem] w-[100%]">
            <Feature icon={discover_icon.src} title={TITLE_1} description={TITLE_1_description} />
            <Feature icon={shuffle_icon.src} title={TITLE_2} description={TITLE_2_description} />
            <Feature icon={community_icon.src} title={TITLE_3} description={TITLE_3_description} />
        </div>
      </div>
    );
  };
  export default Experience;