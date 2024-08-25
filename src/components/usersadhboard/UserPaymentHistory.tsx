import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import useAuth from "../../hooks/useAuth";
import UserSideBar from "./UserSideBar";
import UserNavbar from "./UserNavbar";

dayjs.extend(isBetween);

interface Payment {
  transactionId: string;
  userName: string;
  userId: string;
  date: string;
  transactionStatus: string;
  money: number;
}

const UserPaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [showPending, setShowPending] = useState<boolean>(true);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Payment[] = [
          {
            transactionId: "12345",
            userName: "John Doe",
            userId: "user1",
            date: "2024-08-15",
            transactionStatus: "Completed",
            money: 100.0,
          },
          {
            transactionId: "67890",
            userName: "Jane Smith",
            userId: "user2",
            date: "2024-08-20",
            transactionStatus: "Pending",
            money: 200.0,
          },
        ];

        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = payments.filter((payment) => {
        const paymentDate = dayjs(payment.date);
        const isInDateRange = paymentDate.isBetween(
          dayjs(startDate),
          dayjs(endDate),
          null,
          "[]"
        );
        const isStatusValid =
          (showPending && payment.transactionStatus === "Pending") ||
          (showCompleted && payment.transactionStatus === "Completed");

        return isInDateRange && isStatusValid;
      });
      setFilteredPayments(filtered);
    } else {
      setFilteredPayments(
        payments.filter((payment) => {
          return (
            (showPending && payment.transactionStatus === "Pending") ||
            (showCompleted && payment.transactionStatus === "Completed")
          );
        })
      );
    }
  }, [startDate, endDate, payments, showPending, showCompleted]);

  const handleFilterChange = () => {
    if (startDate && endDate) {
      setFilteredPayments(
        payments.filter((payment) => {
          const paymentDate = dayjs(payment.date);
          const isInDateRange = paymentDate.isBetween(
            dayjs(startDate),
            dayjs(endDate),
            null,
            "[]"
          );
          const isStatusValid =
            (showPending && payment.transactionStatus === "Pending") ||
            (showCompleted && payment.transactionStatus === "Completed");

          return isInDateRange && isStatusValid;
        })
      );
    } else {
      setFilteredPayments(
        payments.filter((payment) => {
          return (
            (showPending && payment.transactionStatus === "Pending") ||
            (showCompleted && payment.transactionStatus === "Completed")
          );
        })
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );

  return (
    <div className="flex">
      <UserSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          openSidebarToggle ? "ml-64" : "ml-0"
        }`}
      >
        <UserNavbar OpenSidebar={OpenSidebar} userId={userId} />
        <div className="p-4">
          <Typography variant="h6" className="mb-4">
            Payment History
          </Typography>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full sm:w-1/3"
            />
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full sm:w-1/3"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterChange}
            >
              Apply Filter
            </Button>
          </div>
          <div className="mb-4 flex gap-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPending}
                  onChange={(e) => setShowPending(e.target.checked)}
                />
              }
              label="Show Pending"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                />
              }
              label="Show Completed"
            />
          </div>
          <TableContainer component={Paper}>
            <Table className="w-full" aria-label="payment history table">
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Transaction Status</TableCell>
                  <TableCell>Money</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.transactionId}>
                    <TableCell className="text-sm md:text-base">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell className="text-sm md:text-base">
                      {payment.userName}
                    </TableCell>
                    <TableCell className="text-sm md:text-base">
                      {payment.userId}
                    </TableCell>
                    <TableCell className="text-sm md:text-base">
                      {payment.date}
                    </TableCell>
                    <TableCell className="text-sm md:text-base">
                      {payment.transactionStatus}
                    </TableCell>
                    <TableCell className="text-sm md:text-base">
                      {payment.money.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentHistory;
