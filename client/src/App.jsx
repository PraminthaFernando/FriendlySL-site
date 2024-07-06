import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Categories from "./pages/Categories";
import Categorie from "./pages/Categorie";
import CatDetails from "./pages/catDetails";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Component/Login";
import Register from "./pages/Component/Register";
import PermUserDashboard from "./pages/Dashbords/PermUserDashboard";
import AgentDashboard from "./pages/Dashbords/AgentDashboard";
import AdminDashboard from "./pages/Dashbords/AdminDashboard";
import Listing from "./pages/Component/listing";
import AddCat from "./pages/Component/AddCat";
import Edit from "./pages/Component/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories />}></Route>
          <Route path="/Home" element={<Categories />}></Route>
          <Route path="/UserDashboard" element={<PermUserDashboard />}></Route>
          <Route path="/AgentDashboard" element={<AgentDashboard />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signin" element={<Register />}></Route>
          <Route path="/Listing" element={<Listing />}></Route>
          <Route path="/categorie" element={<Categories />} />
          <Route path="/AddCat" element={<AddCat />}></Route>
          <Route path="/Edit" element={<Edit />}></Route>
          <Route path="/categorie/:categorie_ID" element={<SearchResult />} />
          <Route
            path="/Categorie/Listings/:Categorie_ID"
            element={<Categorie />}
          />
          <Route
            path="/Categorie/Listings/:Categorie_ID/:Listing_ID"
            element={<CatDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
