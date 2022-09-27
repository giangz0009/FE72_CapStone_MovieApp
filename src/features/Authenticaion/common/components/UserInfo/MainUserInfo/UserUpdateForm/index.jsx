import { Button } from "@mui/material";
import BasicConfirmModal from "common/hoc/BasicConfirmModal";
import { fetchChangeProfile } from "features/Authenticaion/action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";

function UserUpdateForm({
  initialValues,
  validationSchema,
  formData,
  closeFormOnSubmit = () => {},
}) {
  const [confirmNotify, setConfirmNotify] = useState({});

  const dispatch = useDispatch();

  const refConfirmModal = useRef();

  const cbHandleOnCloseConfirmModal = useCallback(() => {
    closeFormOnSubmit(false);
  }, []);

  const handleOnSubmit = async (values) => {
    if (!values.matKhau) {
      const res = await dispatch(fetchChangeProfile(values));
      setConfirmNotify(res);
      refConfirmModal.current.open();
    } else {
      const res = await dispatch(fetchChangeProfile(values.matKhau));
      setConfirmNotify(res);
      refConfirmModal.current.open();
    }
  };

  const renderBasicFormGroup = (formik, inputFormGroup, index) => (
    <div className="group" key={index}>
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
  );

  const renderInputFormGroupsList = (formik) =>
    formData.map((inputFormGroup, index) =>
      renderBasicFormGroup(formik, inputFormGroup, index)
    );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <Form className="mainUserInfoForm">
            {renderInputFormGroupsList(formik)}
            <div className="group">
              <Button
                className="resetBtn"
                type="reset"
                onClick={() => closeFormOnSubmit(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </div>
          </Form>
        )}
      </Formik>
      <BasicConfirmModal
        ref={refConfirmModal}
        isHaveSubmitBtn={false}
        confirmContent={confirmNotify}
        handleOnClose={cbHandleOnCloseConfirmModal}
      />
    </>
  );
}

export default UserUpdateForm;
