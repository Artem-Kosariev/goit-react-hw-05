import { Field, Form, Formik } from 'formik';
import css from './SearchForm.module.css';

const SearchForm = ({ submit }) => {
  const handleSubmit = (values, actions) => {
    const textInput = values.query.trim();
    submit(textInput);
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <Field
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movie..."
        />
          <button className={css.btn} type="submit">
            Search
          </button>
      </Form>
    </Formik>
  );
};
export default SearchForm;