import React, { useEffect } from "react";
import ResumeForm from "./ResumeForm.jsx";
import PreviewPage from "./PreviewPage.jsx";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI.js";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures.js";

export function EditResume() {
    const { resume_id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        getResumeData(resume_id).then((data) => {
            dispatch(addResumeData(data.data));
        });
    }, [resume_id]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 bg-gray-900">
            <ResumeForm />
            <PreviewPage />
        </div>
    );
}

export default EditResume;
