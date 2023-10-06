import { Fragment, useEffect, useState } from "react";
import { getCourse } from "../../client/Course/Course.GET";
import { useParams, useNavigate } from "react-router-dom";
import CourseCard from "../../components/cards/CourseCard";
import TextInput from "../../components/inputs/TextInput/TextInput";
import NumberInput from "../../components/inputs/NumberInput/NumberInput";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import FileInput from "../../components/inputs/FileInput/FileInput";
import createCourse from "../../client/Course/Course.POST";
import updateCourse from "../../client/Course/Course.PATCH";
import BaseButton from "../../components/buttons/BaseButton";
import { FireError, FireSucess, FireLoading } from "../../utils/alertHandler";
import "../../styles/createCourse.scss";

/**
 * Page that if it receives a course id it will display an "Edit" mode
 * and if not, it display a "Create" mode for a course.
 */
const CreateOrUpdateCourse = () => {
    const searchParams = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        courseName: "",
        modality: "Presencial",
        numberHours: 2,
        startDate: "",
        endDate: "",
        schedule: "",
        daysOfSession: "",
        description: "",
        temario: "",
        objective: "",
        place: "",
        includes: "",
        price: 0,
        pricing: "Gratuito",
        capacity: 10,   
        teacherName: "",
        teacherReview: "",
        paymentInfo: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (searchParams.id)
            getCourse(searchParams.id)
            .then(response => {
                if (response.startDate)
                    response.startDate = response.startDate.slice(0, 10);
                else 
                    response.startDate = '';
                if (response.endDate)
                    response.endDate = response.endDate.slice(0, 10);
                else 
                    response.endDate = '';

                setData(response);
            })
            .catch(() => navigate('/404'));
    }, []);

    /**
     * Updates the state with the given value for the given key
     *
     * @param {string} key - the name of the field to be updated
     * @param {string} value - the new value of the field
     */
    const updateData = (key, value) => {
        setData({...data, [key]: value});
    };

    /**
     * Creates or updates whatever is in the data state to the Course model in the backend
     *
     * @param {Event} event - event sent by the triggered element
     */
    const onSubmit = async (event) => {
        event.preventDefault();
        
        // Validations
        if (data.pricing === 'Gratuito')
            data.price = 0;
        else if (!data.pricing) {
            FireError('Es necesario declarar si el cursos es gratuito o de paga');
            return;
        }
    
        if (!data.modality) {
            FireError('Es necesario una modalidad');
            return;
        }
        
        if (!data.courseName) {
            FireError('Es necesario un nombre para el curso');
            return;
        }

        // Build FormData
        const formData = new FormData();
        Object.entries(data).forEach(entry => formData.append(entry[0], entry[1]));
        
        
        if (image)
        formData.set('imageUrl', image);
    
        let response = null;
        const swal = FireLoading('Guardando...');
        try{
            if (searchParams.id)
                response = await updateCourse(searchParams.id, formData);
            else
                response =  await createCourse(formData);

            if (!response._id)
                throw 'Error: ' + response;
        }
        catch(error) {
            swal.close();
            FireError(error?.message);
        }

        swal.close();
        FireSucess('Curso guardado');
        navigate(`/Cursos/Curso/${response._id}`);
    };

    return (
        <div className="create-course">
            <div className="create-course--row">
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} curso</h1>
            </div>

            <div className="create-course--row">
                <div className="create-course--col create-course--mr-3">
                    <div className="display-course-card">
                        <CourseCard showMoreBtn={false} {...data} />
                    </div>
                    <NumberInput 
                        label="Capacidad de la sesión"
                        getVal={data.capacity}
                        setVal={value => updateData('capacity', value)}
                    />
                    <TextInput 
                        label="Nombre del instructor"
                        getVal={data.teacherName}
                        setVal={value => updateData('teacherName', value)}
                    />
                    
                    <div className="create-course--form-group">
                        <label htmlFor="review" className="create-course__label-input" >Reseña del instructor</label>
                        <textarea 
                            className="box-input"
                            name="review"
                            value={data.teacherReview}
                            onChange={e => updateData('teacherReview', e.target.value)}
                            placeholder="Una breve reseña que describa el contexto del profesor"
                        ></textarea>
                    </div>
                    <DropdownInput 
                        label="Curso gratuito o pagado"
                        options={['Gratuito', 'Pagado']}
                        getVal={data.pricing}
                        setVal={value => updateData('pricing', value)}
                    />
                    {data.pricing === 'Pagado' &&
                        <Fragment>
                            <NumberInput 
                                label="Costo del curso"
                                getVal={data.price}
                                setVal={value => updateData('price', value)}
                            />
                            <TextInput 
                                label="Datos de pago"
                                getVal={data.paymentInfo}
                                setVal={value => updateData('paymentInfo', value)}
                                placeholder="Cuenta a dónde hay que hacer el depósito"
                        />
                        </Fragment>
                    }
                    <div className="create-course--form-group">
                        <label htmlFor="includes" className="create-course__label-input">Incluye</label>
                        <textarea 
                            className="box-input"
                            name="includes"
                            value={data.includes}
                            onChange={e => updateData('includes', e.target.value)}
                            placeholder="Una lista de cosas que incluye el curso"
                        ></textarea>
                    </div>
                    <div className="create-course--form-group">
                        <label htmlFor="temario" className="create-course__label-input">Temario del curso</label>
                        <textarea 
                            className="box-input"
                            name="temario"
                            value={data.temario}
                            onChange={e => updateData('temario', e.target.value)}
                            placeholder="El que incluye el curso"
                            ></textarea>
                    </div>
                </div>
                
                <div className="create-course--col">
                    <TextInput 
                        label="Título del curso"
                        getVal={data.courseName}
                        setVal={value => updateData('courseName', value)}
                        require
                    />
                    <div className="create-course--form-group">
                        <label htmlFor="includes" className="create-course__label-input">Descripción general del curso</label>
                        <textarea 
                            className="box-input"
                            name="description"
                            value={data.description}
                            onChange={e => updateData('description', e.target.value)}
                        ></textarea>
                    </div>
                    <DropdownInput 
                        label="Modalidad"
                        options={['Presencial', 'Remoto']}
                        getVal={data.modality}
                        setVal={value => updateData('modality', value)}
                    />
                    <TextInput 
                        label="Lugar de la clase"
                        getVal={data.place}
                        setVal={value => updateData('place', value)}
                        placeholder="Edificio y salón o link de Zoom"
                    />
                    <NumberInput 
                        label="Horas que se acreditan"
                        getVal={data.numberHours}
                        setVal={value => updateData('numberHours', value)}
                    />
                    <div className="create-course--form-group">
                        <label htmlFor="startDate" className="create-course__label-input">Fecha de inicio</label>
                        <input
                            name="startDate"
                            className='date-input'
                            value={data.startDate}
                            type='date'
                            onChange={(e) => updateData('startDate', e.target.value)}
                        />
                    </div>
                    <div className="create-course--form-group">
                        <label htmlFor="endDate" className="create-course__label-input">Fecha de finalización</label>
                        <input
                            name="endDate"
                            className='date-input'
                            value={data.endDate}
                            type='date'
                            onChange={(e) => updateData('endDate', e.target.value)}
                        />
                    </div>
                    <TextInput 
                        label="Días de la sesión"
                        getVal={data.daysOfSession}
                        setVal={value => updateData('daysOfSession', value)}
                        placeholder="LU-MI-VI"
                        />
                    <TextInput 
                        label="Horario"
                        getVal={data.schedule}
                        setVal={value => updateData('schedule', value)}
                        placeholder="5:00PM a 6:00pm"
                        />
                    <div className="create-course--form-group">
                        <label htmlFor="objective" className="create-course__label-input">Objetivos del curso</label>
                        <textarea 
                            className="box-input"
                            name="objective"
                            value={data.objective}
                            onChange={e => updateData('objective', e.target.value)}
                            placeholder="Una lista de objectivos que incluye el curso"
                            ></textarea>
                    </div>
                    <FileInput 
                        label="Portada del curso (en formato vertical)"
                        accept=".png"
                        getVal={image}
                        setVal={setImage}
                    />

                    <BaseButton type="primary" onClick={e => onSubmit(e)}>
                        {searchParams.id ? 'Guardar curso' : 'Crear curso'}
                    </BaseButton>
                </div>
            </div>
        </div>
    );
};

export default CreateOrUpdateCourse;
