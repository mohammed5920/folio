import {
  ProjectBody,
  ProjectBullets,
  ProjectCaption,
  ProjectEpilogue,
  ProjectHeader,
  ProjectHero,
  ProjectParentheses,
  ProjectReference,
  ProjectSeparator,
} from "@/components/mbm/projectPage";
import { Metadata } from "next";
import Link from "next/link";
import { EasterCSR, EasterForm } from "./client";

const TITLE = "Building on the modern web";
const DESCRIPTION = "and whether the complexity is worth it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Alsun() {
  return (
    <>
      <ProjectHero
        title={TITLE}
        description={DESCRIPTION}
        git="https://github.com/mohammed5920/alsun"
        siteLink="https://alalsunacademy.org"
        thumbChild={
          <div className="h-full flex items-center justify-center bg-slate-100 rounded-2xl relative p-4 min-h-62">
            <div className="bg-slate-800 absolute inset-0 size-full z-0 mask-[url(https://m6nqhl3udl.ufs.sh/f/bemDMs9Bqza2dCMVhXIQiv4Ho2zOKhY7LtSCkgBanMNcl6AF)] mask-size-[360px] opacity-7" />
            <div className="text-center space-y-3 z-1">
              <p className="text-teal-600 font-serif tracking-tighter text-2xl sm:text-3xl font-extrabold">
                Level up{" "}
                <span className="text-slate-800">
                  your{" "}
                  <span className="font-mono text-xl sm:text-2xl bg-slate-200">
                    node_modules
                  </span>
                  .
                </span>
              </p>
              <p className="text-slate-800 font-serif tracking-tighter text-md text-balance leading-0">
                We offer certified{" "}
                <span className="font-mono bg-slate-200 text-sm">
                  JavaScript
                </span>{" "}
                to help you enhance your{" "}
                <span className="font-mono bg-slate-200 text-sm">
                  JavaScript
                </span>{" "}
                with{" "}
                <span className="font-mono bg-slate-200 text-sm">
                  even more JavaScript
                </span>
                .
              </p>
              <a
                href="#body"
                className="px-3 py-2 font-serif bg-teal-600 rounded-md text-white hover:bg-teal-700 transition-all tracking-tighter cursor-pointer text-md"
              >
                Go down the rabbit hole
              </a>
            </div>
          </div>
        }
      />

      <ProjectBody id="body">
        <ProjectHeader>About the project</ProjectHeader>
        <p>
          I was tasked with creating a draft CMS{" "}
          <ProjectParentheses>(content management system)</ProjectParentheses>{" "}
          for a local business. Their previous system consisted of a rigid
          templating engine that didn't fit their elastic needs, and took around{" "}
          <i>4 seconds</i> to render a new page.
        </p>
        <p>
          I knew I wanted to try something different. The new system had to be
          dynamic, quick to iterate on, and fast for the end-user. Because of
          their specific needs, I couldn't easily integrate an existing headless
          CMS solution, so I settled with writing my own.
        </p>
        <ProjectSeparator />
        <ProjectHeader>a history lesson</ProjectHeader>
        <EasterForm>
          <div className="w-full aspect-[5] bg-white rounded-2xl p-4 text-black font-serif-stock space-y-3">
            <p>Type your credentials to login</p>
            <div className="space-y-1">
              <div>
                Username:{" "}
                <input className="border-black border" type="text" required />
              </div>
              <div>
                Password:{" "}
                <input
                  className="border-black border"
                  type="password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="block border border-black p-1 bg-slate-50 cursor-pointer"
            >
              Login
            </button>
          </div>
        </EasterForm>
        <ProjectCaption>A simpler time.</ProjectCaption>
        <p>
          To understand what goes into a modern website, it's best to go back to
          the basics. At the start, browsers would render static markup sent by
          the server. It might have had <i>superficial</i> animations, but
          ultimately, once sent from the server, the content could not
          meaningfully change unless the client communicated back to the server
          either through a{" "}
          <span className="underline hover:text-white transition-colors cursor-pointer">
            link
          </span>
          , or through submitting a form{" "}
          <ProjectParentheses>(like the one above)</ProjectParentheses>. This
          meant the page would fully refresh, flashing white between
          transitions, waiting for a server to generate the full HTML for the
          page each time.
        </p>
        <p>
          The next revolution came with the browser being able to replace parts
          of the web page with new content <i>after</i> the page had already
          loaded. This allowed for websites to become dynamic, feeling less like
          "pages in a browser", and more like <strong>applications</strong>{" "}
          <ProjectParentheses>
            (Steve Jobs famously mentioned{" "}
            <ProjectReference href="https://en.wikipedia.org/wiki/Ajax_(programming)">
              AJAX
            </ProjectReference>{" "}
            as a feature in the first iPhone's version of Safari.)
          </ProjectParentheses>
          . This was the main way the web worked for a while, and is{" "}
          <ProjectReference href="https://htmx.org/">
            still popular
          </ProjectReference>{" "}
          in some circles to this day. For larger applications, however,
          imperatively poking at the page with AJAX became a bottleneck, and
          complexity quickly grew out of hand. Developers sought a way to
          separate UI <i>state</i> from UI <i>rendering</i>, deriving the latter
          from the former automatically through a <strong>declarative</strong>{" "}
          paradigm.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Moving to the client</ProjectHeader>
        <EasterCSR />
        <ProjectCaption>
          A visualisation of waterfalling, where one component fetches to figure
          out which component to render, which <strong>also</strong> fetches to
          figure out which of <strong>its</strong> children to render, which
          also fetches until...
        </ProjectCaption>
        <p>
          The next era of the web was the era of <i>client-side rendering.</i>{" "}
          The server sent a blank page, and a link for the browser to download a
          JavaScript framework that would take over and communicate with the
          server via JSON, turning serialised data into markup the browser could
          display to the user <i>declaratively</i>.
        </p>
        <p>
          It no longer felt like you were using a traditional "website".
          Navigation was instant. Transitions felt <strong>"app-like".</strong>{" "}
          It blurred the gap between native and web, allowing the browser to
          become an application platform as opposed to just a document viewer.
        </p>
        <p>
          At least, that was the <i>intention.</i> In practice, it was less than
          ideal for performance. The entire web infrastructure was optimised
          over decades for using HTTP{" "}
          <ProjectParentheses>
            (<strong>hyper-text</strong> transfer protocol)
          </ProjectParentheses>{" "}
          to send HTML{" "}
          <ProjectParentheses>
            (<strong>hyper-text</strong> markup language)
          </ProjectParentheses>
          . Client-side frameworks flipped this paradigm on its head. Browsers
          got blank pages from the server and needed to download and parse large
          JavaScript bundles before they could show the user something. State
          needed to be duplicated and sent asynchronously through a
          traditionally type-unsafe JSON layer, juggled and kept in sync by the
          frontend, and tracked and <i>diffed</i> accordingly to produce the
          correct HTML, entirely on the client.
        </p>{" "}
        <p>
          A common artefact of this process is <i>waterfalling</i> - as
          components decide they need to fetch before they can run before they
          mount their children, which decide they need to fetch <i>again</i>{" "}
          before they can mount their grandchildren - so on, so forth, sometimes
          going so far as 5+ layers deep - each one with a network round-trip.
        </p>
        <p>
          Client-side rendering is still preferred for highly dynamic
          applications{" "}
          <ProjectParentheses>
            (like{" "}
            <ProjectReference href="https://www.figma.com/">
              Figma
            </ProjectReference>
            )
          </ProjectParentheses>{" "}
          with lots of dynamic state that needs to live on / sync with the
          client, but for something like a content management system, most of
          our state lives in the server - resulting in more complexity just to
          duplicate work unnecessarily. Wouldn't it be nice if we had the best
          of both worlds?
        </p>
        <ProjectSeparator />
        <ProjectHeader>The best of Both Worlds</ProjectHeader>
        <p>
          The modern paradigm revolves around the concept of{" "}
          <i>progressive enhancement.</i> The server renders a static "shell" of
          your web page, with dynamic data fetched from the database, and sends
          it to the user as the first thing they receive when they visit. In the
          background, it silently downloads pieces of your framework of choice
          to <i>"hydrate"</i> the static shell, resulting in an experience that
          loads as quickly as a server-side site, but with the dynamism of a
          client-side application. Furthermore, you can choose to cache pages
          ahead of time all over the globe through a CDN{" "}
          <ProjectParentheses>
            (content distribution network)
          </ProjectParentheses>
          , making future navigation instant.
        </p>
        <p>
          For seasoned developers, this sounds like the modern re-inventing of
          what was already possible with languages like PHP, C#, or Ruby{" "}
          <ProjectParentheses>(for the static shell)</ProjectParentheses> and
          simple "plain" JavaScript{" "}
          <ProjectParentheses>
            (for the client-side enhancement)
          </ProjectParentheses>
          . Modern flavours of these tried-and-true frameworks have caught up to
          the modern ecosystem, offering ways of integrating client-side
          frameworks for the dynamic parts of your website, while still using
          your favourite language for the static shells{" "}
          <ProjectParentheses>
            (e.g.{" "}
            <ProjectReference href="https://inertiajs.com/">
              Inertia
            </ProjectReference>{" "}
            for Laravel/PHP)
          </ProjectParentheses>
          . So why would you use a full-stack JavaScript framework for this?
        </p>
        <ProjectSeparator />
        <ProjectHeader>The benefits of end-to-end type safety</ProjectHeader>
        <p>
          The main reason I chose a full-stack <i>JavaScript</i> framework
          instead of one of the many other languages with full-stack ecosystems
          is because keeping it all in the same language allows you to{" "}
          <i>share the types</i> between the front-end and back-end natively -
          with no cross-language code generation or context-switching involved.
        </p>
        <p>
          One thing I had to constantly do was redesign according to client
          feedback - including the need to regularly refactor many moving parts
          at once to fit the client's evolving needs. Normally, a refactor would
          involve carefully removing the unneeded code as to not break anything,
          run a battery of tests to make sure, integrate the new features,
          making sure not to change too much in case you break something else,
          and then testing even more to make sure the new works, the old still
          works, and there isn't anything undesired left over. It's certainly a
          strategy - but it's incredibly slow.
        </p>
        <p>
          With end-to-end type-safety, and particularly while developing a CMS,
          the workflow is enhanced significantly. Since we're working with{" "}
          <i>content,</i> it can be represented through the type system
          elegantly, and you can be sure that a change in a database schema or
          backend CRUD operation won't affect your presentation layer - because
          it's all verified by the compiler. No more{" "}
          <span className="bg-white/10">undefined</span> or{" "}
          <span className="bg-white/10">[object Object]</span> reaching the
          end-user.
        </p>
        <p>
          This is further enhanced with my ORM of choice,{" "}
          <ProjectReference href="https://www.prisma.io/orm">
            Prisma
          </ProjectReference>
          . It extends the type-safety to the database layer, as well. You
          define your database schema <i>declaratively</i>, and Prisma generates
          the types for your database models directly in your project. A common
          refactoring workflow for me would be to edit the database layer first,
          then fix the type errors in the backend, then fix the resulting
          backend/frontend conflicts. It bubbles up the chain to reduce what
          used to be a maddening cat-and-mouse game to a simple tooling-driven
          find-and-replace job.
        </p>
        <ProjectSeparator />
        <ProjectHeader>The "next" era of the web</ProjectHeader>
        <p>
          There are many flavours of full-stack JavaScript, but by far the most
          popular one is{" "}
          <ProjectReference href="https://nextjs.org/">
            Next.js
          </ProjectReference>
          . Next.js started life as a performance-oriented meta-framework for{" "}
          <ProjectReference href="https://react.dev/">React</ProjectReference>,
          offering better core web vitals for your client-side applications by
          essentially rendering the same website twice - once on the server, and
          once on the client.
        </p>
        <p>
          While it has evolved into a smarter framework with the ability to
          render parts of the page exclusively on the server, streaming to the
          client with <i>prefetching</i> for instant navigation, it still
          maintains a performance oriented focus with deep integration into the{" "}
          <i>infrastructure</i> side of the site, as well as the presentation.
          Next.js offers a multitude of features that suited my needs.
        </p>
        <ProjectBullets>
          <li>
            <strong>Static site generation:</strong> You can give Next an array
            of "slugs" that all share a common page template, and Next will
            query your database <strong>once</strong> to generate the page,
            storing it on the CDN for later. For a content management system,
            this is incredibly useful - since most of my pages meet this
            criteria.
          </li>
          <li>
            <strong>Compile-time pre-rendering:</strong> Next traverses the
            entire site at build-time, and if it doesn't see anything that
            requires the server at run-time, it renders it to HTML and stores it
            on the CDN. This is one of the reasons I chose Next for my blog as
            well - it essentially becomes a templating engine with user-side
            prefetching.
          </li>
          <li>
            <strong>Full interop with React:</strong> React is my preferred
            flavour of client-side declarative JavaScript. Next integrates with
            client-side code fully, knowing what to pre-render and what to keep
            for the client at run-time. I like to think of this as an{" "}
            <i>escape hatch</i> for when server-side only doesn't cut it, or
            would be worse for the UX than client-side code.
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>The serverless paradigm</ProjectHeader>
        <p>
          Since a CMS mostly involves CRUD operations{" "}
          <ProjectParentheses>
            (create, read, update, delete)
          </ProjectParentheses>
          , it's a perfect candidate for <strong>serverless</strong> hosting.
          The idea is simple - do you really need a server running 24/7 just to
          occasionally render a page and perform a database operation? With Next
          hosting most of our pages on the CDN anyway, the actual server is
          involved in less and less. We can forgo a long-lived instance and
          instead spin one up instantly to respond <i>just for the request, </i>{" "}
          dying immediately afterwards.
        </p>
        <p>
          This requires a backend written in a way that's pure, with no state
          stored long-lived server memory - it's either persisted in the
          database, or ephemeral{" "}
          <ProjectParentheses>
            (forgotten when the serverless instance dies)
          </ProjectParentheses>
          . This isn't ideal for certain types of applications, but for a CRUD
          application it's actually <strong>exactly what I want.</strong> State
          only lives in one place, and transformations flow one way, making
          debugging and reasoning about data flow much simpler. This purer
          approach isn't exclusive to serverless, but it works especially well
          with it.
        </p>
        <ProjectSeparator />
        <ProjectHeader>
          The downsides <span className="opacity-50">(of my choices)</span>
        </ProjectHeader>
        <p>
          These are more grievances with this particular stack than with the web
          as a whole, since I've gotten to use this stack for a professional,
          fully integrated system:
        </p>
        <ProjectBullets>
          <li>
            <strong>Next's breaking changes:</strong> Next.js is ran by{" "}
            <ProjectReference href="https://vercel.com/">
              Vercel
            </ProjectReference>{" "}
            - a web infrastructure company known for{" "}
            <i>"moving fast and breaking things"</i>. As a result, it has
            reinvented how it does caching 3 different times, how it does
            rendering twice, rewrote its entire compiler in a different
            language, and has become ground zero for experiments every time
            Vercel wants to roll out a new feature. It's evolved to have very
            strong opinions when it comes how to develop your application's
            frontend, backend, and hosting architecture - but these opinions{" "}
            <i>change drastically every version</i>.
          </li>
          <li>
            <strong>React's focus shift:</strong> React was initially
            unopinionated and minimal - an intentional choice. However, since
            the introduction of server components, it's been getting more
            complex. Seemingly every update introduces another "best practice"
            integrated into both React and Next, with the old ones becoming
            "anti-patterns". In addition, it now requires a bespoke bundler, a
            bespoke RPC and serialisation protocol{" "}
            <ProjectParentheses>
              (causing a{" "}
              <ProjectReference href="https://www.freecodecamp.org/news/reacts-critical-react2shell-vulnerability-what-you-should-know-and-how-to-upgrade-your-app/">
                security incident
              </ProjectReference>{" "}
              rated 10/10 on the CVE scale)
            </ProjectParentheses>
            , rewrote its runtime to include its own{" "}
            <i>co-operative task scheduler</i>, then introduced a compiler right
            afterwards{" "}
            <ProjectParentheses>
              (originally called "React Forget")
            </ProjectParentheses>
            .
          </li>
          <li>
            <strong>Toolchain complexity: </strong> For this single blog post,
            it first needed to be compiled{" "}
            <ProjectParentheses>(React compiler)</ProjectParentheses> before it
            could be transpiled <ProjectParentheses>(Babel)</ProjectParentheses>{" "}
            before it could be analysed{" "}
            <ProjectParentheses>(to generate CSS classes)</ProjectParentheses>{" "}
            before it could get bundled{" "}
            <ProjectParentheses>(Turbopack)</ProjectParentheses> before it could
            be interpreted/compiled{" "}
            <ProjectParentheses>(V8)</ProjectParentheses> before parts of this
            page could load. As a result, the Next.js dev server uses{" "}
            <strong>gigabytes of RAM</strong>, just to edit a blog post. For the
            CMS, I would regularly need to restart the entire IDE because I
            would run out of RAM. However, each layer of complexity on my
            machine contributes to a simpler and more performant experience on
            the client, so it's arguably warranted.
          </li>
          <li>
            <strong>Serverless cold starts:</strong> Next is great at delegating
            as much work as possible to the CDN, but if you can't cache the
            page, and there isn't an existing virtual machine ready from a
            previous request, you'll need to wait for your cloud provider to
            start a new one and boot up the Next runtime to respond - a runtime
            that takes <strong>3 seconds and 200 megabytes of RAM</strong> to
            start up. This is mitigated with caching, but not everything can be
            cached - and caching is not a solution without tradeoffs{" "}
            <ProjectParentheses>
              (like cache invalidation bugs)
            </ProjectParentheses>
            .
          </li>
          <li>
            <strong>Exponential dependencies:</strong> For this basic MVP{" "}
            <ProjectParentheses>(minimum viable product)</ProjectParentheses>,
            it has <i>550 dependencies</i>, totalling <i>800 megabytes.</i> This
            is because every dependency imports 10, which each import 10 of
            their own, which import 10 of <i>their</i> own dependencies, and so
            on, and so forth. As a result, JavaScript's main package repository
            is{" "}
            <ProjectReference href="https://securitylabs.datadoghq.com/articles/shai-hulud-2.0-npm-worm/">
              consistently targeted with supply-chain attacks.
            </ProjectReference>
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Conclusion</ProjectHeader>
        <p>
          The web ecosystem has evolved into one of the world's biggest software
          distribution platforms, from its humble roots as a way of sending
          research documents over phone lines. With any system that has lived
          this long, and maintained this level of backwards compatibility,
          there's bound to be baggage that has persisted - even with modern
          technologies.
        </p>
        <p>
          Despite this, the browser has only become more versatile than ever. A
          simple document viewer has become a secure application distribution
          platform, with exceptional performance considering its constraints.
          The future of the web, especially with technologies like{" "}
          <ProjectReference href="https://en.wikipedia.org/wiki/WebAssembly">
            WASM
          </ProjectReference>{" "}
          and{" "}
          <ProjectReference href="https://en.wikipedia.org/wiki/WebGPU">
            webGPU
          </ProjectReference>
          , is only getting brighter - and I can't wait to build on it myself.
        </p>
        <ProjectSeparator />
        <ProjectEpilogue>
          Read more about{" "}
          <Link
            href="/miniui"
            className="hover:text-white transition-colors underline"
          >
            my attempts at deriving UI from first principles.
          </Link>
        </ProjectEpilogue>
      </ProjectBody>
    </>
  );
}
