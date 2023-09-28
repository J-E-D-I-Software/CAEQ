import './BaseButton.scss';

const BaseButton = ({ children, type, onClick }) => {
    const buttonClassName = `button button-${type}`;
    return (
        <button onClick={onClick} className={buttonClassName}>
            {children}
        </button>
    );
};

export default BaseButton;
