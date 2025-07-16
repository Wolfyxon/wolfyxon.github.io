---
title: My dream programming language
description: How would my programming language look
---

# Introduction
Here's how I would design a large programming language.

Not sure how I would name it though.

# Baiscs
```
// This is a comment
/* also a comment */

print("Hello World");
```

```

let some_var = true;

print(`Value of some_var is {some_var}`)

if some_var {
    print("Yay")
} else {
    print("Not good")
}

```

# Loops
```
for i in 5 {
    print(i);
}

for i in 10..0 {
    print(i);
}

```

```

let start = OS::unix_time();

while OS::unix_time() < start + 10 {
    print("tick tock");
    wait(1);
}

print("Time's up!");

```

```
loop {
    print("AAAAAAAAAAAAA");

    if random<int>(0, 10) == 0 {
        break;
    }
}
```

# Functions

```
func hi() {
    print("hello");
}
```

```
func get_greeting(name: String) -> String {
    return `Hello, {name}`;
}

func greet(name: String) {
    print(get_greeting(name));
}
```

# OOP
```
class Named {
    pub name: String
}

class User: Named {
    password: String,

    pub func new(name: String, password: String) -> Self {
        return Self {
            name: name,
            password: password
        }
    }

    pub func change_password(&self, current_password: String, new_password: String) -> Result<(), String> {
        if &self.password != current_password {
            return Err("Invalid current password");
        }

        &self.password = new_password;
        return Ok();
    }
}

let test_user = User::new("Bob", "password123");

func try_change_password(current_password: String, new_password: String) {
    test_user.change_password(current_password, new_password).unwrap_or_else((err) => {
        print(`Failed to change password: {err}`);
    });
}

test_user.change_password("pass123", "aaaaaaaaaa");
test_user.change_password("password123", "bbbbbbbbbbbbb");

```

# Enums

```
enum OsType {
    Linux,
    Windows,
    Mac,

    pub func to_string(&self) -> String {
        return match &self {
            Linux => "GNU/Linux",
            Windows => "Microsoft Windows",
            Mac => "MacOS"
        }
    }

    // lol
    pub func get_best() -> Self {
        return Linux;
    }
}

print(OsType::get_best());
print(OsType::Windows);
```

# Modules 

Main script
```
import utils, math::add;

utils::cool_print(add(1, 5));

```

utils
```
pub func cool_print(message: String) {
    print(`>>>> {message} <<<<`);
}
```

math

```
pub func add(a: float, b: float) -> float {
    return a + b;
}
```