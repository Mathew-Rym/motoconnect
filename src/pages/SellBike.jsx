// src/pages/SellBike.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SellBikeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  year: Yup.number().min(2000).max(new Date().getFullYear()).required('Required'),
  price: Yup.number().positive().required('Required'),
});

function SellBike() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submitting:', values);
    // Simulate POST request
    setTimeout(() => {
      alert('Bike submitted successfully!');
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-4">Sell a Bike</h2>

      <Formik
        initialValues={{ name: '', year: '', price: '' }}
        validationSchema={SellBikeSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 bg-white p-6 shadow rounded">
            <div>
              <label className="block mb-1">Bike Name</label>
              <Field name="name" className="w-full border p-2 rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Year</label>
              <Field name="year" type="number" className="w-full border p-2 rounded" />
              <ErrorMessage name="year" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Price ($)</label>
              <Field name="price" type="number" className="w-full border p-2 rounded" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'List Bike'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SellBike;
// This code defines a SellBike component that allows users to submit bike details for sale.
// It uses Formik for form handling and Yup for validation. The form includes fields for bike name, year, and price.
// Upon submission, it simulates a POST request and displays a success message.
// The form is styled with Tailwind CSS classes for a clean and responsive design.