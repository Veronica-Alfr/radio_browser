import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { RadioListCompact } from '../radio/RadioListCompact';
import { RadioCompactProvider } from '../../context/RadioCompactProvider';

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRadioList, setShowRadioList] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleRadioList = () => setShowRadioList(!showRadioList);

  return (
    <RadioCompactProvider>
      <div>
        <button onClick={toggleMenu} className="p-4">
          {!isOpen && <GiHamburgerMenu className="text-3xl" />}
        </button>

        <div className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white 
          transition-transform duration-300 z-50
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

            <div className="flex-1 flex flex-col overflow-hidden">
              {location.pathname === '/' ? (
                <Link
                  to="/radio/favorites"
                  className="text-lg hover:bg-gray-700 p-3 border-b border-gray-700"
                  onClick={toggleMenu}
                >
                  Favorite List
                </Link>
              ) : location.pathname === '/radio/favorites' ? (
                <>
                  <Link
                    to="/"
                    className="text-lg hover:bg-gray-700 p-3 border-b border-gray-700"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>

                  <div className="flex flex-col flex-1 overflow-hidden">
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

                    {showRadioList && (
                      <div className="flex-1 overflow-hidden">
                        <RadioListCompact />
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </RadioCompactProvider>
  );
};
