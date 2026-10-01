import { useState } from "react";
import { ArrowUpRight, BookOpen, GraduationCap, Search, Sparkles } from "lucide-react";

const categories = ["All", "For learners", "For teachers", "Literacy", "Maths", "Science", "Textbooks"] as const;
type Category = Exclude<(typeof categories)[number], "All">;

const resources: {
  title: string;
  provider: string;
  description: string;
  url: string;
  level: string;
  access: string;
  image: string;
  imageFit: "cover" | "contain";
  categories: Category[];
}[] = [
  {
    title: "African Storybook",
    provider: "Saide",
    description: "Illustrated stories for children in African languages. Read online, download stories, or find guidance for using them with learners.",
    url: "https://www.africanstorybook.org/",
    level: "Early years and primary",
    access: "Openly licensed · CC BY 4.0",
    image: "https://www.africanstorybook.org/images/asb120.png",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "Siyavula open textbooks",
    provider: "Siyavula",
    description: "Online Mathematics and Science textbooks, with downloadable formats and teacher guides. Check the book's curriculum and licence before adapting it.",
    url: "https://www.siyavula.com/read",
    level: "Primary and secondary",
    access: "Open textbooks · licence varies by edition",
    image: "https://www.siyavula.com/static/common/files/books/maths-10.jpg",
    imageFit: "cover",
    categories: ["For learners", "For teachers", "Maths", "Science", "Textbooks"],
  },
  {
    title: "OpenStax textbooks",
    provider: "Rice University",
    description: "Peer-reviewed, openly licensed textbooks across Mathematics, Science, and other subjects. Most titles are aimed at senior secondary or higher education.",
    url: "https://openstax.org/subjects",
    level: "Senior secondary and higher education",
    access: "Openly licensed · check each book's terms",
    image: "https://openstax.org/dist/images/logo.svg",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Maths", "Science", "Textbooks"],
  },
  {
    title: "Khan Academy",
    provider: "Khan Academy",
    description: "Free lessons, practice exercises, and mastery courses covering Mathematics, Science, reading, and more.",
    url: "https://www.khanacademy.org/",
    level: "School through early college",
    access: "Free learning platform",
    image: "https://www.khanacademy.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "Literacy", "Maths", "Science"],
  },
  {
    title: "CK-12",
    provider: "CK-12 Foundation",
    description: "Free digital textbooks, practice, and interactive learning materials, especially for Mathematics and Science.",
    url: "https://www.ck12.org/student/",
    level: "Primary and secondary",
    access: "Free learning platform · see content terms",
    image: "https://www.ck12.org/favicon.png",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Maths", "Science", "Textbooks"],
  },
  {
    title: "GeoGebra",
    provider: "GeoGebra",
    description: "Interactive Mathematics resources and free calculators for exploring topics such as number sense, algebra, geometry, and statistics.",
    url: "https://www.geogebra.org/math",
    level: "Grades 4–12 and beyond",
    access: "Free tools and activities · check reuse terms",
    image: "https://www.geogebra.org/sp-assets/assets/images/hero-images/HeroImageMedium1x.70504de9.webp",
    imageFit: "cover",
    categories: ["For learners", "For teachers", "Maths"],
  },
  {
    title: "NASA STEM resources",
    provider: "NASA",
    description: "Search activities, interactive features, videos, and learning guides connected to space, science, and engineering.",
    url: "https://www.nasa.gov/learning-resources/search/",
    level: "School learners and educators",
    access: "Free resources · usage terms vary",
    image: "https://www.nasa.gov/wp-content/uploads/2023/01/52804859902-0517e836e9-k.jpg?resize=768,512",
    imageFit: "cover",
    categories: ["For learners", "For teachers", "Science"],
  },
  {
    title: "OER Commons",
    provider: "ISKME",
    description: "Search a public digital library of open educational resources and collections; topics, levels, and licenses vary by item.",
    url: "https://www.oercommons.org/oer",
    level: "All levels · resource dependent",
    access: "Open library · check each item's license",
    image: "https://www.oercommons.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy", "Maths", "Science", "Textbooks"],
  },
  {
    title: "LearnEnglish Kids",
    provider: "British Council",
    description: "Free English stories, songs, games, listening and reading practice, plus printable activities for children and support for parents.",
    url: "https://learnenglishkids.britishcouncil.org/",
    level: "Children learning English",
    access: "Free activities · reuse terms vary",
    image: "https://learnenglishkids.britishcouncil.org/sites/kids/files/styles/homepage_promotion/public/2022-07/songs-hello-hello-hello.png?itok=87Agb8cN",
    imageFit: "cover",
    categories: ["For learners", "Literacy"],
  },
  {
    title: "TeachEngineering",
    provider: "University of Colorado Boulder and partners",
    description: "Peer-reviewed K–12 engineering lessons and hands-on STEM activities with materials lists and classroom guidance.",
    url: "https://www.teachengineering.org/curriculum-search",
    level: "K–12 educators and learners",
    access: "Free curriculum · adapt to local standards",
    image: "https://www.teachengineering.org/logos/TE_Web_1Line_Rev_Color.svg",
    imageFit: "contain",
    categories: ["For teachers", "Science"],
  },
  {
    title: "MIT OpenCourseWare",
    provider: "Massachusetts Institute of Technology",
    description: "Free course materials from across MIT, including lecture notes, exams, and videos for independent study and teaching.",
    url: "https://ocw.mit.edu/",
    level: "Independent learners · mostly higher education",
    access: "Free course materials · terms vary by course",
    image: "https://ocw.mit.edu/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Maths", "Science", "Textbooks"],
  },
];

const simulationUrl =
  "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/" +
  "forces-and-motion-basics_all.html";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSimulation, setShowSimulation] = useState(false);

  const visibleResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "All" || resource.categories.includes(activeCategory);
    const searchableText = `${resource.title} ${resource.provider} ${resource.description} ${resource.level} ${resource.categories.join(" ")}`.toLowerCase();
    return matchesCategory && searchableText.includes(searchTerm.trim().toLowerCase());
  });

  return (
    <main className="min-h-screen bg-white text-[#1F1F1F]">
      <section className="border-b border-black/10 bg-[#F7F7F5]">
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#9A7200]">Learn and explore</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#111111] sm:text-5xl">Free learning resources</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F5F5F] sm:text-lg">
            A curated collection of stories, textbooks, practice, and interactive lessons from trusted education providers.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-6 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#9A7200]">
            <Sparkles size={16} /> Interactive lesson
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#111111] sm:text-3xl">Explore forces and motion</h2>
          <p className="mt-4 max-w-lg leading-7 text-[#5F5F5F]">
            Experiment with pushes, friction, and acceleration in this free simulation from PhET at the University of Colorado Boulder.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSimulation((visible) => !visible)}
              aria-expanded={showSimulation}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#F5B800] px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F7C82E]"
            >
              {showSimulation ? "Close simulation" : "Load interactive simulation"}
            </button>
            <a href={simulationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#111111] underline decoration-[#B98A00] underline-offset-4 hover:text-[#8A6500]">
              Open in a new tab <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#666666]">The simulation loads from PhET only when you choose to open it.</p>
        </div>

        <div className="min-h-[260px] overflow-hidden rounded-lg border border-black/10 bg-[#F7F7F5] sm:min-h-[360px]">
          {showSimulation ? (
            <iframe
              title="PhET Forces and Motion: Basics interactive simulation"
              src={simulationUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="aspect-video w-full"
            />
          ) : (
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[360px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B800]/20 text-[#8A6500]">
                <GraduationCap size={32} />
              </div>
              <p className="mt-4 text-lg font-semibold text-[#111111]">A hands-on science activity</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#5F5F5F]">Choose “Load interactive simulation” to start exploring four motion experiments.</p>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="literacy-playlist-heading" className="border-y border-black/10 bg-[#FFF8E5]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-6 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8A6500]">Created by Uniqwrites</p>
            <h2 id="literacy-playlist-heading" className="mt-2 text-2xl font-semibold text-[#111111] sm:text-3xl">
              Literacy learning playlist
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-[#5F5F5F]">
              Watch the Uniqwrites literacy video playlist, created to support reading and learning.
            </p>
            <a
              href="https://www.youtube.com/playlist?list=PLhHojxQXroe1H7vdoimd6Fza-N0f8klRo"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#111111] underline decoration-[#B98A00] underline-offset-4 hover:text-[#8A6500]"
            >
              Open playlist on YouTube <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg border border-black/10 bg-black shadow-[0_16px_40px_rgba(17,17,17,0.12)]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/videoseries?list=PLhHojxQXroe1H7vdoimd6Fza-N0f8klRo"
              title="Uniqwrites literacy learning playlist"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#F7F7F5]">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-6 lg:py-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9A7200]">Resource library</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#111111] sm:text-3xl">Find your next lesson</h2>
            </div>
            <label className="flex min-h-11 w-full items-center gap-3 rounded-md border border-black/15 bg-white px-3 md:max-w-sm">
              <Search size={18} className="shrink-0 text-[#666666]" />
              <span className="sr-only">Search resources</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search subjects or providers"
                className="w-full bg-transparent py-2 text-sm text-[#111111] outline-none placeholder:text-[#777777]"
              />
            </label>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Filter resources by subject">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category ? "border-[#111111] bg-[#111111] text-white" : "border-black/15 bg-white text-[#333333] hover:border-black/40"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleResources.map((resource) => (
              <article key={resource.title} className="flex min-h-80 flex-col overflow-hidden border border-black/10 bg-white">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${resource.title} in a new tab`}
                  className="group relative block aspect-[16/9] overflow-hidden bg-[#E9ECE7]"
                >
                  <img
                    src={resource.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${resource.imageFit === "cover" ? "object-cover" : "object-contain p-8"}`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-[#111111]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {resource.provider}
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-sm bg-[#F5B800]/20 px-2 py-1 text-xs font-medium leading-5 text-[#654B00]">{resource.access}</span>
                <h3 className="mt-1 text-xl font-semibold text-[#111111]">{resource.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#5F5F5F]">{resource.description}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
                  <span className="text-xs text-[#666666]">{resource.level}</span>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#111111] hover:text-[#8A6500]">
                    Visit resource <ArrowUpRight size={16} />
                  </a>
                </div>
                </div>
              </article>
            ))}
          </div>

          {visibleResources.length === 0 && (
            <p className="mt-8 border-t border-black/10 py-8 text-center text-sm text-[#5F5F5F]">No resources match that search. Try another subject or provider.</p>
          )}

          <div className="mt-8 flex items-start gap-3 border-t border-black/10 pt-5 text-xs leading-5 text-[#666666]">
            <BookOpen size={16} className="mt-0.5 shrink-0" />
            <p>Resources are provided by independent organizations. Free access does not always mean content is openly licensed; check each provider's terms before copying or adapting materials.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resources;