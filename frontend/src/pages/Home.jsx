import { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import api from "../api";

function Home() {
    const [ data, setData ] = useState();
    const fetch = async () => {
        try {
            const response = await api.get('/api/resumes/create/');
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
            <ResumeForm />
        </div>
    )
}

export default Home;