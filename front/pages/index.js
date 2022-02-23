import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import HomeCardForm from '../components/HomeCardForm';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const Home = () => {
    const { postCategories } = useSelector((state) => state.post);
    return (
        <Fragment>
            <Tabs tabPosition='top' size='default' type='line'>
                {postCategories.map((category, _) => {
                    return (<TabPane key={category.value} tab={`${category.label}`}>
                                <HomeCardForm keyword={`${category.label}`}/>
                            </TabPane>)
                })}
            </Tabs>
        </Fragment>
    );
};

export default Home;