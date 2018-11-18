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
team will have read this amazing article. But for small scripts on my own
system, I still use comment boxes, and you can too.

## The Code

In the below code snippet, you'll find a definition for the `MakeBox` vimscript
function. This function can be used to help create and maintain comment boxes
in any language.

{{< highlight Vim >}}
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Close opening and closings of comment box.                                  "
"                                                                             "
" Beginning comment bar and ending comment bar must both be defined already   "
" and the cursor needs to be between the bars when 'MakeBox' is called.       "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! MakeBox()
    execute "normal 0"
    let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    execute "normal l"
    let next_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    while current_ch != g:comment_char || next_ch != g:comment_char
        execute "normal k0"
        let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        execute "normal l"

        let c = col('.')
        if c == 1
            let next_ch = ''
        else
            let next_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        endif
    endwhile

    execute "normal $"
    let max_line = col('.')

    call MakeBoxBar(max_line)

    execute "normal j0"
    let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    execute "normal l"
    let next_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    while current_ch != g:comment_char || next_ch != g:comment_char
        call MakeBoxLine(max_line)
        execute "normal j0"
        let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        execute "normal l"

        let c = col('.')
        if c == 1
            let next_ch = ''
        else
            let next_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
        endif
    endw

    call MakeBoxBar(max_line)
endfunction

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Construct one of the bars that goes at the beginning and end of a           "
" comment-box.                                                                "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! MakeBoxBar(max_line)
    let _ = cursor(line('.'), a:max_line)
    let column_number = col('.')
    while column_number != a:max_line
        execute "normal a" . g:comment_char
        let column_number = col('.')
    endw
endf

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Format a single line inside of a comment box                                "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! MakeBoxLine(max_line)
    execute "normal 0"
    let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')

    if current_ch == ' ' || current_ch == ''
        execute "normal xi" . g:comment_char . " "
    elseif current_ch != g:comment_char
        execute "normal i" . g:comment_char . " "
    endif

    let _ = cursor(line('.'), a:max_line)
    let column_number = col('.')
    let current_ch = matchstr(getline('.'), '\%' . col('.') . 'c.')
    if column_number != 1
        if current_ch == g:comment_char || column_number == a:max_line
            execute "normal D"
            let column_number = col('.')
        endif
    endif
    while column_number < (a:max_line - 2)
        let column_number = col('.')
        execute "normal a "
    endwhile
    execute "normal a" . g:comment_char
endfunction
{{< /highlight >}}

Now, you should know that I'm new to the language so you probably shouldn't use
the code above as an example of proper vimscript. In fact, if you spot an error
or know of better practices that I should be following, **please let me know in
the comments.**

## The Setup

You first need to set the `g:comment_char` variable, which is specific to the programming language you are using. It should be placed in a file named `FILETYPE.vim` (where `FILETYPE` is the filetype used for the language) inside the `ftplugin` directory (run `:h ftplugin` in vim for more information). The rest of the code can be copied directly into your `vimrc` file.

Finally, I have the following mapping defined in my `vimrc` which you can use as is or customize to your liking (or just call `MakeBox` directly): 

{{< highlight Vim >}}
nnoremap <Leader># :call MakeBox()<CR>
{{< /highlight >}}

## The Demo

Here's a look at the `MakeBox` function in action:

<img src="/images/MakeBox_Demo.gif" alt="Demonstration GIF for MakeBox Function"/>
