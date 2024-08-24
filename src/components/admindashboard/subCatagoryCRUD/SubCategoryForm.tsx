import React from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL, getFromLocalStorage } from "../../../utils";

type Category = {
  id: string;
  name: string;
};

type SubCategory = {
  id?: string;
  name: string;
  price?: number;
  description?: string;
  imageUpload?: string;
  pdfUpload?: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId: string;
};

type SubCategoryFormProps = {
  selectedSubCategory: SubCategory | null;
  categories: Category[];
  onSubmit: (subCategory: SubCategory) => void;
  onClose: () => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than 0"),
  categoryId: Yup.string().required("Category is required"),
});

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  selectedSubCategory,
  categories,
  onSubmit,
  onClose,
}) => {
  const initialValues: SubCategory = {
    name: "",
    price: undefined,
    description: "",
    imageUpload: "",
    pdfUpload: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categoryId: "",
    ...(selectedSubCategory || {}),
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    field: string,
    form: any
  ) => {
    const categoryId = event.target.value;
    form.setFieldValue(field, categoryId);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFieldValue("imageUpload", e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handlePdfUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 4 * 1024 * 1024; // 4MB in bytes

      if (file.size > maxSize) {
        alert("File size exceeds 4MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFieldValue("pdfUpload", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (values: SubCategory) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const now = new Date().toISOString();
    const subCategoryData = {
      ...values,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const url = `${BASE_URL}/subCatagory/${values.categoryId}`;
      const method = values.id ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: subCategoryData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Server response:", response.data);
      onSubmit(subCategoryData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to submit subcategory",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <div className="p-6">
      <Card sx={{ maxWidth: 1000, margin: "auto", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {selectedSubCategory ? "Edit SubCategory" : "Add SubCategory"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Field
                    as={Select}
                    name="categoryId"
                    onChange={(event: SelectChangeEvent<string>) =>
                      handleCategoryChange(event, "categoryId", {
                        setFieldValue,
                      })
                    }
                    value={values.categoryId}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="categoryId"
                    component="div"
                    className="text-red-700"
                  />
                </FormControl>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  fullWidth
                  required
                  margin="normal"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-700"
                />
                <Field
                  as={TextField}
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                />
                <Field
                  as={TextField}
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-700"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setFieldValue)}
                  className="mb-2"
                />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(event) => handlePdfUpload(event, setFieldValue)}
                  className="mb-2"
                />
                <Button type="submit" variant="contained" color="primary">
                  {values.id ? "Update" : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onClose}
                  style={{ marginLeft: 8 }}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubCategoryForm;
