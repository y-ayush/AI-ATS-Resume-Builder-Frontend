import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { EditResume } from "./pages/dashboard/edit-resume/components/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/ViewResume.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import { resumeStore } from "./store/store";
import { Provider } from "react-redux";
import PrintPage from "./pages/print/Print.jsx";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/edit-resume/:resume_id",
                element: <EditResume />,
            },
            {
                path: "/dashboard/view-resume/:resume_id",
                element: <ViewResume />,
            },
        ],
    },
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/print/:resume_id",
        element: <PrintPage />,
    },
    {
        path: "/auth/sign-in",
        element: <AuthPage />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={resumeStore}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
