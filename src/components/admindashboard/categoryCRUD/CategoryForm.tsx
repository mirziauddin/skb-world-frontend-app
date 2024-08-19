import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface CategoryFormProps {
  category: {
    name: string;
    Desc: string;
    Date: string;
    imageUrl: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onChange,
  onImageUpload,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Name"
        name="name"
        value={category.name}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="Desc"
        value={category.Desc}
        onChange={onChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <TextField
        label="Date"
        name="Date"
        value={category.Date}
        onChange={onChange}
        fullWidth
        required
      />
      <input
        accept="image/*"
        type="file"
        name="imageUrl"
        onChange={onImageUpload}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
