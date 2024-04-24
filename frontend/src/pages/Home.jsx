import { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import api from "../api";
import JobForm from "../components/JobForm";

function Home() {
    const [ data, setData ] = useState();
    const fetch = async () => {
        try {
            // const response = await api.get('/api/resumes/create/');
            const response = await api.get('/api/jobs/');
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div>
            {/* <ResumeForm /> */}
            <JobForm />
        </div>
    )
}

export default Home;