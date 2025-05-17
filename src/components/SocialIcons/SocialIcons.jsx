import styles from './SocialIcons.module.css';

function SocialIcons() {
    return(
        <div className={styles.container}>
            <i className="devicon-twitter-plain"></i>
            <i className="devicon-facebook-plain"></i>
            <i className="devicon-linkedin-plain"></i>
        </div>
    )
}

export { SocialIcons }