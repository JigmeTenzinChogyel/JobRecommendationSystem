import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const [resume, setResume] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [newExperience, setNewExperience] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await api.get("/api/resumes/me/");
      console.log(response.data);
      if (response.data) {
        setResume(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChipDelete = (type, value) => {
    setResume((prevResume) => {
      const updatedResume = { ...prevResume };
      updatedResume[type] = updatedResume[type].filter((item) => item !== value);
      return updatedResume;
    });
  };

  const handleAddItem = (type, value) => {
    setResume((prevResume) => {
      const updatedResume = { ...prevResume };
      updatedResume[type] = [...updatedResume[type], value];
      return updatedResume;
    });
    resetInputs(type);
  };

  const resetInputs = (type) => {
    if (type === "skills") {
      setNewSkill("");
    } else if (type === "qualification") {
      setNewQualification("");
    } else if (type === "experience") {
      setNewExperience("");
    }
  };

  const handleConfirm = async () => {
    // Handle confirm logic here
    console.log("Confirmed resume:", resume);
  
    try {
      // Patch request with resume data
      const response = await api.patch(`/api/resumes/${resume.id}/update/`, resume);
  
      // Handle successful response
      console.log(response.data);
      if (response.data) {
        // Update local state with updated resume
        setResume(response.data);
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };
  

  return (
    <div>
      {resume && (
        <div>
          <h2 className="text-2xl font-bold my-4">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {resume.skills.map((skill) => (
              <div
                key={skill}
                className="badge badge-primary gap-2 cursor-pointer"
                onClick={() => handleChipDelete("skills", skill)}
              >
                {skill}
                <span className="badge-close-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add new skill"
              className="input input-bordered"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleAddItem("skills", newSkill)}
            >
              Add
            </button>
          </div>

          <h2 className="text-2xl font-bold my-4">Qualifications</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {resume.qualification.map((qualification) => (
              <div
                key={qualification}
                className="badge badge-primary gap-2 cursor-pointer"
                onClick={() => handleChipDelete("qualification", qualification)}
              >
                {qualification}
                <span className="badge-close-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add new qualification"
              className="input input-bordered"
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleAddItem("qualification", newQualification)}
            >
              Add
            </button>
          </div>

          <h2 className="text-2xl font-bold my-4">Experience</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {resume.experience.map((experience) => (
              <div
                key={experience}
                className="badge badge-primary gap-2 cursor-pointer"
                onClick={() => handleChipDelete("experience", experience)}
              >
                {experience}
                <span className="badge-close-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add new experience"
              className="input input-bordered"
              value={newExperience}
              onChange={(e) => setNewExperience(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleAddItem("experience", newExperience)}
            >
              Add
            </button>
          </div>

          <button className="btn btn-success" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;