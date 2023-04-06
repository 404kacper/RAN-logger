import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import  '../../App.css';

interface Option {
    name: string;
    value: string;
}

interface DropdownProps {
    label: string;
    options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({ options, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleOptionClick = (option: Option) => {
        const index = selectedOptions.findIndex((selectedOption) => selectedOption.value === option.value);

        if (index === -1) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions([...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)]);
        }
    };


  return (
    <div className="dropdown">
        <div className="dropdown_header" onClick={() => setIsOpen(!isOpen)} >
            
        {!isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>)
        }

            <div className="dropdown_label">{label}</div>
        </div>
      

        <Collapse in={isOpen}>
        <div className="dropdown_options">
            {options.map((option) => (
            <div className={"dropdown_option"} key={option.value} onClick={() => handleOptionClick(option)}>
                <Form.Check type="checkbox" id={option.name} label={option.name}  />
            </div>
          ))}
        </div>
    </Collapse>
    </div>
  );
};

export default Dropdown;