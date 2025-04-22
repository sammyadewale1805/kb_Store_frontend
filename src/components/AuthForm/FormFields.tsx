import styles from '../../styles/Form.module.css';

interface Props {
  type: 'signIn' | 'signUp';
  formData: { name: string; email: string; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFields({ type, formData, onChange }: Props) {
  return (
    <>
      {type === 'signUp' && (
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onChange}
        />
      )}
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onChange}
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />
      <div className={styles.row}>
        <label>
          <input type="checkbox" />
          Remember for 30 days
        </label>
        <a href="#" className={styles.forgot}>Forgot password</a>
      </div>
    </>
  );
}
