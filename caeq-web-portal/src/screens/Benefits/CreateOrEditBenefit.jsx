import './CreateOrEditBenefit.scss';
import TextInput from '../../components/inputs/TextInput/TextInput';
import LargeTextInput from '../../components/inputs/TextInput/LargeTextInput';
import CreatableSelectComponent from '../../components/inputs/CreatableSelect/CreatableSelect';
import { getAllBenefits, getBenefit } from '../../client/Benefits/Benefit.GET';
import { createBenefit as createBenefitInAPI } from '../../client/Benefits/Benefit.POST';
import { updateBenefit } from '../../client/Benefits/Benefit.PATCH';
import { deleteBenefit } from '../../client/Benefits/Benefit.DELETE';
import { useEffect, useState } from 'react';
import BaseButton from '../../components/buttons/BaseButton';
import { FireSucess, FireError, FireQuestion } from '../../utils/alertHandler';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOrEditBenefit = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        name: '',
        description: '',
        location: '',
        contact: '',
        website: '',
        category: ''
    });

    const parseCategoriesFromBenefits = (benefits) => {
        const parsedCategories = [];
        benefits.forEach(benefit => {
            if (!categories.includes(benefit.category)) {
                parsedCategories.push({ 
                    value: benefit.category, 
                    label: benefit.category
                });
            }
        });
        return parsedCategories;
    };

    useEffect(() => {
        getAllBenefits()
        .then(data => {
            const categoryOptions = parseCategoriesFromBenefits(data);
            setCategories(categoryOptions);
        });
    }, []);

    useEffect(() => {
        if (searchParams.id) {
            getBenefit(searchParams.id)
            .then(benefit => {
                setData({ ...benefit,
                    category: { value: benefit.category, label: benefit.category }
                });
            });
        }
    }, [searchParams.id]);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!data.name || !data.description || !data.category) {
            FireError('Por favor, ingrese todos los campos requeridos');
            return;
        }
        try {
            data.category = data.category.value;
            if (searchParams.id) {
                delete data._id;
                await updateBenefit(searchParams.id, data);
                FireSucess('Beneficio modificado exitosamente');
            }
            else {
                const newBenefit = await createBenefitInAPI(data);
                FireSucess('Beneficio creado exitosamente');
                navigate(`/Beneficio/${newBenefit._id}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message.includes('duplicado'))
                    FireError('Ya existe un beneficio con ese nombre');
                else
                    FireError(error.response.data.message);
                return;
            } else {
                FireError(error);
            }
        }
    };

    const onDelete = async () => {
        const response = await FireQuestion('¿Está seguro que desea eliminar este beneficio?', 'Esta acción no se puede deshacer');
        if (!response.isConfirmed) return;

        try {
            await deleteBenefit(searchParams.id);
            FireSucess('Beneficio eliminado exitosamente');
            navigate('/Beneficios');
        } catch (error) {
            FireError(error);
        }
    };

    const onInputChange = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    };

    return (
        <div className='create-benefit'> 
            <div className='create-benefit__delete'>
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} Beneficio</h1>
                <BaseButton type="cancel" onClick={onDelete}>Eliminar beneficio</BaseButton>
            </div>

            <form>
                <TextInput 
                    label="Nombre del beneficio"
                    getVal={data.name}
                    setVal={(value) => onInputChange('name', value)}
                    require
                />
                <LargeTextInput 
                    label="Descripción general del beneficio"
                    getVal={data.description}
                    setVal={(value) => onInputChange('description', value)}
                    require
                />
                <TextInput 
                    label="Ubicación"
                    getVal={data.location}
                    setVal={(value) => onInputChange('location', value)}
                />
                <TextInput 
                    label="Contacto"
                    getVal={data.contact}
                    setVal={(value) => onInputChange('contact', value)}
                />
                <TextInput 
                    label="Sitio web"
                    getVal={data.website}
                    setVal={(value) => onInputChange('website', value)}
                />
                <CreatableSelectComponent 
                    label="Categoría"
                    value={data.category}
                    onChange={(value) => onInputChange('category', value)}
                    options={categories}
                    isMulti={false}
                    require
                />

                <div className="create-benefit__buttons">
                    <BaseButton type="primary" onClick={onSubmit}>Guardar</BaseButton>
                    <BaseButton>Cancelar</BaseButton>
                </div>
            </form>
        </div>
    );
};

export default CreateOrEditBenefit;
