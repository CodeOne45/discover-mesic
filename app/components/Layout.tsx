import React from 'react';
import Header from "./Header";
import styles from '../styles/layout-component.module.css';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
            {
            }
        </>
    );
};

export default Layout;
