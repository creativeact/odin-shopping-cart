import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.layoutContainer}>
      <NavBar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}