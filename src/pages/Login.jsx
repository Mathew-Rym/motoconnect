import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Simulate API call - replace with your actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data - replace with actual user data from your API
      const mockUser = {
        email: values.email,
        name: 'Demo User',
        // Add other user properties as needed
      };
      
      login(mockUser);
      navigate('/dashboard');
    } catch (err) {
      setFieldError('password', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Please enter your credentials</p>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="form-text text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="form-text text-danger" />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <div className="text-end mt-2">
                <Link to="/reset-password" className="text-decoration-none">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center mt-4">
                <small>
                  Don't have an account?{' '}
                  <Link to="/register" className="fw-bold text-decoration-none">
                    Register here
                  </Link>
                </small>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;