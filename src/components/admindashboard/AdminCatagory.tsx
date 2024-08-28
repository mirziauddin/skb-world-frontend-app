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
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useCategoryStore from "../../middleware/Admin/CategoryState";
import useMediaQuery from "@mui/material/useMediaQuery";
import UpdateCategoryForm from "./categoryCRUD/UpdateCategoryForm";
import CategoryForm from "./categoryCRUD/CategoryForm";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import * as XLSX from "xlsx";

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
    backgroundColor: "green",
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

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const {
    searchQuery,
    setSearchQuery,
    categories,
    fetchCategories,
    deleteCategory,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setUpdateFormVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const toggleFormVisibility = () => {
    setFormVisible((prevVisible) => !prevVisible);
  };

  // Function to handle exporting categories to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
    XLSX.writeFile(workbook, "categories.xlsx");
  };

  // Function to re-fetch categories after an update
  const handleUpdateCategory = () => {
    fetchCategories(); // Refresh categories to reflect the updated data
    setUpdateFormVisible(false); // Close the update form
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar and Navbar */}
      <AdminSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          openSidebarToggle ? "ml-64" : "ml-0"
        }`}
      >
        <AdminNavbar OpenSidebar={OpenSidebar} userId={""} />
        <div className="p-4">
          {/* Search, Add Button, and Export Button */}
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
            <div className="flex gap-2">
              <Button
                variant="contained"
                color="success"
                onClick={toggleFormVisibility}
              >
                {formVisible ? "Close Form" : "Add Category"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={exportToExcel}
              >
                Download Excel
              </Button>
            </div>
          </div>

          {/* Form and Update Form */}
          {formVisible && (
            <CategoryForm onClose={() => setFormVisible(false)} />
          )}

          {updateFormVisible && selectedCategory && (
            <UpdateCategoryForm
              categoryId={selectedCategory.id}
              initialName={selectedCategory.name}
              initialDescription={selectedCategory.description || ""}
              initialImageUpload={selectedCategory.imageUpload || ""}
              onUpdateCategory={handleUpdateCategory} // Pass the handler
              onClose={() => setUpdateFormVisible(false)}
            />
          )}

          {/* Table or Card View for Categories */}
          {isSmallScreen ? (
            <div className="grid grid-cols-1 gap-4">
              {categories
                .filter((cat) =>
                  cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border rounded shadow-md bg-white"
                  >
                    <img
                      src={category.imageUpload || "/placeholder-image.png"}
                      alt={category.name}
                      className="w-full h-32 object-cover mb-2"
                    />
                    <Typography variant="h6">{category.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {category.description}
                    </Typography>
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(category.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(category.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
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
                      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((category) => (
                      <StyledTableRow key={category.id}>
                        <StyledTableCell>{category.id}</StyledTableCell>
                        <StyledTableCell>{category.name}</StyledTableCell>
                        <StyledTableCell>
                          {category.description}
                        </StyledTableCell>
                        <StyledTableCell>
                          {category.imageUpload ? (
                            <img
                              src={category.imageUpload}
                              alt={category.name}
                              className="h-12 w-12 object-cover"
                            />
                          ) : (
                            "N/A"
                          )}
                        </StyledTableCell>
                        <StyledTableCell>{category.createdAt}</StyledTableCell>
                        <StyledTableCell>{category.updatedAt}</StyledTableCell>
                        <StyledTableCell>
                          <IconButton onClick={() => handleEdit(category.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(category.id)}>
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
  );
};

export default AdminCategory;
