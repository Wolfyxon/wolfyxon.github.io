---
title: Keys and verifying
description: How to import my public key and use it to verify releases
---

# Introduction
I use **GnuPG** to sign the release files of the most of my projects.
It ensures that I am the author of the files and they haven't been tampered with.

**GnuPG** is a program for making digital signatures and encrypting data, based on the 
[PGP system](https://en.wikipedia.org/wiki/Pretty_Good_Privacy).

https://www.gnupg.org | [downloads](https://www.gnupg.org/download/index.html)


# Importing
[Download text version](/resources/gpg/wolfyxon.txt) | [Download binary version (.gpg)](/resources/gpg/wolfyxon.gpg)


My key as text:
```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZtn+XhYJKwYBBAHaRw8BAQdAeTF+7VPv51D/iBwLodRdqo7eKQq/ISpQFNcH
q9yXtDO0HVdvbGZ5eG9uIDx3b2xmeXhvbkBnbWFpbC5jb20+iJkEExYKAEEWIQTH
3sDY1XZ5LwePuQv8+caRsj4d/AUCZtn+XgIbAwUJBaOagAULCQgHAgIiAgYVCgkI
CwIEFgIDAQIeBwIXgAAKCRD8+caRsj4d/LiGAQDPpjB9hfEV0qoNrEPpDDa4wAr5
nhadBfQ865rgUPIsfQEA0AtcOjkASVldPQy06ygOHlBnq1bhcprvfUKba/9/GAO4
OARm2f5eEgorBgEEAZdVAQUBAQdA7h/tdJmzXCp/XXDhXqRhcwB7mT0xvG/PRV3O
xujIHEADAQgHiH4EGBYKACYWIQTH3sDY1XZ5LwePuQv8+caRsj4d/AUCZtn+XgIb
DAUJBaOagAAKCRD8+caRsj4d/Kb0AQDRErSLEfW+AeNcu1RHwCA8JSKIhA7MBfu7
7qM1hg4EyQD9EEGQUdILVhDrVF+HPUPKrFKLKsyTf4dqWz4B62OEWwU=
=FC/i
-----END PGP PUBLIC KEY BLOCK-----
```
You can copy and import it. 
Below are commands that will allow you to do this or with an alternative way.

## Import commands
Various methods of importing my key via the command line.

### From URL
```
curl https://wolfyxon.github.io/resources/gpg/wolfyxon.gpg | gpg --import -
```

**NOTE:** Not all Windows versions have `curl` installed by default, so you may want to use an other method or install it first.

`curl` is used to send HTTP request to retrieve files and contents of websites. 

### From a key server
https://keys.openpgp.org/
```
gpg --keyserver keys.openpgp.org --receive-keys FCF9C691B23E1DFC
``` 

### From file
```
gpg --import <file>
```
Examples:
```
gpg --import Downloads/wolfyxon.gpg
```
```
gpg --import C:\Users\CoolPerson\Downloads\wolfyxon.txt
```


[Learn more about importing keys at the GnuPG website](https://www.gnupg.org/gph/en/manual/x56.html)

# Verifying a file
Download the file you want you want to verify and its `.sig` counterpart. Put them in the same directory and run: 
```
gpg --verify <signature file>
```
## Example:
Original file: `CoolGame.zip` | Signature: `CoolGame.zip.sig`

```
gpg --verify CoolGame.zip.sig
```

[Learn more about verifying files and signatures at the GnuPG website](https://www.gnupg.org/gph/en/manual/x135.html)
