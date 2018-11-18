+++
title = "Creating Comment Boxes in Vim"
date = 2018-11-18T01:34:35-05:00
description = ""
draft = true
+++

## Introduction

Even though I know it's not normally considered a good practice, I still
like to use comment boxes from time to time. These are especially handy
in bash files to write comments about the script at the top.

The reason they are a bad practice is that they are difficult to change
and encourage stale documentation (because no one wants to change them).
This post won't change that fact in the real world since not everyone on
your team will have read this amazing post :). But for small scripts on
my own system, I still use comment boxes, and you can too.

## MakeBox Code

The vimscript snippet below defines the `MakeBox` function. Now, I'm new to
the language so you probably shouldn't use this as an example of proper
vimscript. In fact, if you spot an error or know of better practices that I should
follow, **please let me know in the comments.**

{{< highlight Vim >}}
"""""""""""""""""""""""""""""""""""""""""
"  Change these values to your liking.  "
"""""""""""""""""""""""""""""""""""""""""
let g:comment_char = "#"
let g:max_line = 79

""""""""""""""""""""""""""""""""""
"  The function we care about.   "
""""""""""""""""""""""""""""""""""
function! MakeBox()
    execute "normal 0"
    let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    execute "normal l"
    let och = matchstr(getline('.'), '\%' . col('.') . 'c.')
    while ch != g:comment_char || och != g:comment_char
        execute "normal k0"
        let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        execute "normal l"
        let och = matchstr(getline('.'), '\%' . col('.') . 'c.')
    endwhile

    call s:BoxBar()

    execute "normal j0"
    let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    execute "normal l"
    let och = matchstr(getline('.'), '\%' . col('.') . 'c.')
    while ch != g:comment_char || och != g:comment_char
        call s:EndOfBox()
        execute "normal j0"
        let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        execute "normal l"
        let och = matchstr(getline('.'), '\%' . col('.') . 'c.')
    endw

    call s:BoxBar()
endfunction

""""""""""""""""""""""""""""""""""""
"  Helper Functions for 'MakeBox'  "
""""""""""""""""""""""""""""""""""""
function! s:EndOfBox()
    execute "normal 0"
    let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    if ch != g:comment_char
        execute "normal xi" . g:comment_char . " "
    endif
    let _ = cursor(line('.'), g:max_line)
    let c = col('.')
    let ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    if ch == g:comment_char || c == g:max_line
        execute "normal D"
        let c = col('.')
    endif
    while c < (g:max_line - 2)
        let c = col('.')
        execute "normal a "
    endwhile
    execute "normal a" . g:comment_char
endfunction

function! s:BoxBar()
    let _ = cursor(line('.'), g:max_line)
    let c = col('.')
    while c != g:max_line
        execute "normal a" . g:comment_char
        let c = col('.')
    endw
endf
{{< /highlight >}}

## Customizations

There are two values you may need to adjust manually:

* The `g:max_line` variable specified the size of the top and bottom comment bars (`MakeBar` needs a fixed size).

* The `g:comment_char` variable defines the comment character of the language you are using and should be placed in a file named `FILETYPE.vim` (where `FILETYPE` is the filetype of the language uses) inside the `ftplugin` directory (see `:h ftplugin` in vim for more information).

## Demo

Here's a demo of `MakeBox` in action:

<img src="/images/MakeBox.demo" alt="Demonstration GIF for MakeBox Function"/>
