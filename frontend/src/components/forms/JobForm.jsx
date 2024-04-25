import React, { useState } from 'react';
import api from '../../api';

const JobForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        deadline: '',
        job_file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'job_file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission here
        try {
            const response = await api.post("/api/jobs/create/", { ...formData }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter job title"
                    className="input input-bordered w-full"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    placeholder="Enter job description"
                    className="textarea textarea-bordered w-full"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Location</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter job location"
                    className="input input-bordered w-full"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Salary</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter job salary"
                    className="input input-bordered w-full"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Deadline</span>
                </label>
                <input
                    type="date"
                    className="input input-bordered w-full"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Job File</span>
                </label>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    name="job_file"
                    onChange={handleChange}
                />
            </div>

            <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default JobForm;