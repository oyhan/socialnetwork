import React from 'react';
import RTL from '../../common/Rtl';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import FollowerItem from './FollowerItem'
export default {
    title: 'FollowerItem',
    component: FollowerItem,

};

const Template = (args) => (
    <RTL>
        <FollowerItem {...args} />
    </RTL>
);

export const Primary = Template.bind({});
Primary.args = {

};
