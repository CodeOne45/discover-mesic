import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import {userService} from '../services/user.service';

import { useTranslation } from 'next-export-i18n';

import Link from "next/link";
import styles from "../styles/header-component.module.css";

import logo from '../asset/logo_large.png';

import { Nav, Navbar } from "react-bootstrap"
import NavDropdown from 'react-bootstrap/NavDropdown';

import AvatarLayout from "./account/AvatarLayout"

const Header: React.FC = () => {
  const router = useRouter();
  
  const { t } = useTranslation();
  const accessPaths = ['/discover'];

  const [keyword, setKeyword] = useState<string>("");
  const path = router.asPath.split('?')[0];

  const [user, setUser] = useState(null);

  useEffect(() => {
      const subscription = userService.user.subscribe(x => setUser(x));
      return () => subscription.unsubscribe();
  }, []);

  function logout() {
      userService.logout();
  }

  const submitSearchHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setKeyword(keyword.trim());
      if (keyword.indexOf("/") === -1) {
        router?.push(`/search/${keyword}`);
      }
    },
    [keyword]
  );

  const changeKeywordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (router?.pathname === "/search/[keyword]") {
      const keyword = router?.query?.keyword as string;
      setKeyword(keyword ?? "");
    }
  }, []);


  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "header-component_topnav__JpB0H") {
      x.className += " header-component_responsive__ZOS4I";
    } else {
      x.className = "header-component_topnav__JpB0H";
    }
  }

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      className="px-4 py-8"
      fixed="top"
      className={styles.topnav}
    >
      <Navbar.Brand>
        <Link href={"/"}>
          <img className={styles.image_container_logo} src={logo.src} alt="Logo Discover Me-sic"/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-na" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto align-items-end px-3">
          <Nav.Link href="/discover">Top 10</Nav.Link>
          <Nav.Link href="#">{t('header.About_us')}</Nav.Link>
        </Nav>
        <Nav className="ml-auto align-items-end px-3">
            { accessPaths.includes(path) ? (<form className={styles.search_form} onSubmit={submitSearchHandler}>
            <div className={styles.text_box}>
              <input
                type="text"
                placeholder={t('header.Search_for_a_song')}
                className={classNames(styles.text, "font-nanum")}
                value={keyword}
                onChange={changeKeywordHandler}
              />
              <button className={styles.button}>
                <i className={classNames("fas fa-search", styles.icon)} />
              </button>
            </div>
          </form>) : "" }
          <div className={styles.auth_btn}>
            {user?
              <a className={styles.none_btn}></a> : <a className={styles.register_btn} href="/account/register"> {t('header.Register')}</a>
            }
            {user?         
              <NavDropdown title={<AvatarLayout user={user} />} id="basic-nav-dropdown" className={styles.dropdown}> 
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={logout}>
                  {t('header.Logout')}
                </NavDropdown.Item>
              </NavDropdown> : <a className={styles.log_btn} href="/account/login">{t('header.Login')}</a>
            }
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  )
};

export default Header;


/**
 * 
 * <nav className={styles.topnav} id="myTopnav">
      <div className={styles.logo_wrapper}>
        
      </div>

      <a href="/discover">Top 10</a>
      <a href="#">{t('header.About_us')}</a>

      
      { accessPaths.includes(path) ? (<form className={styles.search_form} onSubmit={submitSearchHandler}>
        <div className={styles.text_box}>
          <input
            type="text"
            placeholder={t('header.Search_for_a_song')}
            className={classNames(styles.text, "font-nanum")}
            value={keyword}
            onChange={changeKeywordHandler}
          />
          <button className={styles.button}>
            <i className={classNames("fas fa-search", styles.icon)} />
          </button>
        </div>
      </form>) : "" }
      <div className={styles.auth_btn}>
        {user?
          <a className={styles.none_btn}></a> : <a className={styles.register_btn} href="/account/register"> {t('header.Register')}</a>
        }
        {user?         
          <button className={styles.log_btn} onClick={logout}>{t('header.Logout')}</button> : <a className={styles.log_btn} href="/account/login">{t('header.Login')}</a>
        }
      </div>
      <div className={styles.humburger_icon}>
        <Hamburger onToggle={toggled => {
          myFunction();
        }}
        size={20} />  
      </div>
      

    </nav>
 */