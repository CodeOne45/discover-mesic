import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../styles/header-component.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");

  const router = useRouter();

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

  return (
    <header className={styles.header}>
      <div className={styles.logo_wrapper}>
        <Link href={"/"}>
          <a className={classNames("font-nunito", styles.logo)}>
            Discover Mesic
          </a>
        </Link>
      </div>
      <form className={styles.search_form} onSubmit={submitSearchHandler}>
        <div className={styles.text_box}>
          <input
            type="text"
            placeholder="music"
            className={classNames(styles.text, "font-nanum")}
            value={keyword}
            onChange={changeKeywordHandler}
          />
          <button className={styles.button}>
            <i className={classNames("fas fa-search", styles.icon)} />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
