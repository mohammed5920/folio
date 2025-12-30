import { MiniDiv } from "@/components/mbm/miniui";
import {
  ProjectBody,
  ProjectBullets,
  ProjectCaption,
  ProjectCode,
  ProjectEpilogue,
  ProjectHeader,
  ProjectHero,
  ProjectParentheses,
  ProjectReference,
  ProjectSeparator,
} from "@/components/mbm/projectPage";
import { files } from "@/lib/files";
import { Metadata } from "next";
import Link from "next/link";
import { MiniCounter } from "./client";

const TITLE = "What I learned designing a (barebones) UI engine";
const DESCRIPTION = "Deriving user interfaces from first principles";

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

export default function MiniUI() {
  return (
    <>
      <ProjectHero
        title={TITLE}
        description={DESCRIPTION}
        git="https://github.com/mohammed5920/miniui"
        thumbChild={
          <MiniDiv className="flex items-center justify-center h-full aspect-video">
            <MiniCounter />
          </MiniDiv>
        }
      />

      <ProjectBody>
        <ProjectHeader>The Usecase</ProjectHeader>
        <p>
          I wrote a custom UI framework in <strong>PyGame</strong>, a library
          used for software rendering{" "}
          <ProjectParentheses>(graphics on the CPU)</ProjectParentheses>, to
          support my{" "}
          <Link
            href={"/pysaic"}
            className="hover:text-white transition-colors underline"
          >
            experiments
          </Link>{" "}
          while giving me a standard interactive layer using event-driven
          paradigms similar to other UI frameworks.
        </p>
        <p>The requirements were specific:</p>
        <ProjectBullets>
          <li>
            <strong>It needed to be transparent</strong> - I didn't want my UI
            layer to add extra cost over standard software rendering, which
            means no workarounds to get it to display custom canvases
          </li>
          <li>
            <strong>It needed to be in Python</strong> - The main goal is to
            have an interactive layer ready to spin up for rapid
            experimentation. Python has a vast ecosystem of libraries and is
            fast to write - the UI layer needs to match that iteration speed.
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Starting From Nothing</ProjectHeader>
        <div className="aspect-[6] bg-white/10 rounded-2xl flex items-center justify-center">
          <button className="bg-white/10 mx-auto w-fit p-1 hover:bg-white/20 active:bg-white active:text-black">
            Hello
          </button>
        </div>
        <ProjectCaption>UI at its most simplest.</ProjectCaption>
        <p>
          The initial architecture focused on brutal simplicity. I persisted a
          flat list of components that I would manually place by first sketching
          it out in <i>Photoshop</i>, and every frame the engine ran a minimal
          loop:
        </p>
        <ProjectBullets>
          <li>
            <strong>Hit-test: </strong>Compare the mouse coordinates and click
            state with the coordinates of every single component in the flat
            hierarchy, triggering any click/hover handlers on any components
            that passed the hit-test.
          </li>
          <li>
            <strong>Update: </strong>Run a global <strong>update()</strong> loop
            for every component if they need to update private state
            consistently every frame.
          </li>
          <li>
            <strong>Render: </strong>Call the <strong>render()</strong> method
            on each component, relying on my Photoshop math to make sure they
            render at the right size and in the right position.
          </li>
        </ProjectBullets>
        <p>
          This is very simple to write, but it's impractical for all but the
          most stylised or minimal UI layers. For a general purpose tool, it
          would be ideal to offload some of the math to the engine and focus on
          describing my UI through higher layer layout semantics, as opposed to
          manual pixel math.
        </p>
        <ProjectSeparator />
        <ProjectHeader>The Family Tree</ProjectHeader>
        <div className="py-12 sm:aspect-[4] bg-white/10 rounded-2xl flex items-center justify-center">
          <div className="bg-white/10 p-1 flex flex-col gap-1">
            <div className="bg-white/10 p-1 flex gap-1">
              <button className="bg-white/10 mx-auto w-fit p-1 hover:bg-white/20 active:bg-white active:text-black">
                Foo
              </button>
              <button className="bg-white/10 mx-auto w-fit p-1 hover:bg-white/20 active:bg-white active:text-black">
                Bar
              </button>
            </div>
            <button className="bg-white/10 mx-auto w-full p-1 hover:bg-white/20 active:bg-white active:text-black">
              Baz
            </button>
          </div>
        </div>
        <ProjectCaption>A reunion.</ProjectCaption>
        <p>
          To achieve this, we can draw inspiration from actual UI engines and
          model our UI to represent nodes as a <i>tree</i>, instead of a flat
          hierarchy. Each node has a parent and one or more child nodes, which
          can each have their own children, and so on. I implemented an
          architecture where nodes are exclusively either layout-only or
          content-only, as opposed to something like HTML, where nodes can be
          contentful and have children of their own. Less flexible, but simpler
          to implement.
        </p>
        <p>
          Instead of a simple list iteration, this approach requires{" "}
          <strong>depth-first traversal</strong> of the tree, which recurses
          through all the nodes. This recursive nature is essential to how the
          layout engine works. Each layout node implements two key methods, a{" "}
          <strong>measure()</strong> method to measure and return its rectangle
          size, and a <strong>distribute()</strong> method where a child node
          can be issued its final size and position.
        </p>
        <p>
          This seems simple, but combined with the recursive nature of the tree
          traversal, it results in a layout engine that calls{" "}
          <strong>measure()</strong> on a child, that calls{" "}
          <strong>measure()</strong> on <i>its</i> child, so on and so forth,
          until instrinsic sizes bubble up and final positions can be
          distributed back down the tree.
        </p>
        <p>
          This is an incredibly powerful paradigm and is inspired by how actual
          layout engines similar to the ones in Flutter and Jetpack Compose
          function. A crucial difference is that my layout engine only works
          with <i>instrinsic sizing</i>, and does not support any constraints.
          Practically, this means that a parent cannot grow or shrink its
          children, which is a key requirement if you want responsive design or
          fluid layouts. While these weren't the main requirements for the
          initial version of this engine, they <i>are</i> things I'd like to
          revisit, especially after watching{" "}
          <ProjectReference href="https://www.youtube.com/watch?v=by9lQvpvMIc">
            this excellent video
          </ProjectReference>{" "}
          of how Clay{" "}
          <ProjectParentheses>(a layout engine for C)</ProjectParentheses>{" "}
          works.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Refining the engine</ProjectHeader>
        <ProjectCode>
          <div>
            <span className="text-blue-400">class</span>{" "}
            <span className="text-yellow-300">Offset</span>(
            <span className="text-teal-300">ui.core.Stage</span>):
          </div>

          <div className="pl-4">
            <span className="text-blue-400">def</span>{" "}
            <span className="text-yellow-300">start</span>(
            <span className="text-orange-300">self</span>):
          </div>

          <div className="pl-8">
            <span className="text-orange-300">self</span>.back ={" "}
            <span className="text-teal-300">Button</span>(UII,{" "}
            <span className="text-green-300">"&lt;- Back"</span>,{" "}
            <span className="text-orange-300">self</span>.clickon_back)\
          </div>
          <div className="pl-12">
            .<span className="text-yellow-300">place</span>(
            <span className="text-teal-300">Alignment.TOP_LEFT</span>, offset=[
            <span className="text-teal-300">Style.PADDING.LAYOUT_PADDING</span>
            ]*
            <span className="text-green-300">2</span>)
          </div>

          <div className="pl-8 mt-2">
            <span className="text-orange-300">self</span>.root ={" "}
            <span className="text-teal-300">UIContainer</span>(UII,{" "}
            <span className="text-teal-300">BoxLayout</span>(
            <span className="text-green-300">"vertical"</span>)).
            <span className="text-yellow-300">add_elements</span>({"{"}
          </div>

          <div className="pl-12">
            <span className="text-green-300">"start"</span>:{" "}
            <span className="text-teal-300">UIContainer</span>(UII,{" "}
            <span className="text-teal-300">BoxLayout</span>(
            <span className="text-green-300">"horizontal"</span>)).
            <span className="text-yellow-300">add_elements</span>({"{"}
          </div>
          <div className="pl-16">
            <span className="text-green-300">"label"</span>:{" "}
            <span className="text-teal-300">TextLabel</span>(UII,{" "}
            <span className="text-green-300">"Start: "</span>),
          </div>
          <div className="pl-16">
            <span className="text-green-300">"ebox"</span>:{" "}
            <span className="text-teal-300">EntryBox</span>(UII,{" "}
            <span className="text-green-300">"YYYY-MM-DD"</span>),
          </div>
          <div className="pl-12">{"}"}),</div>

          <div className="pl-12">
            <span className="text-green-300">"end"</span>:{" "}
            <span className="text-teal-300">UIContainer</span>(UII,{" "}
            <span className="text-teal-300">BoxLayout</span>(
            <span className="text-green-300">"horizontal"</span>)).
            <span className="text-yellow-300">add_elements</span>({"{"}
          </div>
          <div className="pl-16">
            <span className="text-green-300">"label"</span>:{" "}
            <span className="text-teal-300">TextLabel</span>(UII,{" "}
            <span className="text-green-300">"End: "</span>),
          </div>
          <div className="pl-16">
            <span className="text-green-300">"ebox"</span>:{" "}
            <span className="text-teal-300">EntryBox</span>(UII,{" "}
            <span className="text-green-300">"YYYY-MM-DD"</span>),
          </div>
          <div className="pl-12">{"}"}),</div>

          <div className="pl-12">
            <span className="text-green-300">"amount"</span>:{" "}
            <span className="text-teal-300">UIContainer</span>(UII,{" "}
            <span className="text-teal-300">BoxLayout</span>(
            <span className="text-green-300">"horizontal"</span>)).
            <span className="text-yellow-300">add_elements</span>({"{"}
          </div>
          <div className="pl-16">
            <span className="text-green-300">"label"</span>:{" "}
            <span className="text-teal-300">TextLabel</span>(UII,{" "}
            <span className="text-green-300">"GB: "</span>),
          </div>
          <div className="pl-16">
            <span className="text-green-300">"ebox"</span>:{" "}
            <span className="text-teal-300">EntryBox</span>(UII),
          </div>
          <div className="pl-12">{"}"}),</div>

          <div className="pl-12">
            <span className="text-green-300">"buttons"</span>:{" "}
            <span className="text-teal-300">UIContainer</span>(UII,{" "}
            <span className="text-teal-300">BoxLayout</span>(
            <span className="text-green-300">"horizontal"</span>)).
            <span className="text-yellow-300">add_elements</span>({"{"}
          </div>
          <div className="pl-16">
            <span className="text-green-300">"date_ez"</span>:{" "}
            <span className="text-teal-300">Button</span>(UII,{" "}
            <span className="text-green-300">"Smart fill"</span>,{" "}
            <span className="text-orange-300">self</span>.clickon_fill),
          </div>
          <div className="pl-16">
            <span className="text-green-300">"go"</span>:{" "}
            <span className="text-teal-300">Button</span>(UII,{" "}
            <span className="text-green-300">"Add!"</span>,{" "}
            <span className="text-orange-300">self</span>.clickon_go),
          </div>
          <div className="pl-12">{"}"}),</div>
          <div className="pl-8">{"}"})</div>

          <div className="pl-8 mt-2">
            <span className="text-teal-300">UIEngine</span>.
            <span className="text-yellow-300">add</span>({"{"}
            <span className="text-green-300">"back"</span>:{" "}
            <span className="text-orange-300">self</span>.back,{" "}
            <span className="text-green-300">"main"</span>:{" "}
            <span className="text-orange-300">self</span>.root{"}"})
          </div>
        </ProjectCode>
        <ProjectCaption>
          Code snippet of what a simple form looks like, showcasing the nested
          box layouts with anchoring support.
        </ProjectCaption>
        <p>
          With the core component API and layout abstraction nailed down, I
          finally reached a point where I could start designing components and
          simple test programs for me to use. I quickly discovered some
          exceptions that I took for granted in other UI engines.
        </p>
        <ProjectBullets>
          <li>
            <strong>Asynchronous support:</strong> One of the first GUIs I wrote
            involved a script that had to talk to an API, which would freeze the
            entire window. My solution was an abstraction for the base threading
            library where threads are tracked by the engine and callbacks are
            called <i>on the main thread</i> upon completion. This helps reduce
            the surface area for race conditions while keeping the program
            responsive.
          </li>
          <li>
            <strong>Event listeners:</strong> Sometimes components need access
            to I/O events that involve more than just the mouse. I added a
            system to globally emit events that can be subscribed to, similar to
            JavaScript APIs in the browser{" "}
            <ProjectParentheses>
              (... and running into the same memory leaking problems)
            </ProjectParentheses>
            .
          </li>
          <li>
            <strong>Performance optimisations:</strong> Software rendered UIs
            can quickly slow down if not optimised correctly. I used flags to
            mark if a component or a layout was <i>dirty</i>, and made use of
            Python's context handler API to provide a Pythonic way of updating
            components while handling the flags behind the scenes. Components
            are only redrawn and layouts are only recalculated when the
            respective flag is set, allowing the program to minimise CPU usage
            to only when it's needed.
          </li>
          <li>
            <strong>UI Stages:</strong> Most UIs don't consist of a single
            "stage" of UI elements. Ideally, we want to navigate to various
            "stages"{" "}
            <ProjectParentheses>
              (or "pages" as they're called in a browser)
            </ProjectParentheses>{" "}
            depending on UI state. I implemented a state machine similar to how
            mobile applications work, where you can push a stage to a stack and
            return from it, or clear the entire stack and start fresh for
            destructive navigation.
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Beyond the basics</ProjectHeader>
        <div className="flex items-center justify-center rounded-2xl">
          <img src={files.puiDemo} className="sm:w-[50%] mix-blend" />
        </div>
        <ProjectCaption>
          An actual screenshot - featuring the minimal hardcoded stylesheet that
          ended up inspiring the style of this website.
        </ProjectCaption>
        <p>
          What I have now works fine for basic / experimental scripts where raw
          iteration speed is more important than maintenance, but ideally, we'd
          want to bridge that gap and add more functionality. Here are a couple
          of more advanced ideas I'd like to explore in the future, inspired by
          real systems:
        </p>
        <ProjectBullets>
          <li>
            <strong>Declarative API:</strong> Can we take the huge improvement
            in developer experience from moving from manual pixel -&gt;
            automatic layout, and apply that to <i>UI state?</i> The program
            becomes a <i>description</i> of what you'd want to see for any given
            state, instead of a set of instructions to poke at the UI every
            single time a variable changes. This requires either a fine-tuned
            reactivity primitive{" "}
            <ProjectParentheses>(similar to SolidJS)</ProjectParentheses> or an
            optimised reconciler for <i>diffing</i> our UI tree with an
            ephemeral one created when state changes{" "}
            <ProjectParentheses>(like React.js)</ProjectParentheses>.
          </li>
          <li>
            <strong>Composability:</strong> With the current API, my programs
            consist of big components that do whole tasks at once, render
            directly to surfaces, and store and manage their state opaquely.
            This is simple for the engine, but gets hard to manage for the
            developer. Modern paradigms are adopting a more functional,
            compositional API where programs consist of many tiny UI primitives
            that compose to make something larger. Supporting this requires an
            overhaul of the event-handling system to support{" "}
            <strong>event bubbling,</strong> and optimisation of almost all
            aspects of the engine to handle moving the complexity to the UI
            tree.
          </li>
          <li>
            <strong>Custom styling:</strong> Right now, the engine relies on a
            hardcoded stylesheet full of global style declarations that are
            referenced in the render method for each component. Ideally, we
            would combine this with a user-configurable styling API. Something
            similar to TailwindCSS utility classes would fit perfectly with the
            "minimal" target we're aiming for - but applying directly to the
            renderer instead of compiling to a file.
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Conclusion</ProjectHeader>
        <p>
          Ironically, this project started because I <strong>didn't</strong>{" "}
          want a UI. Existing solutions were opaque and required lots of
          boilerplate that often exceeded the actual scale of my projects. I
          just wanted clickable surfaces and a way to hack at the layers
          underneath. As the project grew, I ended up organically discovering
          how to construct simple abstractions through trying{" "}
          <ProjectParentheses>(and sometimes failing)</ProjectParentheses> to
          write my own, and why it's paradoxically <i>anything but simple</i> to
          do right.
        </p>
        <p>
          While it’s far from perfect, writing it taught me more about UI
          systems than I ever would have learned by sticking to established
          solutions alone.
        </p>
        <ProjectSeparator />
        <ProjectEpilogue>
          Read more about the{" "}
          <Link
            href="/pysaic"
            className="hover:text-white transition-colors underline"
          >
            high-performance video mosaic rendering and streaming engine
          </Link>{" "}
          I originally designed this UI library for.
        </ProjectEpilogue>
      </ProjectBody>
    </>
  );
}
