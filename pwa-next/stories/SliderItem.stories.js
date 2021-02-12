import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/react/types-6-0';
import SliderItem from './SliderItem'

export default {
  title: 'SliderItem',
  component: SliderItem,
  
} ;

const Template = (args) => <SliderItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  
};
