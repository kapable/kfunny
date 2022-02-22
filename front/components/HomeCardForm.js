import React, { Fragment } from 'react';
import { Card } from 'antd';

const HomeCardForm = ({ keyword }) => {

    return (
        <Fragment>
            {new Array(10).fill(null).map((_, index) => {
                const key = index + 1;
                return (
                    <Card className='home-card-form' key={key+keyword} title={`#title_${keyword}`}>
                        <p>{`#contents_${keyword}`}</p>
                    </Card>
                );
            })}
        </Fragment>
    );
};

export default HomeCardForm;