+++
title = "Comment Boxes. Bad Practice? Or just misunderstood?"
date = 2018-11-18T01:34:35-05:00
description = "Description and demonstration of the MakeBox vimscript function I use to help me maintain comment boxes."
+++

Even though I know it's not normally considered a good practice, I still
like to use comment boxes from time to time. These are especially handy
in bash scripts to write comments about the script at the top.

The reason they are generally considered a bad practice is that they are
difficult to change and thus encourage stale documentation. I still
advice that you don't use comment boxes in the real world since not everyone on your
team will have read this amazing post :smile:. But for small scripts on my own
system, I still use comment boxes, and you can too.

## The Code

The following vimscript snippet defines the `MakeBox` function:

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

## The Setup

There are two values you may need to adjust manually:

* The `g:max_line` variable specified the size of the top and bottom comment bars (`MakeBar` needs a fixed size).

* The `g:comment_char` variable defines the comment character of the language you are using.

The `g:comment_char` variable is specific to the programming language you are using. It should be placed in a file named `FILETYPE.vim` (where `FILETYPE` is the filetype used for the language) inside the `ftplugin` directory (see `:h ftplugin` in vim for more information). The rest of the code can simply be copied into your `vimrc` file.

Finally, I have the following mapping defined in my `vimrc` which you can use as is or customize to your liking (or just call `MakeBox` directly): 

{{< highlight Vim >}}
nnoremap <Leader># :call MakeBox()<CR>
{{< /highlight >}}

## The Demo

Here's a look at the `MakeBox` function in action:

<img src="/images/MakeBox_Demo.gif" alt="Demonstration GIF for MakeBox Function"/>

Now, you should know that I'm new to the language so you probably shouldn't use
the code above as an example of proper vimscript. In fact, if you spot an error
or know of better practices that I should be following, **please let me know in
the comments.**
