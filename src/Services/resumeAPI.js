import axios from "axios";
import { VITE_APP_URL } from "@/config/config";

const axiosInstance = axios.create({
    baseURL: `${VITE_APP_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const createNewResume = async (data) => {
    try {
        const response = await axiosInstance.post(
            "resumes/createResume",
            data.data
        );
        return response.data;
    } catch (error) {
        // console.log("Eroor in getting all the resumes ",error);
        throw new Error(
            error?.response?.data?.message ||
                error?.message ||
                "Something Went Wrong"
        );
    }
};

const getAllResumeData = async () => {
    try {
        const response = await axiosInstance.get("resumes/getAllResume");
        return response.data;
    } catch (error) {
        // console.log("Eroor in getting all the resumes ",error);
        throw new Error(
            error?.response?.data?.message ||
                error?.message ||
                "Something Went Wrong"
        );
    }
};

const getResumeData = async (resumeID) => {
    try {
        const response = await axiosInstance.get(
            `resumes/getResume?id=${resumeID}`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
                error?.message ||
                "Something Went Wrong"
        );
    }
};

const updateThisResume = async (resumeID, data) => {
    try {
        const response = await axiosInstance.put(
            `resumes/updateResume?id=${resumeID}`,
            data.data
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
                error?.message ||
                "Something Went Wrong"
        );
    }
};

const deleteThisResume = async (resumeID) => {
    try {
        const response = await axiosInstance.delete(
            `resumes/removeResume?id=${resumeID}`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
                error?.message ||
                "Something Went Wrong"
        );
    }
};

const printThisResume = async (resumeID) => {
    try {
        const response = await axiosInstance.get(
            `resumes/printResume?id=${resumeID}`,
            {
                responseType: "blob", // ensure binary data is handled correctly
                withCredentials: true, // in case your API requires cookies
            }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `resume-${resumeID}.pdf`;

        // Append to body to ensure it works in all browsers
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke blob URL after short delay to ensure download is triggered
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 100);
    } catch (error) {
        console.error("Download error:", error);
        throw new Error(
            error?.response?.data?.message ||
            error?.message ||
            "Failed to download resume"
        );
    }
};


export {
    getAllResumeData,
    deleteThisResume,
    getResumeData,
    updateThisResume,
    createNewResume,
    printThisResume,
};
