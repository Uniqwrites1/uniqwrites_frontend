import { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Play, Search, Sparkles } from "lucide-react";

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
    title: "StoryWeaver",
    provider: "Pratham Books",
    description: "Thousands of open-access, illustrated multilingual children's storybooks for early readers, ESL learners, and classroom use.",
    url: "https://storyweaver.org.in/",
    level: "Early readers and primary learners",
    access: "Free reading library · open access",
    image: "https://storyweaver.org.in/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "Quill.org",
    provider: "Quill",
    description: "Interactive writing, grammar, and sentence-building practice with instant feedback to support better writing mechanics.",
    url: "https://www.quill.org/",
    level: "Middle and high school",
    access: "Free writing practice · usage varies by tool",
    image: "https://www.quill.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "OER Project",
    provider: "OER Project",
    description: "Standards-aligned history and social studies curriculum with engaging lessons, readings, and teacher supports.",
    url: "https://www.oerproject.com/",
    level: "Middle and high school",
    access: "Free curriculum resources",
    image: "https://www.oerproject.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "PBS LearningMedia",
    provider: "PBS",
    description: "Classroom-ready videos, lesson plans, and interactive tools spanning history, science, and the arts.",
    url: "https://www.pbslearningmedia.org/",
    level: "K–12 educators and learners",
    access: "Free media and lesson resources",
    image: "https://www.pbslearningmedia.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Science"],
  },
  {
    title: "MERLOT",
    provider: "California State University",
    description: "A curated digital library with peer-reviewed learning materials, simulations, modules, and open textbooks.",
    url: "https://www.merlot.org/",
    level: "Secondary and higher education",
    access: "Free resource directory",
    image: "https://www.merlot.org/merlot/images/merlot-logo.png",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Textbooks"],
  },
  {
    title: "Curriki",
    provider: "Curriki",
    description: "Open educational resources and interactive content-authoring tools for educators building custom learning pathways.",
    url: "https://www.curriki.org/",
    level: "K–12 and educator design",
    access: "Open resources and teacher tools",
    image: "https://www.curriki.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "Starfall",
    provider: "Starfall Education",
    description: "Interactive phonics, reading, and basic math games designed for early childhood and lower primary learners.",
    url: "https://www.starfall.com/",
    level: "Early childhood and lower primary",
    access: "Free learning activities",
    image: "https://www.starfall.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "Google Read Along",
    provider: "Google",
    description: "A speech-based reading practice tool that helps children build fluency and confidence through guided reading support.",
    url: "https://readalong.google.com/",
    level: "Early readers and primary learners",
    access: "Free reading support tool",
    image: "https://readalong.google.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "Oxford Owl",
    provider: "Oxford University Press",
    description: "Free eBooks, phonics support, and early reading resources for young learners and their teachers.",
    url: "https://www.oxfordowl.co.uk/",
    level: "Early years and primary",
    access: "Free reading and phonics resources",
    image: "https://www.oxfordowl.co.uk/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Literacy"],
  },
  {
    title: "Codecademy",
    provider: "Codecademy",
    description: "Interactive lessons in Python, HTML/CSS, JavaScript, and data science suited to senior secondary learners.",
    url: "https://www.codecademy.com/",
    level: "Senior secondary learners",
    access: "Free tier available",
    image: "https://www.codecademy.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers", "Science"],
  },
  {
    title: "Anki",
    provider: "Anki",
    description: "Flashcard-based study tools using spaced repetition to help learners prepare for exams and remember core concepts.",
    url: "https://apps.ankiweb.net/",
    level: "All school learners",
    access: "Free study software",
    image: "https://apps.ankiweb.net/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "Quizlet",
    provider: "Quizlet",
    description: "Study sets, flashcards, and practice tools for vocabulary, formulas, and key subject revision.",
    url: "https://quizlet.com/",
    level: "School learners",
    access: "Free study sets available",
    image: "https://quizlet.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "Photomath",
    provider: "Photomath",
    description: "Step-by-step explanations of algebra, geometry, and calculus problems to support independent learning.",
    url: "https://photomath.com/",
    level: "School learners",
    access: "Free tools available",
    image: "https://photomath.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "Maths"],
  },
  {
    title: "Microsoft Math Solver",
    provider: "Microsoft",
    description: "Visual step-by-step math problem solving for algebra, geometry, and other core learning areas.",
    url: "https://mathsolver.microsoft.com/",
    level: "School learners",
    access: "Free math support tool",
    image: "https://mathsolver.microsoft.com/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "Maths"],
  },
  {
    title: "Coursera / edX (Audit mode)",
    provider: "Coursera and edX",
    description: "Access thousands of university-level lectures and course materials from global institutions without paying for certificates.",
    url: "https://www.coursera.org/",
    level: "Higher education and independent learners",
    access: "Free audit access available",
    image: "https://www.coursera.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "freeCodeCamp",
    provider: "freeCodeCamp",
    description: "A comprehensive, self-paced curriculum in software development, web design, and practical projects.",
    url: "https://www.freecodecamp.org/",
    level: "Beginner to intermediate learners",
    access: "Fully free curriculum",
    image: "https://www.freecodecamp.org/favicon.ico",
    imageFit: "contain",
    categories: ["For learners", "For teachers"],
  },
  {
    title: "Canva for Education",
    provider: "Canva",
    description: "Free premium access for verified K–12 teachers to create slides, worksheets, infographics, and lesson plans.",
    url: "https://www.canva.com/education/",
    level: "Teachers and lesson designers",
    access: "Free for verified educators",
    image: "https://www.canva.com/favicon.ico",
    imageFit: "contain",
    categories: ["For teachers"],
  },
  {
    title: "PhET Teacher Resources",
    provider: "University of Colorado Boulder",
    description: "Teacher guides, classroom activity sheets, and lesson ideas built to support interactive STEM learning.",
    url: "https://phet.colorado.edu/en/teacher_ideas",
    level: "K–12 educators",
    access: "Free teacher resources",
    image: "https://phet.colorado.edu/favicon.ico",
    imageFit: "contain",
    categories: ["For teachers", "Science"],
  },
];

const simulationUrl =
  "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/" +
  "forces-and-motion-basics_all.html";
const simulationPreviewUrl =
  "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/" +
  "forces-and-motion-basics-900.png";

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
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-6 lg:py-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#9A7200]">Learn and explore</p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-[#111111] sm:text-5xl">Free learning resources</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5F5F5F] sm:text-lg">
              Stories, textbooks, practice, and interactive lessons for curious learners and educators.
            </p>
            <a href="#interactive-lesson" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#F5B800] px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F7C82E]">
              Try an interactive lesson <ArrowRight size={17} />
            </a>
          </div>
          <a href="#interactive-lesson" className="group relative block aspect-video overflow-hidden rounded-lg border border-black/10 bg-[#222222] shadow-[0_18px_40px_rgba(17,17,17,0.14)]">
            <img
              src={simulationPreviewUrl}
              alt="PhET Forces and Motion simulation preview showing interactive objects and force controls"
              width={900}
              height={506}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-[#111111]/85 px-4 py-3 text-sm font-semibold text-white sm:px-5">
              Featured interactive lesson <span className="font-normal text-white/75">· Forces and Motion</span>
            </span>
          </a>
        </div>
      </section>

      <section id="interactive-lesson" className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-6 lg:py-14">
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

        <div className="aspect-video overflow-hidden rounded-lg border border-black/10 bg-[#222222] shadow-[0_16px_40px_rgba(17,17,17,0.10)]">
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
            <button
              type="button"
              onClick={() => setShowSimulation(true)}
              aria-label="Start the PhET Forces and Motion: Basics simulation"
              className="group relative block h-full w-full overflow-hidden text-left"
            >
              <img
                src={simulationPreviewUrl}
                alt="Preview of the Forces and Motion: Basics simulation"
                width={900}
                height={506}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/15 text-white transition-colors group-hover:bg-black/30">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5B800] text-[#111111] shadow-lg">
                  <Play size={26} fill="currentColor" />
                </span>
                <span className="rounded-full bg-black/75 px-4 py-2 text-sm font-semibold">Start interactive simulation</span>
              </span>
            </button>
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

      <section id="resource-library" className="border-y border-black/10 bg-[#F7F7F5]">
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
              <article key={resource.title} className="flex min-h-[19rem] flex-col overflow-hidden border border-black/10 bg-white">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${resource.title} in a new tab`}
                  className="group relative block aspect-[16/9] overflow-hidden bg-[#E9ECE7]"
                >
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#E9ECE7] px-4 text-center text-[#4D554A]">
                    <BookOpen size={28} aria-hidden="true" />
                    <span className="text-sm font-semibold">{resource.title}</span>
                  </span>
                  <img
                    src={resource.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${resource.imageFit === "cover" ? "object-cover" : "object-contain p-6"}`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-[#111111]/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    {resource.provider}
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-4">
                  <span className="w-fit rounded-sm bg-[#F5B800]/20 px-2 py-1 text-[10px] font-medium leading-4 text-[#654B00]">{resource.access}</span>
                  <h3 className="mt-2 text-lg font-semibold text-[#111111]">{resource.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-5 text-[#5F5F5F]">{resource.description}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3">
                    <span className="text-[11px] text-[#666666]">{resource.level}</span>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#111111] hover:text-[#8A6500]">
                      Visit <ArrowUpRight size={15} />
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