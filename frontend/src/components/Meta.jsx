import { Helmet } from 'react-helmet-async';

// Componente funcional Meta que define los metadatos de la página
const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            {/* Título de la página */}
            <title>{title}</title>
            {/* Descripción de la página */}
            <meta name='description' content={description} />
            {/* Palabras clave relacionadas con la página */}
            <meta name='keyword' content={keywords} />
        </Helmet>
    );
};

// Valores predeterminados para el título, descripción y palabras clave
Meta.defaultProps = {
    title: 'Welcome To ProShop',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
};

export default Meta;
