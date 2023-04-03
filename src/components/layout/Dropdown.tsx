import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';

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
        <div className="dropdown_header" onClick={() => setIsOpen(!isOpen)}>
            <div className="arrow_down"/>
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