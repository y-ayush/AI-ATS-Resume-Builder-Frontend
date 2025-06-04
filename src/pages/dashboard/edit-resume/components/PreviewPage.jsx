// src/edit-resume/components/PreviewPage.jsx
import React, { useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import PersonalDetailPreview from "./preview-components/PersonalDeatailPreview";
import SummaryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";

const PreviewPage = forwardRef(function PreviewPage(props, ref) {
    const resumeData = useSelector((state) => state.editResume.resumeData);
    useEffect(() => {
        console.log("PreviewPage rendered");
    }, [resumeData]);

    return (
        <div
            id="print"
            ref={ref}
            className="shadow-lg h-full p-10 border-t-[20px] bg-gray-100 font-serif"
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

export default PreviewPage;
