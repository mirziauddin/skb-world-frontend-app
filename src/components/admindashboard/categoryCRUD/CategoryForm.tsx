import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import useCategoryStore from "../../../middleware/Admin/CategoryState";

type CategoryFormProps = {
  initialCategory?: {
    id?: string;
    name: string;
    description?: string;
    imageUpload?: string;
  };
  onClose: () => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialCategory,
  onClose,
}) => {
  const [category, setCategory] = useState({
    id: initialCategory?.id || "",
    name: initialCategory?.name || "",
    description: initialCategory?.description || "",
    imageUpload: initialCategory?.imageUpload || "",
  });

  const { addCategory, editCategory } = useCategoryStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategory((prev) => ({
          ...prev,
          imageUpload: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (category.id) {
      editCategory(category.id, {
        name: category.name,
        description: category.description,
        imageUpload: category.imageUpload,
      });
    } else {
      addCategory({
        name: category.name,
        description: category.description,
        imageUpload: category.imageUpload,
      });
    }
    onClose();
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {category.id ? "Update Category" : "Add New Category"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={category.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={category.description || ""}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {category.imageUpload && (
                <img
                  src={category.imageUpload}
                  alt="Category"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {category.id ? "Update" : "Add"} Category
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
