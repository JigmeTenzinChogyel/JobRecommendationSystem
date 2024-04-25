import { useEffect, useState } from "react";
import api from "../api";

function Job() {
  const [job, setJob] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [newExperience, setNewExperience] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await api.get("/api/jobs/9/");
      console.log(response.data);
      if (response.data) {
        setJob(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChipDelete = (type, value) => {
    setJob((prevJob) => {
      const updatedJob = { ...prevJob };
      updatedJob[type] = updatedJob[type].filter((item) => item !== value);
      return updatedJob;
    });
  };

  const handleAddItem = (type, value) => {
    setJob((prevJob) => {
      const updatedJob = { ...prevJob };
      updatedJob[type] = [...updatedJob[type], value];
      return updatedJob;
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
    console.log("Confirmed job:", job);
  
    try {
      // Patch request with job data
      const response = await api.patch(`/api/jobs/${job.id}/update/`, {
        skills: job.skills,
        qualification: job.qualification,
        experience: job.experience,
      });
  
      // Handle successful response
      console.log(response.data);
      if (response.data) {
        // Update local state with updated job
        setJob(response.data);
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };
  

  return (
    <div>
      {job && (
        <div>
          <h2 className="text-2xl font-bold my-4">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map((skill) => (
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
            {job.qualification.map((qualification) => (
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
            {job.experience.map((experience) => (
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

export default Job;