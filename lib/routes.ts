type Route = {
  name: string;
  path: string;
  signedIn: boolean;
  admin: boolean;
  signedOut: boolean;
  inNav: boolean;
};

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    signedIn: true,
    admin: true,
    signedOut: true,
    inNav: true,
  },
  {
    name: "About",
    path: "/about",
    signedIn: true,
    admin: true,
    signedOut: true,
    inNav: true,
  },
  {
    name: "Resources",
    path: "/resources",
    signedIn: true,
    admin: true,
    signedOut: true,
    inNav: true,
  },
  {
    name: "Hackathon",
    path: "/hackathon",
    signedIn: true,
    admin: true,
    signedOut: true,
    inNav: true,
  },
  {
    name: "Example Projects",
    path: "/hackathon/examples",
    signedIn: true,
    admin: true,
    signedOut: true,
    inNav: false,
  },
  {
    name: "Account",
    path: "/account",
    signedIn: true,
    admin: true,
    signedOut: false,
    inNav: true,
  },
];

export default routes;
