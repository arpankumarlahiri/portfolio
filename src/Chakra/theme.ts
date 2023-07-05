import { extendTheme } from "@chakra-ui/react";
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';

import {Button} from './button';

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3C00",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
    // Input, // not working for some reason - come back to this
  },
});


/**
 * 
For a Japanese samurai-themed Reddit-like website, you can use a color palette inspired by traditional Japanese aesthetics and the essence of samurai culture. Here's a suggested color palette:

Deep Indigo: #191970
This rich, dark blue color represents the depth and mystery associated with samurai culture. It also symbolizes loyalty and honor.


Vermilion Red: #FF2400
Vermilion red is a vibrant shade commonly used in traditional Japanese artwork and represents passion, strength, and vitality.


Bamboo Green: #7BA05B
This fresh, natural green color represents nature, growth, and harmony. It also reflects the importance of balance and tranquility in samurai philosophy.


Golden Yellow: #FFD700
Gold has long been associated with wealth and prosperity in Japanese culture. This warm, radiant yellow color represents honor, wisdom, and achievement.


Ivory White: #FFFFF0
Ivory white is a soft, creamy color reminiscent of traditional Japanese paper (washi). It signifies purity, simplicity, and elegance.


Charcoal Black: #333333
Charcoal black adds depth and contrast to the color palette. It represents strength, discipline, and the stoic nature of the samurai.


These colors can be used for various elements of the website, such as the background, headers, buttons, and accents. Remember to use them in a way that provides good readability and visual harmony.
 */