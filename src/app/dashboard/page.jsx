import TopTasks from "./components/TopTasks";
import TopProjects from "./components/TopProjects";
import UserGreeting from "./components/UserGreeting";

const page = () => {
  return (
    <section className="px-4 flex flex-col gap-5 mt-5 pb-[30px] overflow-hidden">
      <UserGreeting />
      <TopTasks />
      <TopProjects />
    </section>
  );
};

export default page;
