import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Send } from 'lucide-react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  company: Yup.string().required('Required'),
  employees: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
});

export default function EnterpriseContactForm() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Sales</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          company: '',
          employees: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: Implement form submission
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Field
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && touched.name && (
                <div className="mt-1 text-sm text-red-600">{errors.name}</div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && touched.email && (
                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <Field
                name="company"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.company && touched.company && (
                <div className="mt-1 text-sm text-red-600">{errors.company}</div>
              )}
            </div>

            <div>
              <label htmlFor="employees" className="block text-sm font-medium text-gray-700">
                Number of Employees
              </label>
              <Field
                as="select"
                name="employees"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select...</option>
                <option value="1-50">1-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000+">1000+</option>
              </Field>
              {errors.employees && touched.employees && (
                <div className="mt-1 text-sm text-red-600">{errors.employees}</div>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.message && touched.message && (
                <div className="mt-1 text-sm text-red-600">{errors.message}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Send className="h-5 w-5 mr-2" />
              Contact Sales
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}