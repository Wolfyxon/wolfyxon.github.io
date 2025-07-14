---
title: Contribution guidelines
description: Rules you need to follow when contributing to my projects
---

# Introduction

Here are guidelines of how you may contribute to my projects and the rules you need to follow when doing so.
They apply to all of my projects, however please also review the *CONTRIBUTING.md* (if present) for extra guidelines.

**You may contribute by:**
- Reporting bugs
- Suggesting improvements
- Writing code
    - Fixing bugs
    - Adding new features

Almost all my projects (including their source code) is available on [GitHub](https://github.com/wolfyxon).
That's where you can contribute.

# Rules for bug reports

## 1. Check for duplicates
Search for other reports (open and closed) if they describe the bug that you encountered.
If a the bug has already been reported, don't report it again.

## 2. Don't be vague 
Provide as much detail about the bug as possible.

**Bad example:**  
*Program doesn't work.*

**Good example:**  
*The program crashes with a message "image.png is missing in the binary" when you open it.*

# Rules for writing code

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