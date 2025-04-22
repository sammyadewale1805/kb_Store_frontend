import AuthLayout from '../components/AuthForm/AuthLayout';
import AuthForm from '../components/AuthForm/AuthForms';

export default function SignIn() {
  return (
    <AuthLayout>
      <AuthForm type="signIn" />
    </AuthLayout>
  );
}
