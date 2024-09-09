type Route = {
  name: string;
  path: string;
  signedIn: boolean;
  admin: boolean;
  signedOut: boolean;
};

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    signedIn: true,
    admin: true,
    signedOut: true,
  },
  {
    name: "About",
    path: "/about",
    signedIn: true,
    admin: true,
    signedOut: true,
  },
  {
    name: "Resources",
    path: "/resources",
    signedIn: true,
    admin: true,
    signedOut: true,
  },
  {
    name: "Account",
    path: "/account",
    signedIn: true,
    admin: true,
    signedOut: false,
  },
  //{
  //  name: "Hackathon Resources",
  //  path: "/hackathon-resources",
  //  signedIn: true,
  //  admin: true,
  //  signedOut: true,
  //},
];

export default routes;
