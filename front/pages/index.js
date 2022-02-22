import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import HomeCardForm from '../components/HomeCardForm';

const { TabPane } = Tabs;

const Home = () => {

    return (
        <Fragment>
            <Tabs tabPosition='top' size='default' type='line'>
                {new Array(10).fill(null).map((_, index) => {
                    const key = index + 1;
                    return (<TabPane key={key} tab={`#keyword_${key}`}>
                                <HomeCardForm keyword={`#keyword_${key}`}/>
                            </TabPane>)
                })}
            </Tabs>
        </Fragment>
    );
};

export default Home;