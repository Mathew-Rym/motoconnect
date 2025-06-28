// src/pages/SellPart.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SellPartSchema = Yup.object().shape({
  name: Yup.string().required('Part name is required'),
  condition: Yup.string().oneOf(['New', 'Used']).required('Condition is required'),
  price: Yup.number().min(100, 'Too cheap').required('Price is required'),
  description: Yup.string().min(10, 'Description too short').required('Description is required'),
});

function SellPart() {
  const handleSubmit = (values, { resetForm }) => {
    console.log('Submitted part:', values);
    alert('Part listed successfully (mock)');
    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Sell a Bike Part</h2>
      <Formik
        initialValues={{ name: '', condition: '', price: '', description: '' }}
        validationSchema={SellPartSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block font-semibold">Part Name</label>
            <Field name="name" className="input" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold">Condition</label>
            <Field as="select" name="condition" className="input">
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Field>
            <ErrorMessage name="condition" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold">Price (Ksh)</label>
            <Field type="number" name="price" className="input" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <Field as="textarea" name="description" className="input" rows={4} />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            List Part
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SellPart;
