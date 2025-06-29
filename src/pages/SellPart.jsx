import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios'; // ✅ Axios instance

const SellPartSchema = Yup.object().shape({
  name: Yup.string().required('Part name is required'),
  condition: Yup.string().oneOf(['New', 'Used']).required('Condition is required'),
  price: Yup.number().min(100, 'Too cheap').required('Price is required'),
  description: Yup.string().min(10, 'Description too short').required('Description is required'),
});

function SellPart() {
  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      await api.post('/parts', values); // Replace `/parts` with your actual backend endpoint
      setStatus({ success: 'Part listed successfully!' });
      resetForm();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to list part';
      setStatus({ error: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sell a Bike Part</h2>

          <Formik
            initialValues={{ name: '', condition: '', price: '', description: '' }}
            validationSchema={SellPartSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                {status?.error && (
                  <div className="alert alert-danger text-center">{status.error}</div>
                )}
                {status?.success && (
                  <div className="alert alert-success text-center">{status.success}</div>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Part Name</label>
                  <Field name="name" className="form-control" id="name" />
                  <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="condition" className="form-label">Condition</label>
                  <Field as="select" name="condition" className="form-select" id="condition">
                    <option value="">Select condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </Field>
                  <ErrorMessage name="condition" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price (Ksh)</label>
                  <Field name="price" type="number" className="form-control" id="price" />
                  <ErrorMessage name="price" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                    rows="4"
                    id="description"
                  />
                  <ErrorMessage name="description" component="div" className="text-danger small mt-1" />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'List Part'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SellPart;
