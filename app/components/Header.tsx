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

import { useTranslation, LanguageSwitcher } from 'next-export-i18n';

import Link from "next/link";
import styles from "../styles/header-component.module.css";

import logo from '../asset/logo_large.png';

import Hamburger from 'hamburger-react'

const Header: React.FC = () => {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string>("");

  const router = useRouter();
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
    <nav className={styles.topnav} id="myTopnav">
      <div className={styles.logo_wrapper}>
        <Link href={"/"}>
          <img className={styles.image_container_logo} src={logo.src} alt="Logo Discover Me-sic"/>
        </Link>
      </div>

      <a href="/discover">Top 10</a>
      <a href="#">{t('header.About_us')}</a>

      
      <form className={styles.search_form} onSubmit={submitSearchHandler}>
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
      </form>
      <div className="d-flex justify-content-end align-items-center language-select-root">
        <LanguageSwitcher lang="fr">FR</LanguageSwitcher> |{' '}
				<LanguageSwitcher lang="en">EN</LanguageSwitcher>
      </div>
      <div className={styles.auth_btn}>
        {user?
          <a style={"display: none"}></a> : <a className={styles.register_btn} href="/account/register"> {t('header.Register')}</a>
        }
        {user?         
          <a className={styles.log_btn} onClick={logout}>Logout</a> : <a className={styles.log_btn} href="/account/login">{t('header.Login')}</a>
        }
      </div>

      <Hamburger onToggle={toggled => {
          myFunction();
        }}
        size={20} />

    </nav>
  )
};

export default Header;
