import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // ✅ Axios instance

const ResetPassword = () => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      await api.post('/reset-password', { email: values.email });

      setStatus({ success: 'A reset link has been sent to your email.' });
      resetForm();
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Failed to send reset email. Try again.';
      setStatus({ error: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Reset Password</h2>
          <p className="text-center text-muted mb-4">
            Enter your email to receive a password reset link
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                {status?.error && (
                  <div className="alert alert-danger text-center py-2">{status.error}</div>
                )}
                {status?.success && (
                  <div className="alert alert-success text-center py-2">{status.success}</div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none text-primary fw-semibold">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
