import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useCategoryStore from "../../middleware/Admin/CategoryState";
import useMediaQuery from "@mui/material/useMediaQuery";
import UpdateCategoryForm from "./categoryCRUD/UpdateCategoryForm";

// Define the Category type with all required properties
type Category = {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  createdAt: string;
  updatedAt: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminCategory = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Media query to detect screen width for small screens
  const isSmallScreen = useMediaQuery("(max-width: 650px)");

  // Initialize newCategory with all required properties
  const [newCategory, setNewCategory] = useState<Category>({
    id: "", // Placeholder; will be set by the backend
    name: "",
    description: "",
    imageUpload: "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  });

  const {
    searchQuery,
    setSearchQuery,
    categories,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, [fetchCategories]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewCategory((prev) => ({
          ...prev,
          imageUpload: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newCategory.id) {
      // Call editCategory with both id and category data
      editCategory(newCategory.id, {
        name: newCategory.name,
        description: newCategory.description,
        imageUpload: newCategory.imageUpload,
      });
    } else {
      addCategory({
        name: newCategory.name,
        description: newCategory.description,
        imageUpload: newCategory.imageUpload,
      });
    }
    setFormVisible(false);
    setNewCategory({
      id: "",
      name: "",
      description: "",
      imageUpload: "",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setUpdateFormVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  const handleUpdateCategory = () => {
    setUpdateFormVisible(false);
    fetchCategories(); // Refresh categories list
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <AdminSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            openSidebarToggle ? "ml-64" : "ml-0"
          }`}
        >
          <AdminNavbar OpenSidebar={OpenSidebar} />
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <TextField
                label="Search Categories"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFormVisible(true)}
              >
                Add Category
              </Button>
            </div>
            {formVisible && (
              <form onSubmit={handleFormSubmit} className="mb-4">
                <TextField
                  label="Name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={newCategory.description || ""}
                  onChange={handleFormChange}
                  fullWidth
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Button type="submit" variant="contained" color="primary">
                  {newCategory.id ? "Update" : "Add"} Category
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setFormVisible(false)}
                >
                  Cancel
                </Button>
              </form>
            )}
            {updateFormVisible && selectedCategory && (
              <UpdateCategoryForm
                categoryId={selectedCategory.id}
                initialName={selectedCategory.name}
                initialDescription={selectedCategory.description || ""}
                initialImageUpload={selectedCategory.imageUpload || ""}
                onUpdateCategory={handleUpdateCategory}
                onClose={() => setUpdateFormVisible(false)}
              />
            )}
            {isSmallScreen ? (
              <div className="grid grid-cols-1 gap-4">
                {categories
                  .filter((cat) =>
                    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((category) => (
                    <Card key={category.id} className="w-full">
                      {category.imageUpload && (
                        <img
                          src={category.imageUpload}
                          alt={category.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <CardContent>
                        <h2 className="text-lg font-bold">{category.name}</h2>
                        <p>{category.description}</p>
                        <p className="text-sm text-gray-600">
                          Created At: {category.createdAt}
                        </p>
                        <p className="text-sm text-gray-600">
                          Updated At: {category.updatedAt}
                        </p>
                        <div className="flex justify-end mt-2">
                          <IconButton onClick={() => handleEdit(category.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(category.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Id</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Image</StyledTableCell>
                      <StyledTableCell>Created At</StyledTableCell>
                      <StyledTableCell>Updated At</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories
                      .filter((cat) =>
                        cat.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((category) => (
                        <StyledTableRow key={category.id}>
                          <StyledTableCell>{category.id}</StyledTableCell>
                          <StyledTableCell>{category.name}</StyledTableCell>
                          <StyledTableCell>
                            {category.description}
                          </StyledTableCell>
                          <StyledTableCell>
                            {category.imageUpload && (
                              <img
                                src={category.imageUpload}
                                alt={category.name}
                                className="w-24 h-24 object-cover"
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {category.createdAt}
                          </StyledTableCell>
                          <StyledTableCell>
                            {category.updatedAt}
                          </StyledTableCell>
                          <StyledTableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(category.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(category.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
