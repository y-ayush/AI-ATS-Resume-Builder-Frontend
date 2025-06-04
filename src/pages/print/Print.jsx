// src/edit-resume/components/PrintPage.jsx
import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import PersonalDetailPreview from "@/pages/dashboard/edit-resume/components/preview-components/PersonalDeatailPreview";
import SummaryPreview from "@/pages/dashboard/edit-resume/components/preview-components/SummaryPreview";
import ExperiencePreview from "@/pages/dashboard/edit-resume/components/preview-components/ExperiencePreview";
import EducationalPreview from "@/pages/dashboard/edit-resume/components/preview-components/EducationalPreview";
import SkillsPreview from "@/pages/dashboard/edit-resume/components/preview-components/SkillsPreview";
import ProjectPreview from "@/pages/dashboard/edit-resume/components/preview-components/ProjectPreview";

const PrintPage = forwardRef((props, ref) => {
    const { resume_id } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);

    // expose a print method if parent wants to call it
    useImperativeHandle(ref, () => ({
        print: () => {
            window.print();
        },
    }));

    useEffect(() => {
        (async () => {
            try {
                const resp = await getResumeData(resume_id);
                setResumeData(resp.data);
            } catch (err) {
                console.error("Failed to load resume data:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [resume_id]);

    if (loading) {
        return <div className="p-10 text-center">Loading resume…</div>;
    }
    if (!resumeData) {
        return (
            <div className="p-10 text-center text-red-600">
                Resume not found.
            </div>
        );
    }

    return (
        <div
            id="print"
            className="shadow-lg h-full p-10 border-t-[20px] bg-gray-100"
            style={{ borderColor: resumeData.themeColor || "#000000" }}
        >
            <PersonalDetailPreview resumeInfo={resumeData} />
            <SummaryPreview resumeInfo={resumeData} />
            {resumeData.experience && (
                <ExperiencePreview resumeInfo={resumeData} />
            )}
            {resumeData.projects && <ProjectPreview resumeInfo={resumeData} />}
            {resumeData.education && (
                <EducationalPreview resumeInfo={resumeData} />
            )}
            {resumeData.skills && <SkillsPreview resumeInfo={resumeData} />}
        </div>
    );
});

export default PrintPage;
