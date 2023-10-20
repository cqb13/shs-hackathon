type Route = {
    name: string;
    path: string;
    signedIn: boolean;
    signedOut: boolean;
  };
  
  const routes: Route[] = [
    {
      name: "Home",
      path: "/",
      signedIn: true,
      signedOut: true,
    },
    {
      name: "About",
      path: "/about",
      signedIn: true,
      signedOut: true,
    },
    {
      name: "Resources",
      path: "/resources",
      signedIn: true,
      signedOut: true,
    },
  ];
  
  export default routes;