
import styles from '../Discussion.module.scss';

export default function ScrollToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <section
            className={`${styles.chevron}`}>
            <i className={`fa-solid fa-circle-chevron-up`} onClick={scrollToTop}></i>
        </section>
    );
}
