export default function Examples() {
  return (
    <main className="flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5 bg-white">
      <section className="grid grid-cols-3 gap-2">
        <div className="flex flex-col justify-between h-60 rounded-lg bg-onyx p-2 text-white">
          <div>
            <h2 className="text-xl font-body">Urban Climate Resiliency</h2>
            <p>By: Apurva Varigonda</p>
          </div>
          <div className="flex gap-2 justify-between">
            <a
              href="https://github.com/avarigonda24/Urban-Climate-Resiliency"
              target="_blank"
              className="text-fairy_tale hover:text-fairy_tale-400 transition-all"
            >
              View Code
            </a>
            <a
              href="https://docs.google.com/presentation/d/14hc2954oAkexIbY4lKgY1c7SreZ3AaOBwoq10luw06o/edit?usp=sharing"
              target="_blank"
              className="text-fairy_tale hover:text-fairy_tale-400 transition-all"
            >
              Final Slideshow
            </a>
            <a
              href="https://avarigonda24.github.io/Urban-Climate-Resiliency/index.html"
              target="_blank"
              className="text-fairy_tale hover:text-fairy_tale-400 transition-all"
            >
              Website
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
