import { 
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Patients } from "../../pages/Patients";
import { Users } from "../../pages/Users";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../../pages/Dashboard";
import { Attendance } from "../../pages/Attendance";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/usuarios" element={<Users />} />
                    <Route path="/pacientes" element={<Patients />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path ="/attendance/:id" element={<Attendance />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}