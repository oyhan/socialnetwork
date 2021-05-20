import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import HomePosts from './HomePosts'
import RTL from '../../common/Rtl';
export default {
    title: 'HomePosts',
    component: HomePosts,

};

const Template = (args) => (
    <RTL>
        <HomePosts {...args} />

    </RTL>
);

export const Primary = Template.bind({});
Primary.args = {

};
