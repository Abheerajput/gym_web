import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import {Suspense , lazy } from "react";
import './App.css';
import './index.css';
import "./styles/Sidebar.scss"
import "./styles/AddMember.scss"
import "./styles/Members.scss"


import Loader from "./components/Loader";


const AddMember = lazy (()=>import("./pages/AddMember"));
const AllMembers = lazy (()=>import("./pages/AllMembers"));
const AddTrainer= lazy (()=>import("./pages/AddTrainer"));
const AllTrainers = lazy (()=>import("./pages/AllTrainers"));


function App() {
  return (
    <Router>
    <Suspense fallback={<Loader/>} >
    <Routes>
        <Route path="/AddMember" element={<AddMember />} />
        <Route path="/AddTrainer" element={<AddTrainer />} />
        <Route path="/AllMembers" element={<AllMembers/>} />
        <Route path="/AllTrainers" element={<AllTrainers />} />
      </Routes>
    </Suspense>
    </Router>
  );
}

export default App;
