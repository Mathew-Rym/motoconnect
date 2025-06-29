import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios'; // ✅ Axios instance

const SellBikeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  year: Yup.number()
    .min(2000, 'Minimum year is 2000')
    .max(new Date().getFullYear(), `Max year is ${new Date().getFullYear()}`)
    .required('Required'),
  price: Yup.number().positive('Must be a positive number').required('Required'),
});

function SellBike() {
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      await api.post('/bikes', values); // 🔁 Replace `/bikes` with your backend endpoint
      setStatus({ success: 'Bike listed successfully!' });
      resetForm();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to list bike';
      setStatus({ error: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sell a Bike</h2>

          <Formik
            initialValues={{ name: '', year: '', price: '' }}
            validationSchema={SellBikeSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                {/* Feedback messages */}
                {status?.error && (
                  <div className="alert alert-danger text-center">{status.error}</div>
                )}
                {status?.success && (
                  <div className="alert alert-success text-center">{status.success}</div>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Bike Name</label>
                  <Field name="name" className="form-control" id="name" />
                  <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <Field name="year" type="number" className="form-control" id="year" />
                  <ErrorMessage name="year" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="form-label">Price (Ksh)</label>
                  <Field name="price" type="number" className="form-control" id="price" />
                  <ErrorMessage name="price" component="div" className="text-danger small mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-success w-100"
                >
                  {isSubmitting ? 'Submitting...' : 'List Bike'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SellBike;
