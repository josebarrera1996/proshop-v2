import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    // Obtiene la función de navegació
    const navigate = useNavigate();
    // Obtiene el parámetro de URL 'keyword'
    const { keyword: urlKeyword } = useParams();
    // Estado local para almacenar la palabra clave de búsqueda
    const [keyword, setKeyword] = useState(urlKeyword || '');

    // Función para manejar el envío del formulario de búsqueda
    const submitHandler = (e) => {
        e.preventDefault();
        // Navega a la ruta de búsqueda con la palabra clave si está presente; de lo contrario, navega a la página de inicio
        if (keyword) {
            setKeyword('');
            navigate(`/search/${keyword.trim()}`);
        } else {
            navigate('/');
        }
    };

    // Componente de formulario de búsqueda
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-light' className='p-2 mx-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
