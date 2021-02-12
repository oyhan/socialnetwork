import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import AppBar from './AppBar'
import Rtl from '../../common/Rtl'
export default {
  title: 'AppBar',
  component: AppBar,

};

const Template = (args) => <Rtl>
  <AppBar {...args} />
</Rtl>;

export const Primary = Template.bind({});
Primary.args = {
  title: "کافه پناهنده",
  image: "",
  rate: 4,
  ratesCount: 10,
  distance: 4,
  favorite: true
};
