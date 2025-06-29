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
        <Form className="mb-4">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <Field
              name="title"
              className="form-control"
              placeholder="e.g. Oil Change"
            />
            <ErrorMessage name="title" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <Field
              name="date"
              type="date"
              className="form-control"
            />
            <ErrorMessage name="date" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label className="form-label">Cost (Ksh)</label>
            <Field
              name="cost"
              type="number"
              className="form-control"
              placeholder="e.g. 1500"
            />
            <ErrorMessage name="cost" component="div" className="text-danger small" />
          </div>

          <div className="mb-3">
            <label className="form-label">Notes</label>
            <Field
              name="notes"
              as="textarea"
              rows="3"
              className="form-control"
              placeholder="What was done?"
            />
            <ErrorMessage name="notes" component="div" className="text-danger small" />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Record
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default MaintenanceForm;
