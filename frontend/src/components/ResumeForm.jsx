import React, { useState } from "react";
import api from "../api";

const ResumeForm = () => {
  const [skills, setSkills] = useState([""]);
  const [experience, setExperience] = useState([""]);
  const [qualification, setQualification] = useState([""]);
  const [resumeFile, setResumeFile] = useState(null);

  const handleSkillsChange = (e, index) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const handleExperienceChange = (e, index) => {
    const newExperience = [...experience];
    newExperience[index] = e.target.value;
    setExperience(newExperience);
  };

  const handleQualificationChange = (e, index) => {
    const newQualification = [...qualification];
    newQualification[index] = e.target.value;
    setQualification(newQualification);
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const addExperience = () => {
    setExperience([...experience, ""]);
  };

  const addQualification = () => {
    setQualification([...qualification, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("skills", JSON.stringify(skills));
    formData.append("experience", JSON.stringify(experience));
    formData.append("qualification", JSON.stringify(qualification));
    formData.append("resume_file", resumeFile);

    try {
      const response = await api.post("/api/resumes/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        //   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzODcwNjkwLCJpYXQiOjE3MTM4Njg4OTAsImp0aSI6ImI1ZGU4ZjIwNDdiZTRhZTVhYWE2YWUwZWZmZGI3OTY4IiwidXNlcl9pZCI6Mn0.3zFhMIvwHoRNK55svcCzzVNbYWKrpCkrKz1wyYn-YgU"
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Resume</h2>
      <div>
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => handleSkillsChange(e, index)}
          />
        ))}
        <button type="button" onClick={addSkill}>
          Add Skill
        </button>
      </div>
      <div>
        <h3>Experience</h3>
        {experience.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => handleExperienceChange(e, index)}
          />
        ))}
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
      </div>
      <div>
        <h3>Qualifications</h3>
        {qualification.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => handleQualificationChange(e, index)}
          />
        ))}
        <button type="button" onClick={addQualification}>
          Add Qualification
        </button>
      </div>
      <div>
        <h3>Resume File</h3>
        <input type="file" onChange={handleFileChange} />
      </div>
      {/* Similar sections for experience and qualification */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResumeForm;
