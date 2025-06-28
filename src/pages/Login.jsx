// src/pages/Login.jsx
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data.user); // Store user in context
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            {errors.general && <div className="text-red-500">{errors.general}</div>}

            <div>
              <label className="block mb-1">Email</label>
              <Field name="email" type="email" className="w-full border p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <Field name="password" type="password" className="w-full border p-2 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-sm text-right">
  <Link to="/reset-password" className="text-indigo-600 hover:underline">
    Forgot your password?
  </Link>
</div>
            <div className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register here
              </Link>
            </div>
          </Form>

        )}
      </Formik>
    </div>
  );
}

export default Login;
// This code defines a Login component that uses Formik for form handling and Yup for validation.