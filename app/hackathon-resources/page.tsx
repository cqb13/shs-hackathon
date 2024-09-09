"use client";
//TODO: make this editable and hideable by admins
export default function HackathonResources() {
  return (
    <main className="flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5">
      <h2 className="text-onyx-200 font-unica-one text-5xl">
        Welcome to the 6th Annual SHS Hackathon!
      </h2>
      <h3 className="text-onyx-200 font-unica-one text-4xl" id="part-1">
        Theme: AI for Social Good
      </h3>
      <article className="font-space-mono text-xl text-neutral-700">
        AI for Social Good represents the application of artificial intelligence
        technologies to address and solve societal challenges such as, enhancing
        human well-being, promoting equity, and protecting the environment
        through innovative, ethical, and sustainable solutions.
      </article>
      <div className="flex gap-2">
        <button
          onClick={() =>
            window.open(
              "https://docs.google.com/presentation/d/1nlsooeK3z3J6DPyLEgatEinUvGxJ2TDhnXSIJfM-kWQ/edit?usp=sharing",
            )
          }
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
        >
          View Example Submission Slideshow
        </button>
        <button
          onClick={() =>
            window.open(
              "https://docs.google.com/presentation/u/1/d/1nlsooeK3z3J6DPyLEgatEinUvGxJ2TDhnXSIJfM-kWQ/copy",
            )
          }
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
        >
          Copy Example Submission Slideshow
        </button>
      </div>
      <button
        onClick={() =>
          window.open(
            "https://docs.google.com/document/d/1wI1Qlt9P7y_m0V-uG2zqXayPIb2TMoB1QxW0N0Oozvs/edit?usp=sharing",
          )
        }
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Rubric
      </button>
      <button
        onClick={() => window.open("https://forms.gle/7UukzP6iR6a6SMdj9")}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Submit Final Project
      </button>
      <button
        onClick={() => window.open("https://forms.gle/mywogpSFRBDEZZzs5")}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Feedback Form
      </button>
      <div>
        <h3 className="text-onyx-200 font-unica-one text-4xl" id="part-2">
          WiFi Information
        </h3>
        <div className="font-space-mono text-xl text-neutral-700">
          <p>Network Name: SHS Guest</p>
          <p>Password: Summer22</p>
        </div>
      </div>
    </main>
  );
}
