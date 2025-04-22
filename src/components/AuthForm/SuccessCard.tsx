import { CheckCircle } from 'lucide-react';
import styles from '../../styles/Alert.module.css';

export default function SuccessCard({ message }: { message: string }) {
  return (
    <div className={styles.messageCard + ' ' + styles.successCard}>
      <CheckCircle size={20} />
      <span>{message}</span>
    </div>
  );
}
