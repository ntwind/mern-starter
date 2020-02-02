import React from 'react'
import { Field, reduxForm } from 'redux-form'


// Import Style
import styles from './CommentForm.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const maxLength256 = maxLength(256);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

const minValue13 = minValue(13);

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const renderField = ({
                       input,
                       label,
                       type,
                       className,
                       meta: { touched, error, warning }
                     }) => (
  <div>
    <label className={styles['form-label']}>{label}</label>
    <div>
      <input {...input} className={className} placeholder={label} type={type} />
      {touched &&
      ((error && <span className={`${styles.error} ${styles.hint}`}>{error}</span>) ||
        (warning && <span className={`${styles.warn} ${styles.hint}`}>{warning}</span>))}
    </div>
  </div>
);

const renderTextArea = ({
                       input,
                       label,
                       type,
                       className,
                       meta: { touched, error, warning }
                     }) => (
  <div>
    <label className={styles['form-label']}>{label}</label>
    <div>
      <textarea {...input} className={className} placeholder={label} />
      {touched &&
      ((error && <span className={`${styles.error} ${styles.hint}`}>{error}</span>) ||
        (warning && <span className={`${styles.warn} ${styles.hint}`}>{warning}</span>))}
    </div>
  </div>
);

const CommentForm = props => {
  const { className, invalid, handleSubmit, submitting } = props;
  const formCls = `${styles.form} ${styles.appear}`;
  const submitBtnCls = (invalid || submitting)
                       ? `${styles['post-submit-button']} ${styles['post-submit-button-disabled']}`
                       : `${styles['post-submit-button']}`;

  return (
    <form onSubmit={handleSubmit} className={[className, formCls].join(' ')}>
      <div className={styles['form-content']}>
        <Field
          className={styles['form-field']}
          name="name"
          type="text"
          component={renderField}
          label="Name"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />

        <Field
          className={styles['form-field']}
          name="comment"
          type="text"
          component={renderTextArea}
          label="Comment"
          validate={[required, maxLength256, minLength2]}
          warn={alphaNumeric}
        />

        <div>
          <button className={submitBtnCls} type="submit" disabled={invalid || submitting}>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'fieldLevelValidation', // a unique identifier for this form,
  enableReinitialize: true
})(CommentForm)
