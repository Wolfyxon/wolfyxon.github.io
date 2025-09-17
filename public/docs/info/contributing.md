---
title: Contribution guidelines
description: Rules you need to follow when contributing to my projects
---

# Introduction

Here are guidelines of how you may contribute to my projects and the rules you need to follow when doing so.
They apply to all of my projects, however please also review their *CONTRIBUTING.md* (if present) guidelines specific to the project.

**You may contribute by:**
- Reporting bugs
- Suggesting improvements
- Writing code
    - Fixing bugs
    - Adding new features

Almost all my projects (including their source code) are available on my [GitHub profile](https://github.com/wolfyxon).
That's where you can contribute.

# Reporting bugs and submitting suggestions
To report a bug or submit a suggestion in my project, find its GitHub repository and go to the **issues** tab.
There you can find existing submissions (open and closed) and submit new ones.

You will need a GitHub account to create and comment on issues.

When creating issues, follow the rules below.

## 1. Check for duplicates
Search for other reports (open and closed) if they describe the bug that you encountered or your idea.
If a the bug or suggestion has already been submitted, don't report it again.

## 2. Don't be vague 
Provide as much detail about the bug or suggested change/feature as possible.

**Bad example:**  
*Program doesn't work.*

**Good example:**  
*The program crashes with a message "image.png is missing in the binary" when you open it.*

# Writing code
To contribute by directly writing code, go to the project's GitHub repository and **fork** it to create a copy of it
on your GitHub account.

Then I recommend you **create a new branch** so you can submit paralel pull requests without waiting for your previous ones
to be accepted and you won't have to revert all the commits on the main branch if they get rejected.

After that, you can edit files in your fork as you wish, I strongly recommend you use **Git** over the GitHub web interface for committing files.

When you're done, commit your changes and click **contribute** (it will appear) in your repo to create a pull request
to send your code for review.

Make sure to follow the rules below.

## 1. Follow the project's style

For consistency, use the same style for your submitted code as the project.

Included, but not limited to:
- Indentation
- Naming (ex. `snake_case`, `camelCase`)
- Order of definitions in the file

The project is most likely using the standard naming convention of the used programming language.

## 2. No AI generated code
The code you submit must be written by you and not any AI tools.

The only acceptable case is when you copy very small portions of the generated code or base it off of a provided example, but it's highly
encouraged if you try to understand the codebase by yourself.

However, you must understand the code you're submitting and be able to explain what it does when asked. 

You may use AI to assist you while programming, for example to help you with finding and fixing bugs, explaining things and providing examples.

## 3. Don't make unnecessary comments
Don't explain code that's self explanatory.
Only do that when the code is confusing.

**Bad example:**
```javascript
// Show a popup saying "Hello"
alert("Hello");
```

**Good example**
```rust
    // Makes the program GPU accelerated with NVIDIA
    pub fn prime(&mut self) -> &mut Self {
        self.set_env("__NV_PRIME_RENDER_OFFLOAD", "1");
        self.set_env("__GLX_VENDOR_LIBRARY_NAME", "nvidia");
        self.set_env("__VK_LAYER_NV_optimus", "NVIDIA_only");
        self.set_env("VK_ICD_FILENAMES", "/usr/share/vulkan/icd.d/nvidia_icd.json");

        self
    }
```

## 4. Manual and automated testing
Before you submit your code, please verify that it compiles (or gets parsed as valid) and is working properly.

If the project includes unit tests, run them to make sure your code didn't break anything in the program.

Making your own tests for your code is also highly appreciated!

## 5. Documentation
If the project uses documentation comments, you must add them for all of your functions.

Description is only required if other definitions in the project use it.

### Examples:
**LuaDoc:**
```lua
---@param a number
---@param b number
---@return number
function add(a, b)
    return a + b
end
```

**JSDoc:**
```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
**/
function add(a, b) {
    return a + b;
}
```