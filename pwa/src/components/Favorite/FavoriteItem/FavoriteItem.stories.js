import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import FavoriteItem from './FavoriteItem'
import Rtl from '../../../common/Rtl'
export default {
  title: 'FavoriteItem',
  component: FavoriteItem,

};

const Template = (args) => <Rtl>
  <FavoriteItem {...args} />
</Rtl>;

export const Primary = Template.bind({});
Primary.args = {
  title: "کافه پناهنده",
  image: "",
  rate: 4,
  commentsCount: 10,
  distance: 4,
  placeType: "ایرانی،آفریقایی"
};
