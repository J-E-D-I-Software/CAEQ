import BaseButton from '../../components/buttons/BaseButton';
import DropdownInput from '../../components/inputs/DropdownInput/DropdownInput';
import TextInput from '../../components/inputs/TextInput/TextInput';
import BenefitCard from '../../components/cards/BenefitCard';
import { FireError } from '../../utils/alertHandler';
import { useState, useEffect } from 'react';
import { getAllBenefits } from '../../client/Benefits/Benefit.GET';
import { useNavigate } from 'react-router-dom';
import RestrictByRole from '../../components/restrictAccess/RestrictByRole';
import './benefits.scss';

/**
 * Page that displays the courses.
 */
const Benefits = (props) => {
    const [benefits, setBenefits] = useState([]);
    const [filterSearchByName, setFilterSearchByName] = useState('');
    const [category, setFilterCategory] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `name[regex]=${filterSearchByName}`;
            if (category) filters += `&category=${category}`;

            const data = await getAllBenefits(filters);
            setBenefits(data);

            const categoryOptions = data.map((benefit) => benefit.category);

            const uniqueSet = new Set(categoryOptions);

            const uniqueArray = [...uniqueSet];

            setCategoryOptions(uniqueArray);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let filters = '';
            if (filterSearchByName) filters = `name[regex]=${filterSearchByName}`;
            if (category) filters += `&category=${category}`;

            const data = await getAllBenefits(filters);

            setBenefits(data);
        };
        try {
            fetchData();
        } catch (error) {
            FireError(error.response.data.message);
        }
    }, [filterSearchByName, category]);

    return (
        <div className='benefits'>
            <div className='courses--row courses__header'>
                <h1>Beneficios CAEQ</h1>
                <div className='courses--row'>
                    <RestrictByRole allowedRoles={['caeq']}>
                        <BaseButton
                            type='primary'
                            className='accept-payment'
                            // Replace with the correct route
                            onClick={() => navigate('/CreateBenefit')}>
                            Crear beneficio
                        </BaseButton>
                    </RestrictByRole>
                </div>
            </div>

            <div className='courses--row courses__filters'>
                <TextInput
                    label='Buscar'
                    placeholder='Por nombre'
                    getVal={filterSearchByName}
                    setVal={setFilterSearchByName}
                />
                <DropdownInput
                    label='Filtrar por categoría'
                    getVal={category}
                    setVal={setFilterCategory}
                    options={categoryOptions}
                    placeholder='Seleccione una categoría'
                />
            </div>

            <div className='courses--row courses__courses-section'>
                {benefits.map((benefit, i) => (
                    <BenefitCard key={i} {...benefit} />
                ))}
            </div>
        </div>
    );
};

export default Benefits;
