import React, { useState } from 'react';
import './BaseButton.scss';
/**
 * NavbarButton component for rendering a button with an icon and label.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label displayed on the button.
 * @param {string} props.type - The type of button (e.g., 'primary', 'secondary', 'success', 'fail', etc.).
 * @param {function} props.action - A function to be called when the button is clicked.
 * @param {string} props.icon - The URL of the icon displayed on the button.
 * @returns {JSX.Element} JSX element representing the NavbarButton.
 *
 * @example
 * // Example usage of NavbarButton:
 * <NavbarButton
 *   label="Home"
 *   type="primary"
 *   action={handleButtonClick}
 *   icon="/path/to/icon.png"
 * />
 */
const NavbarButton = ({ label, type, action, icon }) => {
    const [isActive, setIsActive] = useState(false);

    /**
     * Handles the button click event.
     * @param {Object} e - The click event object.
     */
    const handleClick = (e) => {
        e.preventDefault();
        action(e);
        setIsActive(!isActive); // Toggle the active state
    };

    const buttonClassName = `button button-${type} ${isActive ? 'active' : ''}`;

    return (
        <button onClick={handleClick} className={buttonClassName}>
            <div className='button-content'>
                <div className='icon'>
                    <img src={icon} alt={`${label} Icon`} />{' '}
                    {/* Utiliza el icono proporcionado como prop */}
                </div>
                <div className='label'>{label}</div>
            </div>
        </button>
    );
};

export default NavbarButton;
