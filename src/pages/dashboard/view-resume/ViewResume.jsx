// src/views/ViewResume.jsx
import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { getResumeData, printThisResume } from "@/Services/resumeAPI.js";
import PreviewPage from "../edit-resume/components/PreviewPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures.js";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

export default function ViewResume() {
    const [loading, setLoading] = useState(false);
    const resumeRef = useRef(null);
    const { resume_id } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            const response = await getResumeData(resume_id);
            dispatch(addResumeData(response.data));
        })();
    }, [resume_id, dispatch]);

    const resumeInfo = useSelector((state) => state.editResume.resumeData);

    // 👇 Replaces useReactToPrint
    const handleServerDownload = async () => {
        try {
            setLoading(true);
            await printThisResume(resume_id); // this triggers the download
            setLoading(false);
            toast.success("Resume downloaded!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-900 min-h-screen">
            <div id="noPrint" className="my-10 text-center">
                <h2 className="text-2xl font-medium text-white">
                    Your AI‑Generated Resume is Ready!
                </h2>
                <p className="text-gray-400">
                    Download or share your unique URL.
                </p>
                <div className="flex gap-10 justify-between mt-6">
                    <Button disabled={loading} className="mr-10" onClick={handleServerDownload}>
                        {loading ? "Downloading..." : "Download"}
                    </Button>
                    <RWebShare
                        data={{
                            text: "Check out my resume!",
                            url: `${
                                import.meta.env.VITE_BASE_URL
                            }/dashboard/view-resume/${resume_id}`,
                            title: "My Resume",
                        }}
                        onClick={() => toast.success("Shared successfully")}
                    >
                        <Button>Share</Button>
                    </RWebShare>
                </div>
            </div>

            <div
                ref={resumeRef}
                className="bg-white m-0 p-0 text-black w-full max-w-3xl shadow-lg print:shadow-none"
            >
                <PreviewPage />
            </div>
        </div>
    );
}
