import ProjectPage from "../components/ProjectPage";

const Page = ({params}) => {
  return <>
  <ProjectPage projectId={params.projectId} />
  
  </>
};

export default Page;
