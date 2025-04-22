import styles from '../../styles/Form.module.css';

export default function FormHeader({ type }: { type: 'signIn' | 'signUp' }) {
  return (
    <>
      <h2 className={styles.heading}>
        {type === 'signIn' ? 'Welcome back, Olivia' : 'Join us today'}
      </h2>
      <p className={styles.subheading}>
        {type === 'signIn'
          ? 'Welcome back! Please enter your details.'
          : 'Create your account and start your journey.'}
      </p>
      <button className={styles.googleBtn}>Log in with Google</button>
      <div className={styles.divider}><span>or</span></div>
    </>
  );
}
