import { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import api from "../api";
import JobForm from "../components/JobForm";

function Home() {
    const [ data, setData ] = useState();
    const fetch = async () => {
        try {
            // const response = await api.get('/api/resumes/create/');
            const response = await api.get('/api/jobs/create/');
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
            <p className="text-3xl font-bold underline">Hello world!</p>
            {/* <ResumeForm /> */}
            <JobForm />
        </div>
    )
}

export default Home;