import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import AppBottomNav from './AppBottomNav'
import Rtl from '../../common/Rtl'
export default {
  title: 'AppBottomNav',
  component: AppBottomNav,

};

const Template = (args) => <Rtl>
  <AppBottomNav {...args} />
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
