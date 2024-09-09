import React from "react";
import {ButtonProps} from './ButtonProps.ts';

const Button: React.FC<ButtonProps> = ({value, onClick}) => {
    return (
        <button className="operator" onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;