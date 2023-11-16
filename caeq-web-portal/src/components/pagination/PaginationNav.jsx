import './PaginationNav.scss';
import { useState } from 'react';

const PaginationNav = ({
    onClickBefore, 
    onClickAfter, 
    beforeBtnEnabled,
    afterBtnEnabled,
    page=1
}) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleBefore = () => {
        if (!isDisabled) {
            setIsDisabled(true);
            onClickBefore();
            setTimeout(() => {
                setIsDisabled(false);
            }, 1000); // enable button after 1 second
        }
    };

    const handlerAfter = () => {
        if (!isDisabled) {
            setIsDisabled(true);
            onClickAfter();
            setTimeout(() => {
                setIsDisabled(false);
            }, 1000); // enable button after 1 second
        }
    };

    return (
        <div className="pagination-nav">
            {beforeBtnEnabled 
                ? <p onClick={handleBefore} className={isDisabled ? 'disabled' : ''}>
                    Anterior</p> 
                : <p className="disabled">Anterior</p>
            }
            <p className="pagination__curent-page">{page}</p>
            {afterBtnEnabled 
                ? <p onClick={handlerAfter} className={isDisabled ? 'disabled' : ''}>
                    Siguiente</p> 
                : <p className="disabled">Siguiente</p>
            }
        </div>
    );
}

export default PaginationNav;
