---
title: C __VA_ARGS__ macro expansion
author: tech0ne
date: 2025-04-29 15:00:00 +0100
categories: [research, c]
comments: true
toc: true
pin: false
tags: [research, linux, programming, c]
math: true
mermaid: true
---

# Preface

Today, I will present to you a little research I made not too long ago.

For a project I'm making, I needed to expand a C variadic macro.

- First, let's go over variadic functions and particularly macro varidic.

- Next, we'll see how variadic macros are usually used.

- Finally, we'll see what I made, why it's usefull, and how you can use it on your next C project.

# Let's get started !

## What are variadic functions and variadic macros ?

First, let's look at what are variadic functions:

> In mathematics and in computer programming, a variadic function is a function of indefinite arity, i.e., one which accepts a variable number of arguments. Support for variadic functions differs widely among programming languages. 

> Hmm, more precisions please ?
{: .prompt-info }

A variadic function is a function taking any number of arguments.

Let's go from High Level implementations down to C's implementation

---

### Python

Python's a popular High Level language implementing variadic functions.

In order to define a variadic function in Python, you must prepend an argument with the `*` character.

```py
def my_function(*args):
    for arg in args:
        print(arg)
```

When calling this function, you can give it any number of argument, which will be printed one by line.

Knowing that, each of the following function calls are valid

```py
my_function("hello")
my_function("hi", "there", "!")
my_function("1", 2, 3.0, False)
my_function()
```

Guess what ? Some standard Python functions also have this ability !

```
print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
```

Well, the definition is strange, but in that function, print can take any number of `value` argument !

This becomes usefull when you want to display multiple things with one function call.

---

### C implementation

> C, with static types, have variadic functions ?
{: .prompt-info }

That's a great point !

C's static types should not let you have any number of arguments of any type, right ?

Well, it does.

And it does using C's `void*` type.

The `void*` type is a "anything" type, in C.

You are able to cast any variable to a `void*`, and retreive any variable from a `void*` (given that you respect memory rules, like stack lifetime and stuff)

Let's see examples !

```c
#include <stdarg.h>

int sum(unsigned nb_inputs, ...)
{
    va_list list;
    va_start(list, nb_inputs);  

    int result = 0;
    for (unsigned i = 0; i < nb_inputs; ++i) 
        result += va_arg(list, int);
    va_end(args);

    return result;
}
```

> What is that syntax ???
{: .prompt-info }

That's variadic in C !

We can point 5 important things on that function definition :

- `...`: This tells the C compiler that this `sum` function takes any number of arguments after the first one.
- `va_list`: This type "stores the arguments" (that's not exactly how it works, but we'll see that right after)
- `va_start`: This is used as an initiator for the list. The first argument must be your list, and the second one must be the last fix argument of your function.
- `va_arg`: This is used to retreive the next argument. You give it the list itself, and the type it must be casted to.
- `va_end`: This is really important and must NOT be skipped ! Calling `va_end` "destruct" the list. As we'll see, it's really important.

> Ok, that's nice and all, but how does it work ?
{: .prompt-info }

Well, let's see !

What's the definition of `va_start` ?

![Not usefull std definition](/assets/img/posts/research/c/variadic_macro_expansion/stdarg_h_content.png "This is not helping !")

Hmmm, not that helpfull

I managed to find a "re-creation" of the theory behind the C variadic definitions:

```c
typedef char* my_va_list;

// Helper macro
#define _MY_VA_ALIGN_SIZE(type)         (((sizeof(type) + __alignof__(type) - 1) / __alignof__(type)) * __alignof__(type))

// Initiate the va_list: Save the address of the stuff after the last argument
#define my_va_start(ap, last_param)     (ap = (my_va_list)(&last_param + 1))

// Get the next argument: Move the list pointer by the size of the type, and retreive it's content.
#define my_va_arg(ap, type)             (*(type *)((ap += _MY_VA_ALIGN_SIZE(type)) - _MY_VA_ALIGN_SIZE(type)))

// Make the list point to nothing as an end.
#define my_va_end(ap)                   (ap = (my_va_list)0)
```

> So... You just retreive the variable by looking at what's _after_ the last function argument ?
{: .prompt-info }

Exactly !

What `...` does is simply push all the arguments one by one to the stack, in order for the variadic arguments to retreive them.


