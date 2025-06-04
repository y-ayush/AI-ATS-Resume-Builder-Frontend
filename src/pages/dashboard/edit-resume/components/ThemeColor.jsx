import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(
      resumeInfo?.themeColor || "#3357FF"
  );
  const [inputColor, setInputColor] = useState(selectedColor);
  const { resume_id } = useParams();

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#5733FF",
  ];

  // Sync input color when selectedColor changes
  useEffect(() => {
    setInputColor(selectedColor);
  }, [selectedColor]);

  const handleColorChange = async (color) => {
    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/i;
    if (!hexRegex.test(color)) {
      toast.error("Invalid hex color code");
      return;
    }
    const normalizedColor = color.length === 4 ?
        `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` :
        color;

    try {
      setSelectedColor(normalizedColor);
      dispatch(
          addResumeData({
            ...resumeInfo,
            themeColor: normalizedColor,
          })
      );

      await updateThisResume(resume_id, {
        data: { themeColor: normalizedColor },
      });
      toast.success("Theme color updated");
    } catch (error) {
      toast.error("Error updating theme color");
      // Revert to previous color on error
      setInputColor(selectedColor);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputColor(value);

    // Update immediately if valid
    if (/^#([A-Fa-f0-9]{3}){1,2}$/i.test(value)) {
      handleColorChange(value);
    }
  };

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2" size="sm">
            <Palette className="h-4 w-4" />
            <span>Theme</span>
            <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: selectedColor }}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                  type="text"
                  value={inputColor}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    if (!/^#([A-Fa-f0-9]{3}){1,2}$/i.test(e.target.value)) {
                      setInputColor(selectedColor);
                      toast.error("Invalid hex color code");
                    }
                  }}
                  className="w-full px-2 py-1 border rounded text-sm font-mono"
                  placeholder="#FFFFFF"
                  pattern="^#([A-Fa-f0-9]{3}){1,2}$"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              {colors.map((color, index) => (
                  <button
                      key={index}
                      className="h-6 w-6 rounded-full border-2 hover:border-gray-400 transition-colors"
                      style={{
                        backgroundColor: color,
                        borderColor: selectedColor === color ? "#000" : "transparent",
                      }}
                      onClick={() => handleColorChange(color)}
                  />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
  );
}

export default ThemeColor;