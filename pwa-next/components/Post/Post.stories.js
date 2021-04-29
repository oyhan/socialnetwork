import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import Post from './Post'
import RTL from '../../common/Rtl';
export default {
  title: 'Post',
  component: Post,

};

const Template = (args) => (
  <Post {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userName : "نام نمایشی1",
  month :"ماه",
  year:"سال",
  placeName : "لوکیشن",
  text : "توضیحات",
  likes : 150,
  medias:[{url:"https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg"},
  {url:"https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"}]
};
