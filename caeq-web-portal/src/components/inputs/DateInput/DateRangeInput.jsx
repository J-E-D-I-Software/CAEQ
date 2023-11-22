import DateInput from './DateInput';
import './DateRangeInput.scss';

const DateRangeInput = ({
    startVal,
    setStartVal,
    endVal,
    setEndVal,
    label = '',
    ...props
}) => {
    return (
        <div className='date-range-input'>
            <label className='label label-input' htmlFor={props.id}>
                {label}
            </label>
            <div className='date-range'>
                <DateInput setVal={setStartVal} getVal={startVal} />
                <span>-</span>
                <DateInput setVal={setEndVal} getVal={endVal} />
            </div>
        </div>
    );
};

export default DateRangeInput;
