import { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import { authenticate } from '../../services/AuthService';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SuccessCard } from './SucessCard';
import { ErrorCard } from './ErrorCard';

export default function AuthForm({ type }: { type: 'signIn' | 'signUp' }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = await authenticate(type, formData);
      setMessage({ type: 'success', text: data.message || 'Success!' });
      // Reset form data on success if sign-up
      if (type === 'signUp') {
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage({ type: '', text: '' });
  };

  return (
    <motion.div 
      className={styles.formContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.heading}>
        {type === 'signIn' ? 'Welcome back' : 'Create account'}
      </h2>
      <p className={styles.subheading}>
        {type === 'signIn'
          ? 'Enter your details to access your account'
          : 'Join us and start your journey today'}
      </p>

      <AnimatePresence>
        {message.type === 'success' && (
          <SuccessCard 
            message={message.text} 
            onClose={clearMessage}
          />
        )}
        
        {message.type === 'error' && (
          <ErrorCard 
            message={message.text} 
            onClose={clearMessage}
          />
        )}
      </AnimatePresence>

      <button className={styles.googleBtn}>
        <FcGoogle className={styles.btnIcon} />
        <span>Continue with Google</span>
      </button>
      
      <div className={styles.divider}>
        <span>or continue with email</span>
      </div>

      <form onSubmit={handleSubmit}>
        {type === 'signUp' && (
          <div className={styles.inputGroup}>
            <FiUser className={styles.inputIcon} />
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <HiOutlineMail className={styles.inputIcon} />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <RiLockPasswordLine className={styles.inputIcon} />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        {type === 'signIn' && (
          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
        )}

        <button 
          className={styles.submitButton} 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loader}></span>
          ) : (
            type === 'signIn' ? 'Sign in' : 'Create account'
          )}
        </button>
      </form>

      <p className={styles.switchMode}>
        {type === 'signIn' ? "Don't have an account? " : "Already have an account? "}
        <a href={type === 'signIn' ? '/signup' : '/signin'} className={styles.switchLink}>
          {type === 'signIn' ? 'Sign up' : 'Sign in'}
        </a>
      </p>
    </motion.div>
  );
}