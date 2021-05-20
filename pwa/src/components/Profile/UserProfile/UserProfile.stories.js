import React from 'react';
import RTL from '../../../common/Rtl';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import UserProfile from './UserProfile';
export default {
  title: 'UserProfile',
  component: UserProfile,

};

const Template = (args) => (
  <RTL>
    <UserProfile {...args} />
  </RTL>
);

export const Primary = Template.bind({});
Primary.args = {

};
