import React from 'react';
import Header from "./Header";
import styles from '../styles/layout-component.module.css';
import SideBar from "../components/Sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
            {
            /*
            <SideBar />
            */
            }
        </>
    );
};

export default Layout;
