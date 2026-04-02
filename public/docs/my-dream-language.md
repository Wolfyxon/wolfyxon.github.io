---
title: My dream programming language
description: My dream programming language blueprint and its unique features.
---

# Introduction
I'm pretty sure every programmer wants to make their own language.
That includes me. 

I'm a fan of TypeScript, Rust and C so my language will be similar.

# Core principles
- Strong types
- Low-level access
- OOP and trait/interface functionality

# Examples
## Hello World
```
import std::io::println;

func main() {
    println("Hello World!");
}
```

## Users
```
import std::io::{print, input};
import std::exit;

struct User {
    String name;
    int age;

    pub func new(name: String, age: int) -> Self {
        return {
            name: name,
            age: age
        };
    }
}

func print_help() {
    println(
        "1) Add new user",
        "2) remove user",
        "3) Exit program"
    );
}

func cmd_add_user(users: &Array<User>) {
    let name = input("Enter name: ");
    let age_str = input("Enter age: ");

    let parse_result = int::parse(age_str);

    if !parse_result { // Check if the result is successful
        println(`Invalid age: {age_str}`);
        return;
    }

    // Extract value from the result or crash (but it can't crash because the result was checked)
    let age = parse_result!;

    users.append(User::new(name, age));
    println("User added");
}

func cmd_remove_user(users: &Array<User>) {
    let name = input("Enter user name: ");

    for i in users.len() {
        if(i.name == name) {
            users.remove_at(i);
            return; // End loop and abort function
        }
    }

    println(`User '{name} not found!'`);
}

func query_command(users: &Array<User>) {
    print_help();

    let command = input("Enter command: ");

    match command {
        "1": {
            cmd_add_user(users);
        },
        "2": {
            cmd_remove_user(users);
        },
        "3": {
            println("bye bye");
            exit();
        }
    }
}

func main() {
    let users = Array<User>::new();

    loop {
        query_command(&users);
    }
}
```

## OS Platform
My language would have a built in way of getting the OS, but here's how it could be done without that feature.

```
import std::fs::{self, File, OpenFlags};

enum Platform {
    Windows,
    Linux(Option<String>),
    MacOS,
    Unknown

    pub fn to_string(&self) {
        return match self {
            Windows: "Windows",
            Linux(distro): distro ?? "Linux"
        };
    }

    pub fn get() {
        if fs::exists("C:\\") {
            return Windows;
        }

        if fs::exists("/System") {
            return MacOS;
        }

        if fs::exists("/etc/os-release") {
            let file_res = File::open("/etc/os-release", OpenFlags::Read);

            if !file_res {
                // Print to stderr
                eprintln(`error: Unable to open /etc/os-release {file_res.err().to_string()}`);
                
                return Linux(None);
            }

            let distro = parse_os_release(file_res!);
            return Linux(distro);
        }

        return Unknown;
    }
}

func parse_os_release(file: &File): Option<String> {
    while !file.is_end() {
        let line_res = file.read_line();

        if !line_res {
            eprintln(`error: Failed to read os-release: {line_res.err().to_string()}`);
            return None;
        }

        let line = line_res!;
        let split = line.split("=");
        
        let key = split.get(0) ?? "";
        let value = split.get(1) ?? "";
        
        if key == "NAME" {
            return Some(value);
        }
    }
    
    return None;
}

func main() {
    let platform = Platform::get();

    println(`You're running {platform.to_string()}`);
}

```