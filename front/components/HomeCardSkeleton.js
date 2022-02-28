import React from 'react';
import PropTypes from 'prop-types';
import { Card, Skeleton } from 'antd';
import shortId from 'shortid';

const HomeCardSkeleton = ( { number }) => {
    return (
        Array(number).fill().map(() => {
            return (
                <Card className='home-card-form' key={shortId.generate()}>
                    <Skeleton active />
                </Card>
            )
        })
    );
};

HomeCardSkeleton.propTypes = {
    number: PropTypes.number.isRequired,
};

export default HomeCardSkeleton;