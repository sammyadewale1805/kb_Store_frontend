import AuthLayout from '../components/AuthForm/AuthLayout';
import AuthForm from '../components/AuthForm/FormFields';

export default function SignUp() {
  return (
    <AuthLayout>
      <AuthForm type="signUp" />
    </AuthLayout>
  );
}
