import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import { RadioListCompact } from '../radio/RadioListCompact';

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRadioList, setShowRadioList] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleRadioList = () => setShowRadioList(!showRadioList);

  return (
    <div>
      <button onClick={toggleMenu} className="p-4">
        {!isOpen && <GiHamburgerMenu className="text-3xl" />}
      </button>

      <div className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white 
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-full md:w-72
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={toggleMenu}>
              <GrClose className="text-white text-xl" />
            </button>
          </div>

          <div className="flex-1 flex flex-col">
            <Link 
              to="/" 
              className="text-lg hover:bg-gray-700 p-3 border-b border-gray-700"
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            <div className="flex flex-col flex-1">
              <button 
                onClick={toggleRadioList}
                className="flex items-center justify-between text-lg hover:bg-gray-700 p-3 border-b border-gray-700"
              >
                <span>Radio Stations</span>
                {showRadioList ? (
                  <MdKeyboardArrowUp className="text-xl" />
                ) : (
                  <MdKeyboardArrowDown className="text-xl" />
                )}
              </button>
              
              <div className={`flex-1 ${showRadioList ? 'block' : 'hidden'}`}>
                <div className="h-full overflow-y-auto">
                  <RadioListCompact isSmallScreen={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
