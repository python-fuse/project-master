import { FormControl, Input as ChakraInput } from "@chakra-ui/react";
const Input = ({ onChange, value, name, type, placeholder }) => {
  return (
    <FormControl className="space-y-2" isRequired>
      <label htmlFor={name}>
        {name} <span className="text-red-200">*</span>
      </label>
      <ChakraInput
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        colorScheme={"blue"}
        borderWidth={"4px"}
        rounded={"8px"}
        outline={"none"}
        background={"transparent"}
        borderColor={"rgb(209 213 219)"}
        className="w-full"
        padding={"16px"}
        height={"60px"}
        fontSize={20}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default Input;
