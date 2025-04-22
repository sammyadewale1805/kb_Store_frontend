import { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import FormHeader from './FormHeader';
import FormFields from './FormFields';
import SubmitButton from './SubmitButton';
import MessageCard from './MessageCard';
import { authenticate } from '../../services/AuthService';

export default function AuthForm({ type }: { type: 'signIn' | 'signUp' }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authenticate(type, formData);
      setMessage({ type: 'success', text: data.message || 'Success!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className={styles.formContainer}>
      <FormHeader type={type} />
      <form onSubmit={handleSubmit}>
        <FormFields type={type} formData={formData} onChange={handleChange} />
        {message.text && <MessageCard type={message.type as any} text={message.text} />}
        <SubmitButton type={type} />
      </form>
      <p className={styles.linkText}>
        {type === 'signIn' ? `Don’t have an account? ` : `Already have an account? `}
        <a className={styles.link} href={type === 'signIn' ? '/signup' : '/signin'}>
          {type === 'signIn' ? 'Sign up for free' : 'Log in'}
        </a>
      </p>
    </div>
  );
}
