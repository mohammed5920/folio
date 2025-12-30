This is the source code for [my personal website](https://madebymohammed.com). 

It features: 
- DIY analytics (total/unique viewer counts) connected to a Supabase DB.
- DIY authentication for protected pages.
- A custom design system styled to look like [my UI engine](https://github.com/mohammed5920/miniui).
- Full end-to-end type-safety.

It's built with Next.JS partially because it meant I could port over all of the validation scaffolding from [my CMS](https://github.com/mohammed5920/alsun), while also rendering all of my pages at build-time and serving them via Netlify CDN, for faster loading times.