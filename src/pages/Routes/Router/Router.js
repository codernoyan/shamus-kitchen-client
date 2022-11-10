import { createBrowserRouter } from "react-router-dom";
import AddService from "../../AddService/AddService";
import AllServices from "../../AllServices/AllServices";
import Blogs from "../../Blogs/Blogs";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Home from "../../Home/Home/Home";
import Main from "../../Layouts/Main";
import Login from "../../Login/Login";
import MyReviews from "../../MyReviews/MyReviews";
import ServiceDetails from "../../ServiceDetails/ServiceDetails";
import SignUp from "../../SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/services',
        loader: ()=> fetch('http://localhost:5000/services'),
        element: <AllServices></AllServices>
      },
      {
        path: '/addservice',
        element: <PrivateRoute><AddService></AddService></PrivateRoute>
      },
      {
        path: '/services/:id',
        loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`),
        element: <ServiceDetails></ServiceDetails>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/myreviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      }
    ]
  }
])