import { AlertTriangle } from 'lucide-react';
import styles from '../../styles/Alert.module.css';

export default function ErrorCard({ message }: { message: string }) {
  return (
    <div className={styles.messageCard + ' ' + styles.errorCard}>
      <AlertTriangle size={20} />
      <span>{message}</span>
    </div>
  );
}
