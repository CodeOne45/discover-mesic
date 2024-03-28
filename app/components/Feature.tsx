
import React, {
    useState,
  } from "react";

import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";
interface Props {
    readonly icon: string;
    readonly title: string;
    readonly description: string;
}

import discover_icon from '../asset/discover_icon.png';


const Feature = ({ icon, title, description }: Props) => {

    const variant = {
        true: {
          transform: "scale(1)",
        },
        false: {
          transform: "scale(0.5)",
        },
      };
      const [elementIsVisible, setElementIsVisible] = useState(false);
    
      return (
        <VisibilitySensor
          onChange={(isVisible) => setElementIsVisible(isVisible)}
          // minTopValue={100}
        >
          <div className="feature flex items-center justify-center flex-col relative text-center mx-12">
            {/* icon */}
            <motion.div
              variants={variant}
              transition={{
                duration: 1,
                type: "ease-out",
              }}
              animate={`${elementIsVisible}`}
              className="icon bg-[#081730] rounded-2xl p-4"
            >
              <img
                src={icon}
                alt=""
                className="w-[3rem]"
              />
            </motion.div>
    
            <span className="dark:text-white text-black mt-5">{title}</span>
    
            <span className="text-[#707070] mt-4">
                {description}
            </span>
          </div>
        </VisibilitySensor>
      );
  };
  export default Feature;