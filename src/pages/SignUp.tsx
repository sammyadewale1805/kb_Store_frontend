import AuthLayout from '../components/AuthForm/AuthLayout';
import AuthForm from '../components/AuthForm/AuthForms';

export default function SignUp() {
  return (
    <AuthLayout>
      <AuthForm type="signUp" />
    </AuthLayout>
  );
}
