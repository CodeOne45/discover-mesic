import React from 'react';
import styles from '../styles/footer-component.module.css';
import classNames from 'classnames';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <h3 className={classNames('font-nunito', styles.title)}>Aman</h3>
      </div>
    </footer>
  );
};

export default Footer;
