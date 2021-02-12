import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import SliderItem from './SliderItem'
import Rtl from '../../../common/Rtl'
export default {
  title: 'SliderItem',
  component: SliderItem,

};

const Template = (args) => <Rtl>
  <SliderItem {...args} />
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
