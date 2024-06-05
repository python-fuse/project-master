import { ProgressLabel } from "@chakra-ui/react";
import { Progress } from '@nextui-org/progress'

const UserGreeting = () => {
  return (
    <div className="flex justify-between">
      <h2 className="font-bold text-3xl">Hi, Umar</h2>
		
		<div className="flex items-center gap-2 flex-col w-[200px]">
		<p className="w-content">Completed 10/26</p>
      <Progress value={10}  maxValue={26}/>
		</div>
 
    </div>
  );
};

export default UserGreeting;
