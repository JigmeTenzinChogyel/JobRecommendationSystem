import React from 'react';
import Detail from '../components/job/Detail';
import { useParams } from 'react-router-dom';
import { useJob } from '../hooks/job';
import Loading from './Loading';
import NotFound from './NotFound';


const JobDetail: React.FC = () => {
  const param = useParams()
  const id = parseInt(param.id || "")
  const { job, isLoading } = useJob(id);

  if (isLoading) {
    return <Loading />
  }
  if (!job) {
    return <NotFound />
  }
  return (
      <Detail job={job}/>
  )
};

export default JobDetail;
