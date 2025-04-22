import styles from '../styles/Alert.module.css';

interface SuccessProps {
  type: 'success';
  message: string;
  onClose: () => void;
}

export default function Success({ message, onClose }: SuccessProps) {
  return (
    <div className={styles.successCard}>
      <h2>Success!</h2>
      <p>{message || 'Operation completed successfully.'}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
