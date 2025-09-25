---
title: Keys and verifying
description: How to import my public key and use it to verify releases and signed messages
---

# Introduction
(Sorry if you hate introductions and not just getting to the point, but I have to account for people who don't know this lol)

Digital signatures allow you to verify that a file or any kind of data was truly made by the person who signed it
and that it has not been modified in any way.  
Modifying a signed file ultimately breaks the signature, rendering it invalid.

I use a digital signature to sign binaries of my projects to allow people who use them to ensure
they were in fact made by me and not tampered with.  
Sometimes I may also sign various messages or text files to provide a proof that I wrote them and that they're not fake.

The signature format I use is [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) which relies on asymmetric encryption (public and private keys).
The **public key** is used to verify signatures and **private key** (which you should never share) is used to make them.

In this guide, I'll show you how to obtain my **public key**.

# Software I use
I use **GnuPG** to make the signatures. It's referred to as **gpg**.

This page will cover only how to use GnuPG, but you should be able to verify my signatures with other
programs that use the PGP system, also including websites.

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
