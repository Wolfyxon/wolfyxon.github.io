---
title: Contributing guidelines
description: Rules you need to follow when contributing to my projects
---

# Introduction

Here are guidelines of how you may contribute to my projects and the rules you need to follow when doing so.

They apply to all of my projects, however please also review the *CONTRIBUTING.md* (if present) for extra guidelines.

# Rules

## 1. Follow the project's style

For consistency, use the same style for your submitted code as the project.

Included, but not limited to:
- Indentation
- Naming (ex. snake_case, camelCase)
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
Only do that when the code is very confusing.

**Bad example:**
```javascript
// Show a popup saying "Hello"
alert("Hello");
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