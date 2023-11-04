import './PaginationNav.scss';

const PaginationNav = ({onClickBefore, onClickAfter, page=1}) => {

    return (
        <div className="pagination-nav">
            <p onClick={onClickBefore}>Anterior</p>
            <p>{page}</p>
            <p onClick={onClickAfter}>Siguiente</p>
        </div>
    );
}

export default PaginationNav;
