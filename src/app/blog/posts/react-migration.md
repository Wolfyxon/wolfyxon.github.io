---
title: I remade my site in React
description: What's React and why did I do that
date: 2025-01-27
---


# What's React
As you've probably seen in the description, I remade my site in [React](https://react.dev/) and the [NextJS](https://nextjs.org/) framework.

React is a library for easy website and UI development.

It uses a system of reusable components which highly decreases redundancy. 
For example:

```tsx
function ImageLink(data: {url: string, img: string}) {
    return (
        <a href={data.url}>
            <img src={data.img} />    
        </a>
    );
}
```
```tsx
function HomePage() {
    return (
        <>
            <h1>My socials</h1>

            <ImageLink url="github.com/..." img="github.png">
            <ImageLink url="youtube.com/..." img="youtube.png">
            
        </>
    )
}
```

Then using a framework like NextJS, you can export your website to normal HTML, CSS and JavaScript to be hosted on GitHub.

# Why did I choose it

My website uses a lot of repeated elements and pages. That causes a lot of code repetition.

It's pretty much necessary, especially if I want to have a blog.

# Why not earlier

I knew about React before, but for some reason I haven't given it a try until now.
And I instantly loved it.

# Try it yourself
If you haven't already, go ahead and try React yourself.

Here are some useful links:
- https://react.dev/learn
- https://react.dev/reference/react
- https://nextjs.org/docs/app/getting-started
- https://vite.dev/