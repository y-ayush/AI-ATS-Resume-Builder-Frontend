import React from "react";

function SkillsPreview({ resumeInfo }) {
    return (
        <div className="my-6">
            {resumeInfo?.skills.length > 0 && (
                <div>
                    <h2
                        className="text-center font-bold text-base mb-2"
                        style={{
                            color: resumeInfo?.themeColor,
                        }}
                    >
                        Skills
                    </h2>
                    <hr
                        style={{
                            borderColor: resumeInfo?.themeColor,
                        }}
                    />
                </div>
            )}

            <div className="grid grid-cols-3 gap-x-3 gap-y-1 my-4">
                {resumeInfo?.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="ml-3 flex items-center justify-between"
                    >
                        <ul className={"list-disc"}>
                            <li>
                                {" "}
                                <h2 className="text-sm">{skill.name}</h2>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsPreview;
