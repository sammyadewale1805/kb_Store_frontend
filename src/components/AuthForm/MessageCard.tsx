import styles from '../../styles/Form.module.css';

interface MessageCardProps {
  type: 'success' | 'error';
  text: string;
}

export default function MessageCard({ type, text }: MessageCardProps) {
  const cardClass = type === 'success' ? styles.successCard : styles.errorCard;
  return (
    <div className={cardClass}>
      <p>{text}</p>
    </div>
  );
}
