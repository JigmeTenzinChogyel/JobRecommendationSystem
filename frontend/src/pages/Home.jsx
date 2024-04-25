import { useContext, useState } from "react";
import { UserContext } from "../components/provider/UserProvider";
import api from "../api";

function Home() {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);

  if (!user) {
    return <div>Initializing...</div>;
  }

  const { user_type } = user;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    // Handle file upload logic here
    console.log("Uploaded file:", file);
    try {
        const response = await api.post("/api/resumes/create/", {"resume_file": file}, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      {user_type === "seeker" ? (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
      ) : (
        <div>
          <h1>Post job</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
