import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'; // 🔥 Axios instance

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Required'),
});

function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await api.post('/register', values); // 👈 Axios POST
      login(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed';
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow w-100" style={{ maxWidth: '450px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create Account</h2>

          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                {errors.general && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errors.general}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    name="username"
                    id="username"
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-success w-100 ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>

                <p className="text-center mt-3 small">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none text-success fw-semibold">
                    Log in
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
