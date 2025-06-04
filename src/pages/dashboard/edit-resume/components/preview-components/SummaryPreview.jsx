import React from "react";

function SummeryPreview({ resumeInfo }) {
    return <p className="text-sm">{resumeInfo?.summary}</p>;
}

export default SummeryPreview;
