import { GitHub } from "@material-ui/icons";
import Link
 from "next/link";
const Footer: React.FC = () => {
  return (
    <div className=" footer flex flex-col items-center justify-start px-[15rem] dark:bg-[#081730] h-[20rem] pt-[18rem] mt-[-20rem] relative z-[-1]">  
      {/* detail */}
      
      <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[5rem] ">
        Discover Me'sic - Unleash Your Inner Music Explorer
      </span>
      <div className="text-center text-sm text-gray-500 pt-[1rem] pb-[2rem]">
        <span className="dark:text-gray-100 text-gray-900 font-bold text-lg mr-2">CodeOne45-Team <GitHub/> <Link href="https://github.com/CodeOne45/discover-mesic">github</Link></span>    | &copy; {new Date().getFullYear()}   All Rights Reserved
      </div>
    </div>
  );
  };
  export default Footer;