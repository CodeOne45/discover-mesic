import React from "react";
import "../styles/sidebar.module.css";
import Link from "next/link";


import {
  faHome,
  faSearch,
  faBroadcastTower,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="container">
      <section className="sidebar-topics">
        <Link href={"/"}>
          <a className="item">Home</a>
        </Link>  
      </section>

      {/* Footer on mobile 
      <section className="sidebar-mobile">
        <Link
     href="/" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faHome} />
          <span>Home</span>
        </Link>

        <Link
     href="/discover" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faSearch} />
          <span>Discover</span>
        </Link>

        <Link
    
          exact
          to="/favorites"
          className="item"
          activeClassName="active"
        >
          <FontAwesomeIcon className="icon" icon={faHeart} />
          <span>Favorites</span>
        </Link>

        <Link
            href="/radio" className="item" activeClassName="active">
          <FontAwesomeIcon className="icon" icon={faBroadcastTower} />
          <span>Radio</span>
        </Link>
      </section>
      */}
    </div>
  );
};

export default Sidebar;