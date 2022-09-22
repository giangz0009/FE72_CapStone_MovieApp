import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./styles.scss";
import titleImg from "assets/images/icon.png";
import { memo } from "react";

function BasicForm({
  initialValues,
  validationSchema,
  handleOnSubmit,
  inputFormGroupsList,
  subText,
  submitLabel = "Submit",
}) {
  const renderInputFormGroupsList = (formik) =>
    inputFormGroupsList.map((inputFormGroup, index) => (
      <div className="formGroup" key={index}>
        <label htmlFor={inputFormGroup.name}>{inputFormGroup.title}</label>
        <Field
          name={inputFormGroup.name}
          type={inputFormGroup.type}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage
          component="p"
          className="messErr"
          name={inputFormGroup.name}
        />
      </div>
    ));

  return (
    <div className="formWrap">
      <div className="title">
        <img src={titleImg} alt="Title" />
        <h3>Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <Form className="form">
            {renderInputFormGroupsList(formik)}
            <div className="formGroup">
              <button type="submit">{submitLabel}</button>
            </div>
            <div className="formGroup">{subText}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default memo(BasicForm);
