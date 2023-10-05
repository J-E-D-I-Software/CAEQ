import { Fragment, useEffect, useState } from "react";
import { getCourse } from "../../client/Course/Course.GET";
import { useParams, useNavigate } from "react-router-dom";
import CourseCard from "../../components/cards/CourseCard";
import TextInput from "../../components/inputs/TextInput/TextInput";
import NumberInput from "../../components/inputs/NumberInput/NumberInput";
import DateInput from "../../components/inputs/DateInput/DateInput";
import DropdownInput from "../../components/inputs/DropdownInput/DropdownInput";
import FileInput from "../../components/inputs/FileInput/FileInput";
import createCourse from "../../client/Course/Course.POST";
import updateCourse from "../../client/Course/Course.PATCH";
import BaseButton from "../../components/buttons/BaseButton";
import { FireError, FireSucess } from "../../utils/alertHandler";
import "../../styles/createCourse.scss";

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
        pricing: 'Gratuito',
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
                response.startDate = response.startDate.slice(0, 10);
                response.endDate = response.endDate.slice(0, 10);
                setData(response);
            })
            .catch(error => navigate('/404'));
    }, []);

    const updateData = (key, value) => {
        setData({...data, [key]: value});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        // Validations
        if (data.pricing === 'Gratuito')
            data.price = 0;
    
        if (!data.modality)
            throw "Es necesario una modalidad";

        // Build FormData
        const formData = new FormData();
        Object.entries(data).forEach(entry => formData.append(entry[0], entry[1]));
        formData.set('imageUrl', image);

        let response = null;
        try{
            if (searchParams.id)
                response = await updateCourse(searchParams.id, formData);
            else
                response =  await createCourse(formData);
        }
        catch(error) {
            console.log(error);
            FireError(error?.message);
        }

        FireSucess('Curso guardado');
        navigate(`/Cursos/Curso/${response._id}`);
    };

    return (
        <div className="create-course">
            <div className="row">
                <h1>{searchParams.id ? 'Modificar' : 'Crear'} curso</h1>
            </div>

            <div className="row">
                <div className="col mr-3">
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
                    
                    <div className="form-group">
                        <label htmlFor="review" className="label-input" >Reseña del instructor</label>
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
                    <div className="form-group">
                        <label htmlFor="includes" className="label-input">Incluye</label>
                        <textarea 
                            className="box-input"
                            name="includes"
                            value={data.includes}
                            onChange={e => updateData('includes', e.target.value)}
                            placeholder="Una lista de cosas que incluye el curso"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="temario" className="label-input">Temario del curso</label>
                        <textarea 
                            className="box-input"
                            name="temario"
                            value={data.temario}
                            onChange={e => updateData('temario', e.target.value)}
                            placeholder="El que incluye el curso"
                            ></textarea>
                    </div>
                </div>
                
                <div className="col">
                    <TextInput 
                        label="Título del curso"
                        getVal={data.courseName}
                        setVal={value => updateData('courseName', value)}
                        require
                    />
                    <div className="form-group">
                        <label htmlFor="includes" className="label-input">Descripción general del curso</label>
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
                    <div className="form-group">
                        {/* <DateInput 
                            label="Fecha de inicio"
                            value={data.startDate}
                            setVal={value => updateData('startDate', value)}
                        /> */}
                        <label htmlFor="startDate" className="label-input">Fecha de inicio</label>
                        <input
                            name="startDate"
                            className='date-input'
                            value={data.startDate}
                            type='date'
                            onChange={(e) => updateData('startDate', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        {/* <DateInput 
                            label="Fecha de finalización"
                            value={data.endDate}
                            setVal={value => updateData('endDate', value)}
                        /> */}
                        <label htmlFor="endDate" className="label-input">Fecha de finalización</label>
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
                    <div className="form-group">
                        <label htmlFor="objective" className="label-input">Objetivos del curso</label>
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
