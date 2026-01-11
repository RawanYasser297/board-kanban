import { Button } from "@radix-ui/themes";
import Dropdown from "../components/Dropdown";

const Header = () => {
  return (
    // there are 5% peace
    <header className="border-b-[1.5px] border-b-medium-grey pl-[5%]">
      <div className="container relative left-[25%] flex h-[100px] w-[70%] items-center justify-between">
        <h2 className="text-heading-l text-black">Platform Launch</h2>
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
