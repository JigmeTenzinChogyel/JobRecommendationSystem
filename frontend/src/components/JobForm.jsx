import React, { useState } from 'react';
import api from '../api';

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [qualification, setQualification] = useState(['']);
  const [experience, setExperience] = useState(['']);
  const [skills, setSkills] = useState(['']);
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [jobFile, setJobFile] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleSalaryChange = (e) => setSalary(e.target.value);
  
  const handleQualificationChange = (e, index) => {
    const newQualification = [...qualification];
    newQualification[index] = e.target.value;
    setQualification(newQualification);
  };
  const handleExperienceChange = (e, index) => {
    const newExperience = [...experience];
    newExperience[index] = e.target.value;
    setExperience(newExperience);
  };
  const handleSkillsChange = (e, index) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };
  const handleApplicationDeadlineChange = (e) => setApplicationDeadline(e.target.value);
  const handleFileChange = (e) => setJobFile(e.target.files[0]);

  const addQualification = () => setQualification([...qualification, '']);
  const addExperience = () => setExperience([...experience, '']);
  const addSkill = () => setSkills([...skills, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('salary', salary);
    formData.append('qualification', JSON.stringify(qualification));
    formData.append('experience', JSON.stringify(experience));
    formData.append('skills', JSON.stringify(skills));
    formData.append('deadline', applicationDeadline);
    formData.append('job_file', jobFile);

    try {
        console.log(formData)
      const response = await api.post('/api/jobs/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Reset form fields if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      <div>
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={handleSalaryChange}
        />
      </div>

      <div>
        <label>Qualification:</label>
        {qualification.map((qual, index) => (
          <div key={index}>
            <input
              type="text"
              value={qual}
              onChange={(e) => handleQualificationChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={addQualification}>
          Add Qualification
        </button>
      </div>

      <div>
        <label>Experience:</label>
        {experience.map((exp, index) => (
          <div key={index}>
            <textarea
              value={exp}
              onChange={(e) => handleExperienceChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
      </div>

      <div>
        <label>Skills:</label>
        {skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillsChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          Add Skill
        </button>
      </div>

      <div>
        <label htmlFor="applicationDeadline">Application Deadline:</label>
        <input
          type="date"
          id="applicationDeadline"
          value={applicationDeadline}
          onChange={handleApplicationDeadlineChange}
        />
      </div>

      <div>
        <label htmlFor="jobFile">Job File:</label>
        <input
          type="file"
          id="jobFile"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobForm;