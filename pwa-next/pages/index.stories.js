import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import Home from './index'
import Rtl from '../common/Rtl'
import BaseLayout from '../common/BaseLayout';
export default {
  title: 'Home',
  component: Home,

};

const Template = (args) => <Rtl>
  <BaseLayout>
    <Home {...args} />
  </BaseLayout>
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
