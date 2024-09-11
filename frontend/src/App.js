import { BrowserRouter} from "react-router-dom";
import UserRoutes from "./routes/User_routes";
import HomePageRoutes from "./routes/Home_routes";
import ClinicalRoutes from "./routes/Clinical_routes";
import GeneralTestRoutes from "./routes/GeneralTest_routes";
import AdvancedTestRoutes from "./routes/AdvancedTest_routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Content">
          <UserRoutes />
          <HomePageRoutes />
          <ClinicalRoutes />
          <GeneralTestRoutes />
          <AdvancedTestRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
