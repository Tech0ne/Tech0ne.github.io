---
title: Introducing shellpass !
author: tech0ne
date: 2026-04-18 21:15:00 +0100
categories: [tools]
comments: true
toc: true
pin: false
tags: [tools, rust, password-manager]
---

# Introduction

Today, i'm excited to anounce that i've released (in very early state) shellpass !

This is the latest project i've been working one, and i hope you'll enjoy it !

Here, we'll go in a few details on what it is, how it works, what it it's current state...

## What is Shellpass ?

[Shellpass](https://github.com/tech0ne/shellpass) is a TUI based password manager.

You can find it's homepage [here](https://tech0ne.github.com/shellpass/).

The goal of this project is to walk away from the current standard of uploading stuff to servers just to save your password.

While it allows for password sharing across devices, it also gives your passwords to forein companies/countries.

What I wanted with that tool was to save passwords locally, while secured (encrypted) and with a nice looking UI.

## How does it work ?

Shellpass have a tree like architecture: from one file, you will create multiple **profiles**, each containing multiple **entries**, and each entry will contain a *username*, a *password*, a *website* and some *custom data*, each optional.

It allows you to have, within the same file, your personal and professional password each on their specific "directory".

You can also copy the content of fields from within the TUI (when copying passwords, they don't get revealed, they get cleared after 10 seconds).

Every part of the UI allows for mouse usage.

Once you're done with editing your passwords, you can save them:

- shellpassw will encrypt them with AES256GCM (and using argon2 for salting) using your master password as key
- they will then be stored on you local system's data directory (if you didn't specify otherwise) as vault.enc, serialised using [CBOR](https://cbor.io/), a binary data format

## Current state

As i'm writing this, shellpass is fully usable, and have all major features you'd expect from a password manager.

Features that I'm planing to add include (but are not limited to):

- Better keyboard movements (vim-like controls, including command)
- Password generation (following a regex, or following strong guidelines)
- Improve customisation (including style)
- Rework some parts (improve code)
- Add the ability to access the password file remotly (SSH/FTP storage) to allow for shared access between devices

Stay tunned [here](https://tech0ne.github.io/shellpass/changelog/) for changes !
