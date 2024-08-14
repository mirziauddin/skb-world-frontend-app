// src/components/AdminCategory.tsx
import { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";
import * as React from "react";
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
import useCategoryStore from "../../middleware/Admin/CategoryState";
import axiosInstance from "../../middleware/Admin/axiosInstance";

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
  const [newCategory, setNewCategory] = useState({
    name: "",
    Desc: "",
    Date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  });

  const { searchQuery, setSearchQuery, categories, addCategory } =
    useCategoryStore();

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

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("Adding new category:", newCategory); // Log the new category data
      const response = await axiosInstance.post("/catagory", {
        name: newCategory.name,
        description: newCategory.Desc,
        createdAt: newCategory.Date,
        updatedAt: newCategory.Date,
      });
      console.log("Category added to database:", response.data);
      addCategory(response.data);
      setFormVisible(false);
      setNewCategory({
        name: "",
        Desc: "",
        Date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
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
          <div className="flex flex-col md:flex-row justify-between p-4">
            <div className="flex items-center mb-4 md:mb-0">
              <SearchIcon className="mr-2" />
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mr-4 w-full md:w-auto"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="w-full md:w-auto"
              onClick={() => setFormVisible(true)}
            >
              Add Category
            </Button>
          </div>

          {formVisible && (
            <div className="p-4">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  name="name"
                  value={newCategory.name}
                  onChange={handleFormChange}
                  fullWidth
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  size="small"
                  name="Desc"
                  value={newCategory.Desc}
                  onChange={handleFormChange}
                  fullWidth
                />
                <TextField
                  label="Date"
                  variant="outlined"
                  size="small"
                  name="Date"
                  value={newCategory.Date}
                  onChange={handleFormChange}
                  fullWidth
                  disabled
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          )}

          {/* Responsive Table */}
          <TableContainer component={Paper} className="overflow-x-auto">
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              className="min-w-full"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .filter((row) =>
                    row.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((row) => (
                    <StyledTableRow key={row.slno}>
                      <StyledTableCell>{row.slno}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Desc}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.Date}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
