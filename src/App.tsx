import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/header/NavBar";
import About from "./components/header/About";
import Contact from "./components/header/Contact";
import AllCourses from "./components/header/AllCourses";
import Service from "./components/header/Service";
import Login from "./components/Resgiter/Login";
import Signup from "./components/Resgiter/Signup";
import { Footer, footerSections } from "./components/header/Footer";
import ResetPassword from "./components/Resgiter/ResetPassword";
import ForgotPassword from "./components/Resgiter/ForgotPassword";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./components/header/Home";
import AdminCatagory from "./components/admindashboard/AdminCatagory";
import AdminSubCategory from "./components/admindashboard/AdminSubCategory";
import AdminAllUsers from "./components/admindashboard/AdminAllUsers";
// import useAuth from "./hooks/useAuth";
import PublicAllCourses from "./components/public/PublicAllCourses";
import PublicAllSubCourses from "./components/public/PublicAllSubCourses";
import AdminProfilePage from "./components/admindashboard/AdminProfilePage";
import PaymentHistory from "./components/admindashboard/PaymentHistory";
import AdminAllCourses from "./components/admindashboard/AdminAllCourses";
import PublicPremiumPurchase from "./components/public/PublicPremiumPurchase";
import UserProfilePage from "./components/usersadhboard/UserProfilePage";
// import Reports from "./components/admindashboard/reports";
import UserPaymentHistory from "./components/usersadhboard/UserPaymentHistory";
import PurchaseCourse from "./components/usersadhboard/purchaseCourse";
import MemberShip from "./components/usersadhboard/MemberShip";
import Reports from "./components/admindashboard/Reports";
import PremiumUser from "./components/admindashboard/PremiumUser";
import AddBatch from "./components/admindashboard/AddBatch";
import AllBatch from "./components/admindashboard/AllBatch";
// import Protectedroute from "./layout/protected";

export default function App() {
  // Create references for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const allCoursesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // const location = useLocation();
  // const { getUser, user } = useAuth();
  // useEffect(() => {
  //   getUser();
  // }, [location?.pathname, getUser]);
  // console.log(user, localStorage);

  return (
    <>
      <Navbar
        homeRef={homeRef}
        allCoursesRef={allCoursesRef}
        servicesRef={servicesRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              homeRef={homeRef}
              allCoursesRef={allCoursesRef}
              servicesRef={servicesRef}
              aboutRef={aboutRef}
              contactRef={contactRef}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route element={<Protectedroute />}> */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminCategory" element={<AdminCatagory />} />
        <Route path="/adminSubCategory" element={<AdminSubCategory />} />
        <Route path="/adminAllUsers" element={<AdminAllUsers />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/admin/profile/:userId" element={<AdminProfilePage />} />
        <Route path="/payment/history/" element={<PaymentHistory />} />
        <Route path="/admin/courses" element={<AdminAllCourses />} />
        <Route path="/admin/premium/user" element={<PremiumUser />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/batch/add" element={<AddBatch />} />
        <Route path="/admin/batch/all" element={<AllBatch />} />
        {/* </Route> */}
        {/* //User panel */}
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/user/profile/:userId" element={<UserProfilePage />} />
        <Route path="/user/payment/history" element={<UserPaymentHistory />} />
        <Route path="/user/purchase/course" element={<PurchaseCourse />} />
        <Route path="/user/membership" element={<MemberShip />} />
        {/* public file  */}
        <Route path="/publicAllCourses" element={<PublicAllCourses />} />
        <Route
          path="/subcategories/:categoryId"
          element={<PublicAllSubCourses />}
        />
        <Route
          path="/publicPremiumPurchase"
          element={<PublicPremiumPurchase />}
        />
      </Routes>
      <Footer sections={footerSections} />
    </>
  );
}
