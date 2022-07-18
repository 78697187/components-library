import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Carousel from "./Carouselcopy";

const list = [
  { url: 'http://p1.music.126.net/IXb-PeUMyeFDA1KHQraF4Q==/109951167605258627.jpg'},
  { url: 'http://p1.music.126.net/Lju50bXS-hKojXULndnzew==/109951167605266134.jpg'},
  { url: 'http://p1.music.126.net/oDweleFdUs69qYbV1vFvOA==/109951167604823899.jpg'},
  { url: 'http://p1.music.126.net/tSI5IA4Q4oB0nN2voDObfA==/109951167605477857.jpg'},
];

export default {
  title: 'Carousel',
  component: Carousel,
  argTypes: {
  }
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (<div style={{"width": "550px", "height": "224"}}><Carousel {...args}></Carousel></div>)

export const DefaultCarousel = Template.bind({});

DefaultCarousel.args = {
  list: list,
}