import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/users/Users";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";
import Roles from "./pages/roles/Roles";
import CreateRole from "./pages/roles/RoleCreate";
import Products from "./pages/products/Products";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/create" element={<UserCreate />} />
					<Route path="/users/:id/edit" element={<UserEdit />} />
					<Route path="/roles" element={<Roles />} />
					<Route path="/roles/create" element={<CreateRole />} />
					<Route path="/roles" element={<Roles />} />
					<Route path="/products" element={<Products />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
