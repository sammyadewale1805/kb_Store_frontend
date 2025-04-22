import styles from '../../styles/Form.module.css';

export default function SubmitButton({ type }: { type: 'signIn' | 'signUp' }) {
  return (
    <button className={styles.button} type="submit">
      {type === 'signIn' ? 'Log in' : 'Sign up'}
    </button>
  );
}
