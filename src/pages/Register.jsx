// src/pages/Register.jsx
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      login(data.user); // Automatically log in after register
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            {errors.general && <div className="text-red-500">{errors.general}</div>}

            <div>
              <label className="block mb-1">Username</label>
              <Field name="username" className="w-full border p-2 rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

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
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
// This code defines a Register component that allows users to create a new account.