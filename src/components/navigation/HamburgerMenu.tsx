import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { RadioListCompact } from '../radio/RadioListCompact';

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="p-4 text-2xl">
        {!isOpen && <GiHamburgerMenu />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-2 p-3 overflow-y-auto text-sm">
          <button onClick={toggleMenu} className="p-2 self-end">
            <GrClose className="text-white text-2xl" />
          </button>

          <Link to="/" className="text-lg hover:bg-gray-700 p-2 rounded">Home</Link>

          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">All Radio Stations</h2>
            <RadioListCompact isSmallScreen={true} />
          </div>
        </nav>
      </div>
    </div>
  );
};
