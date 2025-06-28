// src/components/MaintenanceForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MaintenanceSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  date: Yup.date().required('Date is required'),
  cost: Yup.number().typeError('Must be a number').required('Cost is required'),
  notes: Yup.string().min(10, 'Notes should be at least 10 characters'),
});

function MaintenanceForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ title: '', date: '', cost: '', notes: '' }}
      validationSchema={MaintenanceSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <Field
              name="title"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Oil Change"
            />
            <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <Field
              name="date"
              type="date"
              className="w-full border px-3 py-2 rounded"
            />
            <ErrorMessage name="date" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Cost (Ksh)</label>
            <Field
              name="cost"
              type="number"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 1500"
            />
            <ErrorMessage name="cost" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Notes</label>
            <Field
              name="notes"
              as="textarea"
              rows="3"
              className="w-full border px-3 py-2 rounded"
              placeholder="What was done?"
            />
            <ErrorMessage name="notes" component="div" className="text-red-600 text-sm" />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Record
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default MaintenanceForm;
