import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  description: Yup.string().required("Description is required"),
});
