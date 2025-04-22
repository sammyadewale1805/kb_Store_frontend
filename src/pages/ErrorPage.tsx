import styles from '../styles/Auth.module.css';

interface ErrorProps {
  message?: string;
  onClose?: () => void;
}

export default function ErrorPage({ message = 'Something went wrong.', onClose }: ErrorProps) {
  return (
    <div className={styles.errorCard}>
      <h2>Error</h2>
      <p>{message}</p>
      {onClose && <button onClick={onClose}>Close</button>}
    </div>
  );
}
