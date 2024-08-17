import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function UserNavbar({ OpenSidebar }: { OpenSidebar: () => void }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="cursor-pointer">
        <BsJustify className="text-2xl" onClick={OpenSidebar} />
      </div>
      <div className="flex-1 flex justify-center">
        <BsSearch className="text-2xl cursor-pointer" />
      </div>
      <div className="flex items-center space-x-4">
        <BsFillBellFill className="text-2xl cursor-pointer" />
        <BsFillEnvelopeFill className="text-2xl cursor-pointer" />
        <BsPersonCircle className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
}

export default UserNavbar;
