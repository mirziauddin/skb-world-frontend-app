import { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UpdateUserForm from "./usersCRUD/UpdateUserForm";
import AddUserForm from "./usersCRUD/AddUserForm";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
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

export default function AdminAllUsers() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${BASE_URL}/auth`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleAddUser = async () => {
    await fetchUsers();
    setIsAddUserFormOpen(false);
  };

  const handleUpdateUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleUpdateUserFormClose = async () => {
    await fetchUsers();
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/auth/${id}`);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete);
      handleCloseDeleteDialog();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        <AdminNavbar OpenSidebar={OpenSidebar} userId="userId" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">User List</h1>
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl">Users</h2>
            <button
              onClick={() => setIsAddUserFormOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
          <div className="hidden lg:block overflow-x-auto">
            <TableContainer component={Paper} className="max-w-full">
              <Table
                sx={{ minWidth: 650 }}
                aria-label="user table"
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Created At</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell>{user.id}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.role}</StyledTableCell>
                      <StyledTableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell>
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleUpdateUser({
                              id: user.id,
                              email: user.email,
                              name: user.name,
                              role: user.role,
                              createdAt: user.createdAt,
                              updatedAt: user.updatedAt,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => openDeleteDialog(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="lg:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <h3 className="text-lg font-bold">User ID: {user.id}</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end mt-2">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleUpdateUser({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                      })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => openDeleteDialog(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          {isAddUserFormOpen && <AddUserForm onAddUser={handleAddUser} />}
          {selectedUser && (
            <UpdateUserForm
              userId={selectedUser.id}
              initialEmail={selectedUser.email}
              initialName={selectedUser.name}
              onUpdateUser={handleUpdateUserFormClose}
              onClose={() => setSelectedUser(null)}
            />
          )}
          {/* Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this user?"}
            </DialogTitle>
            <DialogContent>
              <p id="alert-dialog-description">This action cannot be undone.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                No
              </Button>
              <Button onClick={handleConfirmDelete} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
