import React from 'react';
import { useSelector } from 'react-redux';

const ContentsCardForm = () => {
    const { singleArticle } = useSelector((state) => state.article);
    
    return (
        <div>ContentsCardForm</div>
    );
};

export default ContentsCardForm;