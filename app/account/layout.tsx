export default function AccountLayout({ children }: { children: any }) {
  return (
    <main className="flex flex-col gap-2 items-center w-9/12 ml-auto mr-auto max-sm:w-11/12">
      <h1 className="font-heading text-center text-8xl max-sm:text-7xl max-xs:text-6xl">
        Account
      </h1>
    </main>
  );
}
