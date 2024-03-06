export type Sponsor = {
  name: string;
  image: string;
  link: string;
};

const sponsors: Sponsor[] = [
  {
    name: "BJ's",
    image:
      "https://seeklogo.com/images/B/bj-s-logo-25AB362B50-seeklogo.com.png",
    link: "https://www.bjs.com/"
  },
  {
    name: "Stop & Shop",
    image: "https://assets.stickpng.com/images/609a5c64e23929000482a85a.png",
    link: "https://stopandshop.com/"
  },
  {
    name: "Shaws",
    image: "https://assets.stickpng.com/thumbs/62fe5219f31142d937b30c5e.png",
    link: "https://www.shaws.com/"
  },
  {
    name: "Wegmans",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/WegmansLogo.svg/2560px-WegmansLogo.svg.png",
    link: "https://www.wegmans.com/"
  },
  {
    name: "Big Y",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Big_Y_logo.svg/800px-Big_Y_logo.svg.png",
    link: "https://www.bigy.com/"
  }
];

export default sponsors;
