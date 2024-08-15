import React from "react";
import { Route, Routes } from "react-router-dom";
import Records from "./components/records.js"
import Create from "./components/create.js"
import Edit from "./components/edit.js";
import Login from "./components/login.js";
import Logout from "./components/logout.js";
import AccountSummary from "./components/accountSummary.js";
import BankingSummary from "./components/bankingSummary.js";
import SessionSet from "./components/session_set.js";
import SessionGet from "./components/session_get.js";
import SessionDelete from "./components/session_delete.js";
import SessionLogout from "./components/session_delete.js";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element={<Records/>} />
        <Route path = "/create" element={<Create />} />
        <Route path = "/Login" element={<Login />} />
        <Route path = "/logout" element={<Logout />} />
        <Route path = "/accountSummary" element={<AccountSummary />} />
        <Route path = "/accountSummary/bankingSummary" element={<BankingSummary />} />
        <Route path = "/edit/:id" element={<Edit />} />
        <Route path = "/session_set" element={<SessionSet />} />
        <Route path = "/session_get" element={<SessionGet />} />
        <Route path = "/session_delete" element={<SessionDelete />} />
        <Route path = "/session_logout" element={<SessionLogout />} />
      </Routes>
    </div>
  );
}


export default App;
