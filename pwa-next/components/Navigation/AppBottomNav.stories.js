import React from 'react';
import Rtl from '../../common/Rtl';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import AppBottomNav from './AppBottomNav';
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
