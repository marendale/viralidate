/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import PatientPortal from './pages/patientPortal/PatientPortal';
import AdminPortal from './pages/adminPortal/AdminPortal';
import AvailabilityManager from './pages/availabilityManager/AvailabilityManager'; // Adjust the import path as necessary
import Questionnaire from './pages/questionnaire/Questionnaire';
import AppointmentSelection from './pages/appointmentSelection/AppointmentSelection';
import Frontpage from './pages/frontpage/Frontpage';
import { AuthContext } from './components/context/AuthContext';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import QuestionsTest from './pages/questionnaire/QuestionsTest';


const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//code.tidio.co/zvwcyofvqgcrv3khy0vhvhniiimgzmuj.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const router = createBrowserRouter([
    {
      path:"/",
      element:<Frontpage/>
    },
    {
      path:"/patientportal",
      element:<PrivateRoute component = {<PatientPortal />} allowed={['patient']} />
    },
    {
      path:"/adminportal",
      element:<PrivateRoute component = {<AdminPortal />} allowed={['admin']} />
    },
    {
      path:"/availability-manager",
      element:<PrivateRoute component = {<AvailabilityManager />} allowed={['admin']} />
    },    
    {
      path:"/questionnaire",
      element:<PrivateRoute component = {<Questionnaire />} allowed={['patient']}/>
    },
    {
      path:"/appointment-selection",
      element:<PrivateRoute component = {<AppointmentSelection />} allowed={['patient']}/>
    },
    {
      path:"/questions-test",
      element:<QuestionsTest />
    },
  ])


  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
};

export default App;