import './WhiteCard.styles.scss';

const WhiteContainer = ({ children }) => {
    return <div className='container-white' data-testid='white-card'>{children}</div>;
};

export default WhiteContainer;
