import { useState, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import type {} from "@mui/lab/themeAugmentation";
import SaveIcon from "@mui/icons-material/Save";
import AdminNavbar from "./AdminNavbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TableSortLabel,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSubCategoryStore from "../../middleware/Admin/useSubCategoryStore";
import useCategoryStore from "../../middleware/Admin/CategoryState";
import axios from "axios";
import { BASE_URL } from "../../utils";
import SubCategoryForm from "./subCatagoryCRUD/SubCategoryForm";
import LoadingButton from "@mui/lab/LoadingButton";

type SubCategory = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUpload?: string;
  pdfUpload?: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

const AdminSubCategory = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof SubCategory>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    fetchSubCategories,
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
  } = useSubCategoryStore();
  const { categoryId } = useCategoryStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/catagory/`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategoriesFromApi = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/subCatagory/`);
        setSubCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch subcategories");
        setLoading(false);
      }
    };

    fetchSubCategoriesFromApi();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId);
    }
  }, [categoryId, fetchSubCategories]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleEdit = (id: string) => {
    const subCategory = subCategories.find((subCat) => subCat.id === id);
    if (subCategory) {
      setSelectedSubCategory(subCategory);
      setFormVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      deleteSubCategory(id);
    }
  };

  const handleAddClick = () => {
    setSelectedSubCategory(null);
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  const handleRequestSort = (property: keyof SubCategory) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setOrderBy(property);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  const filteredSubCategories = subCategories
    .filter((subCategory) =>
      subCategory.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA === undefined || valueB === undefined) {
        return 0;
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  if (loading)
    return (
      <LoadingButton
        className="items-center text-black"
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
      >
        Data Fetching, please wait....
      </LoadingButton>
    );
  if (error) return <p>{error}</p>;

  return (
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
        <AdminNavbar OpenSidebar={OpenSidebar} userId={""} />
        <div className="p-4">
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleAddClick}
          >
            Add SubCategory
          </Button>
          <TextField
            label="Search SubCategories"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          {formVisible && (
            <SubCategoryForm
              selectedSubCategory={selectedSubCategory}
              categories={categories}
              onClose={handleFormClose}
              onSubmit={(subCategory) => {
                if (subCategory.id) {
                  editSubCategory(subCategory.id, {
                    name: subCategory.name,
                    description: subCategory.description,
                    imageUpload: subCategory.imageUpload,
                    pdfUpload: subCategory.pdfUpload,
                  });
                } else {
                  addSubCategory(subCategory.categoryId, {
                    name: subCategory.name,
                    description: subCategory.description,
                    imageUpload: subCategory.imageUpload,
                    pdfUpload: subCategory.pdfUpload,
                  });
                }
                setFormVisible(false);
              }}
            />
          )}
          <div className="hidden md:block">
            <TableContainer component={Paper}>
              <Table className="border-4 border-green-500 p-4">
                <TableHead className="bg-green-700 text-white">
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? sortDirection : "asc"}
                        onClick={() => handleRequestSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>PDF</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSubCategories.map((subCategory) => {
                    const categoryName = categories.find(
                      (category) => category.id === subCategory.categoryId
                    )?.name;

                    return (
                      <TableRow key={subCategory.id}>
                        <TableCell>{subCategory.id}</TableCell>
                        <TableCell>{categoryName || "No Category"}</TableCell>
                        <TableCell>{subCategory.name}</TableCell>
                        <TableCell>{subCategory.description}</TableCell>
                        <TableCell>{subCategory.price}</TableCell>
                        <TableCell>
                          {subCategory.imageUpload && (
                            <img
                              src={subCategory.imageUpload}
                              alt={subCategory.name}
                              className="w-24 h-24 object-cover"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {subCategory.pdfUpload && (
                            <a
                              href={subCategory.pdfUpload}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View PDF
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(subCategory.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(subCategory.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEdit(subCategory.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(subCategory.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="block md:hidden">
            <Grid container spacing={2}>
              {filteredSubCategories.map((subCategory) => {
                const categoryName = categories.find(
                  (category) => category.id === subCategory.categoryId
                )?.name;

                return (
                  <Grid item xs={12} key={subCategory.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{subCategory.name}</Typography>
                        <Typography variant="body2">
                          Category: {categoryName || "No Category"}
                        </Typography>
                        <Typography variant="body2">
                          Description: {subCategory.description}
                        </Typography>
                        <Typography variant="body2">
                          Price: {subCategory.price}
                        </Typography>
                        {subCategory.imageUpload && (
                          <img
                            src={subCategory.imageUpload}
                            alt={subCategory.name}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        {subCategory.pdfUpload && (
                          <a
                            href={subCategory.pdfUpload}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </a>
                        )}
                        <Typography variant="body2">
                          Created At:{" "}
                          {new Date(subCategory.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          Updated At:{" "}
                          {new Date(subCategory.updatedAt).toLocaleDateString()}
                        </Typography>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(subCategory.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(subCategory.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubCategory;
