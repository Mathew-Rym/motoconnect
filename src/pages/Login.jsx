import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'; // ✅ Axios import

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;
    try {
      const res = await api.post('/login', { email, password }); // ✅ Axios POST

      // Assuming your backend returns { user: {...}, token: "..." }
      login(res.data.user); // Set user in context
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <div className="alert alert-danger text-center py-2">
                  {errors.general}
                </div>
              )}

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
