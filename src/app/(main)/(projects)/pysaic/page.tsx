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

const TITLE = "Rendering 18,000 videos in real-time with Python";
const DESCRIPTION =
  "How I used game engine tech to solve a video streaming problem";

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

export default function PySaic() {
  return (
    <>
      <ProjectHero
        title={TITLE}
        description={DESCRIPTION}
        git="https://github.com/mohammed5920/pysaic"
        thumbChild={
          <video
            src={files.pmHero}
            className="rounded-2xl aspect-video object-cover"
            autoPlay
            muted
            playsInline
            loop
          />
        }
      />

      <ProjectBody>
        <ProjectHeader>The Scale of The Problem</ProjectHeader>
        <p className="italic opacity-75">
          "An image, but every pixel is actually a video."
        </p>
        <p>It seems simple enough. But let's look at the numbers:</p>
        <ProjectBullets>
          <li>
            The image in the video above is <strong>1536 x 864</strong> pixels.
          </li>
          <li>
            It uses <strong>18,000</strong> colour-matched video clips analysed
            from <strong>121</strong> sitcom episodes and a total of{" "}
            <strong>858,000</strong> different frames of video.
          </li>
          <li>
            At <strong>1024x</strong> level of detail shown in the video, you're
            looking at <strong>2513 gigabytes of RAM</strong> required to render
            a video that is <strong>2 gigapixels in size.</strong>
          </li>
          <li>
            Even if you had enough RAM to store all the videos, relying on raw
            Python to render this image would take{" "}
            <strong>11 minutes per frame.</strong>
          </li>
        </ProjectBullets>
        The solution? We need to stop thinking like a video player, and start
        thinking like an <i>open world video game.</i>
        <ProjectSeparator />
        <ProjectHeader>
          Technique 1 - Mip-mapping & levels of detail
        </ProjectHeader>
        <img
          src={files.pmAcu}
          className="rounded-2xl max-h-100 object-[50%_40%] object-cover w-full shadow-md"
        />
        <ProjectCaption>
          A screenshot from "Assassin's Creed: Unity", showcasing Paris at a 1:1
          scale.
        </ProjectCaption>
        <p>
          Open-world games boast incredible amounts of detail, often recreating
          entire cities that can be fully explored by the player. The first
          thing we can learn from these games is how they handle{" "}
          <i>distance.</i>
        </p>
        <p>
          In the screenshot above, the buildings further away from the player
          aren't treated the same as the one the player is standing on. The game
          engine measures how big the building is <i>on the screen,</i> and
          replaces it with a lower quality version if it's small enough.
        </p>
        <p>
          We can do the same thing with our mosaic. When we're zoomed out, we
          don't need videos that are 1024 pixels wide. We can replace them with
          lower quality tiles{" "}
          <ProjectParentheses>(called "mips")</ProjectParentheses> that are as
          small as 1x1, and the difference isn't noticeable - because we only
          need to generate as much detail <i>as can fit on the screen.</i>
        </p>
        <p>
          This is the first optimisation we can apply, and it speeds up the
          rendering by <i>1024x</i>, allowing us to generate 2 frames per
          second. Progress?
        </p>
        <ProjectSeparator />
        <ProjectHeader>Technique 2 - Culling</ProjectHeader>
        <video
          src={files.pmMip}
          muted
          autoPlay
          playsInline
          loop
          className="rounded-2xl shadow-md"
        />
        <ProjectCaption>
          Demo video with intermediate scaling turned off to showcase
          mip-mapping and view culling.
        </ProjectCaption>
        <p>
          Another trick we can learn from video games is by analysing what's{" "}
          <i>not</i> on screen. In an optimised renderer, there's no point doing
          work for things the player isn't going to see. If it's not on screen,
          it gets ignored, and the GPU can work on something else.
        </p>
        <p>
          We can do something similar with our renderer. In the video above,
          I've turned off the intermediate scaling between mip levels to display
          exactly what gets generated by the renderer as you zoom in. You'll
          notice that the window gets smaller and smaller each time, with the
          tiles doubling in size when the window gets small enough. Eventually,
          the tiles become as big as the window itself.
        </p>
        <p>
          This follows from our initial observation -{" "}
          <i>we only need to render what's on screen.</i> Everything else gets
          ignored. This saves us exponential amounts of processing power -
          theoretically allowing for zoom levels as big as the screen will
          allow.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Technique 3 - Bypassing Python</ProjectHeader>
        <p>
          So far, we've solved the problem of managing large zoom levels, but
          Python will still struggle with rendering a zoomed out 1080p image,
          even if the mips are a single pixel each. A standard 1080p image
          consists of 2 million pixels - that's 2 million for-loop iterations
          per frame. Python is an interpreted language with heavy overhead and
          no just-in-time compilation - so it'll struggle at real-time
          framerates{" "}
          <ProjectParentheses>
            (60 frames per second minimum)
          </ProjectParentheses>
          .
        </p>
        <p>
          Luckily, Python has a great ecosystem designed around bypassing Python
          itself for extra speed. We can use <strong>PyGame</strong> to
          represent our interactive canvas as an array of numbers instead, and{" "}
          <strong>Numba</strong> to copy bits over to our array as fast as
          possible, by compiling our loop into machine code and automatically
          spreading it over all of our CPU cores.
        </p>
        <ProjectCode>
          <div>
            <span className="text-purple-400">@numba.jit</span>(
            <span className="text-orange-300">nopython</span>
            <span className="text-blue-400">=True</span>,{" "}
            <span className="text-orange-300">nogil</span>
            <span className="text-blue-400">=True</span>,{" "}
            <span className="text-orange-300">parallel</span>
            <span className="text-blue-400">=True</span>,{" "}
            <span className="text-orange-300">cache</span>
            <span className="text-blue-400">=True</span>){" "}
          </div>

          <div>
            <span className="text-blue-400">def</span>{" "}
            <span className="text-yellow-300">draw_fast_static</span>( x_start:{" "}
            <span className="text-teal-300">int</span>, ... render_array:{" "}
            <span className="text-teal-300">np.ndarray</span>):
          </div>

          <div className="pl-4">
            <span className="text-pink-400">for</span> y{" "}
            <span className="text-pink-400">in</span> numba.
            <span className="text-yellow-300">prange</span>(
            <span className="text-blue-300">max</span>(y_start,{" "}
            <span className="text-green-300">0</span>), ...):
          </div>

          <div className="pl-8">
            <span className="text-pink-400">for</span> x{" "}
            <span className="text-pink-400">in</span>{" "}
            <span className="text-yellow-300">range</span>(
            <span className="text-blue-300">max</span>(x_start,{" "}
            <span className="text-green-300">0</span>), ...):
          </div>

          <div className="pl-12">match_id = match_list[y, x]</div>

          <div className="pl-12">
            <span className="text-gray-500 italic">
              # sparse to dense mapping
            </span>
          </div>
          <div className="pl-12">mapped_id = tile_map[match_id]</div>

          <div className="pl-12 mt-2">
            render_array[
            <br />
            &nbsp;&nbsp;(x - x_start) * tile_size : (x - x_start +{" "}
            <span className="text-green-300">1</span>) * tile_size,
            <br />
            &nbsp;&nbsp;(y - y_start) * tile_size : (y - y_start +{" "}
            <span className="text-green-300">1</span>) * tile_size
            <br />] = tile_store[mapped_id]
          </div>
        </ProjectCode>
        <ProjectCaption>
          Our rendering loop boiled down to essentially a fragment shader
          written in Numba.
        </ProjectCaption>
        <p>
          This gives us a <strong>100x</strong> speed increase over our raw
          Python loop, allowing us to render our mosaic at 120 frames per
          second.
        </p>
        <p>
          In a real video game, they use the GPU for thousands of times more
          performance for an{" "}
          <ProjectReference href="https://en.wikipedia.org/wiki/Embarrassingly_parallel">
            embarrassingly parallel
          </ProjectReference>{" "}
          task such as tile-based rendering, since GPUs have thousands of
          specialised cores, while consumer CPUs only have a few cores since
          they're optimised for more general-purpose work. However, we already
          have our mosaic rendering at 120 frames per second, and keeping it
          CPU-only greatly simplifies the requirements for our biggest
          optimisation yet.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Technique 4 - Texture Streaming</ProjectHeader>
        <p>
          So far, we've solved the FPS problem, but we still haven't solved the
          RAM problem. We can go back to our original insight about culling
          what's off screen, and look at it from another angle. Now that we know{" "}
          <i>exactly what's on screen</i> at any given moment, we only need to
          worry about loading in tiles that the user will see.
        </p>
        <p>
          However, as we zoom in, we're faced with a problem - we're storing all
          of our tiles in arrays, and{" "}
          <i>an array needs all of its space upfront.</i> At 1x1, this is 54
          kilobytes. At 2x2, 200 kilobytes. But as you zoom in, you'll find
          yourself allocating <i>terabytes</i>, because you need to make space
          for all tiles, since you don't know which one the user will zoom in
          on.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Technique 4a - Dynamic Allocation</ProjectHeader>
        <p>
          We can solve our array allocation problem by using a dense data
          structure instead. The one I settled on is the{" "}
          <ProjectReference href="https://numba.readthedocs.io/en/stable/reference/pysupported.html#typed-dict">
            Numba typed dictionary
          </ProjectReference>{" "}
          since it works inside our hot loop and only needs as much RAM as the
          tiles inside of it.
        </p>
        <p>
          It's not free, though - a hashmap lookup inside our rendering loop is
          3x slower than an array lookup. There are more advanced ways of doing
          dense arrays, including the techniques employed on actual GPUs{" "}
          <ProjectParentheses>
            (since they can't do hashmaps)
          </ProjectParentheses>
          , but for now we can settle with just splitting our streaming cache
          into 2 distinct pools - a "fast" pool using fixed arrays, and a
          "smart" pool using dynamic hashmaps.
        </p>
        <p>The way I settled on deciding the split is a bit arbitrary.</p>
        <ProjectCode>
          <div>
            available_ram ={" "}
            <span className="text-yellow-300">get_system_ram</span>() *{" "}
            <span className="text-green-300">0.75</span>
          </div>

          <div className="mt-4">
            <span className="text-pink-400">for</span> size{" "}
            <span className="text-pink-400">in</span> power_of_two_sizes:
          </div>

          <div className="pl-4 text-gray-500 italic mb-1">
            # 2 arrays at current size + tile dictionary at 4x(default)
          </div>
          <div className="pl-4 text-gray-500 italic mb-1">
            # the screen resolution * avg no. of frames per tile
          </div>

          <div className="pl-4 whitespace-pre-wrap">
            required = <span className="text-green-300">2</span> * total_frames
            * size * size * <span className="text-green-300">3</span> + <br />
            <span className="pl-4">
              <span className="text-green-300">3</span> * prefetch_size *{" "}
              <span className="text-yellow-300">min</span>(avg_tile_len,
              max_tile_len) *
            </span>
            <br />
            <span className="pl-4">
              display_res[<span className="text-green-300">0</span>] *
              display_res[<span className="text-green-300">1</span>] *{" "}
              <span className="text-green-300">3</span>
            </span>
          </div>

          <div className="pl-4 mt-2">
            <span className="text-pink-400">if</span> available_ram - required
            &gt;= <span className="text-green-300">0</span>:
          </div>

          <div className="pl-8 text-green-300">
            tile_stores[size] ={" "}
            <span className="text-yellow-300">TileStore</span>(smart=
            <span className="text-blue-400">False</span>)<br />
            available_ram -= required
          </div>

          <div className="pl-4 mt-2">
            <span className="text-pink-400">else</span>:
          </div>
          <div className="pl-8 text-purple-300">
            tile_stores[size] ={" "}
            <span className="text-yellow-300">TileStore</span>(smart=
            <span className="text-blue-400">True</span>)
          </div>
        </ProjectCode>
        <ProjectCaption>
          The split is essentially decided greedily with a very generous bias
          towards dynamic allocation.
        </ProjectCaption>
        <ProjectSeparator />
        <ProjectHeader>Technique 4b - LRU Caching</ProjectHeader>
        <video
          src={files.pmLru}
          muted
          autoPlay
          playsInline
          loop
          className="rounded-2xl overflow-hidden shadow-md"
        />
        <ProjectCaption>
          How the renderer behaves when told to minimise RAM usage at all costs.
          Notice the debug overlay, with brighter pixels corresponding to higher
          resolution mip levels. As the image is zoomed in, the image gets
          sparser as low resolution mips off screen are freed to make room for
          higher resolution ones on screen. As the image is zoomed out, the
          entire image gets duller as higher resolution mips are discarded to
          make room for lower resolution ones covering the whole screen instead.
        </ProjectCaption>
        <p>
          Dynamic allocation solves the accumulation problem, meaning we start
          off with a mosaic that only allocates as you zoom in, minimising
          startup RAM costs. However, we need to go one step further to prevent
          crashes and constrain RAM usage - we need to <i>delete</i> tiles to
          save space.
        </p>
        <p>
          A common solution is to simply free the least recently accessed tile.
          We can use an{" "}
          <ProjectReference href="https://docs.python.org/3/library/collections.html#collections.OrderedDict">
            OrderedDict
          </ProjectReference>{" "}
          for relatively fast bookkeeping, and with a large enough RAM buffer
          the amount of thrashing is reduced. This works, but we can go one step
          further to really ensure a smooth mosaic streaming experience.
        </p>
        <ProjectSeparator />
        <ProjectHeader>Technique 4c - Fine-tuned heuristics</ProjectHeader>
        <p>
          We can further tune our algorithm with number of optimisations that
          take advantage of RAM beyond just "allocate what's on screen, free
          what's not":
        </p>
        <ProjectBullets>
          <li>
            <strong>Prefetching:</strong> H.264 video is very slow to seek and
            decode, but the decoded frames are cheap to scale. We can decode
            each frame once, at a given multiplier of the current mip
            resolution, and then downscale it to generate mips at the level of
            zoom the user is viewing at. I settled on <strong>4x</strong> as a
            balance between speed and RAM.
          </li>
          <li>
            <strong>Layered freeing strategy:</strong> Mips can be downscaled
            from a larger tile, but not vice versa. We can exploit this by
            tuning our LRU strategy to prioritise tiles that have a bigger
            sibling over ones that don't.
          </li>
          <li>
            <strong>Balance the size of our buffer:</strong> Freeing too
            aggressively causes tiles to disappear as soon as they go off
            screen, which is not ideal when they take so much time to load back
            in. Increasing the size of our RAM buffer increases the chance of a{" "}
            <i>cache hit</i>, but increases RAM usage. A compromise is to
            stress-test the algorithm and measure metrics where the pop-in
            starts getting "acceptable" - a subjective threshold.
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Conclusion</ProjectHeader>
        <p>
          After applying all of these techniques, let's look back at the
          original set of problems:
        </p>
        <ProjectBullets>
          <li>
            We needed <strong>2 terabytes</strong> of RAM for the original
            video, now we can get by comfortably{" "}
            <ProjectParentheses>
              (relatively low amounts of pop-in)
            </ProjectParentheses>{" "}
            with a buffer of <strong>6 gigabytes.</strong>
          </li>
          <li>
            We can fake <strong>1000x detail</strong> using only{" "}
            <strong>a fixed number of pixels</strong> on screen at any time.
          </li>
          <li>
            We were rendering a frame <strong>every couple of minutes</strong>,
            now we're rendering <strong>120 per second.</strong>
          </li>
          <li>
            And technically, we're still doing it all in{" "}
            <strong>Python.</strong>
          </li>
        </ProjectBullets>
        <ProjectSeparator />
        <ProjectHeader>Bonus: Video Mode</ProjectHeader>
        <p>
          We have a renderer that works on static photos, but can we make it
          work with videos? Thanks to Numba and the fact that it can release the{" "}
          <i>Global Interpreter Lock</i>, we can.
        </p>
        <p>Using Python as the glue, we can have:</p>
        <ProjectBullets>
          <li>One thread decoding video into a shared buffer</li>
          <li>
            One thread taking decoded video frames and generating mosaics out of
            them in real-time
          </li>
          <li>One thread monitoring pixels on screen to stream in tiles</li>
          <li>And one thread rendering and responding to user input</li>
        </ProjectBullets>
        <p>
          All four threads, writing to shared memory, all working together in{" "}
          <ProjectReference href="https://docs.python.org/3/library/threading.html#lock-objects">
            lock
          </ProjectReference>
          step, to achieve this marvel of computing:
        </p>
        <video
          src={files.pmVid}
          muted
          autoPlay
          playsInline
          loop
          className="rounded-2xl shadow-md"
        />
        <ProjectCaption>
          An episode of <strong>Parks & Recreation</strong>, but each pixel is
          replaced with a frame from an episode of{" "}
          <strong>Parks & Recreation</strong>.
        </ProjectCaption>
        <ProjectSeparator />
        <ProjectEpilogue>
          Read more about the{" "}
          <Link
            href="/miniui"
            className="hover:text-white transition-colors underline"
          >
            custom UI engine
          </Link>{" "}
          I originally designed for this project.
        </ProjectEpilogue>
      </ProjectBody>
    </>
  );
}
