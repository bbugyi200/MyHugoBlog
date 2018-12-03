+++
title = "My Five Favorite vim Hacks"
date = 2018-11-29T12:20:19-05:00
description = ""
categories = ["vim"]
image = "https://bryanbugyi.com/images/BB.jpeg"
draft = true
+++

First off, let me explain what I mean when I say *hack*. When selecting which hacks (e.g. tips, tricks, whatever) to include in this article, I really only held myself accountable for one rule: **each hack must be original**; as in no plugins and no hijacked StackOverflow answers. So, at the very least, it is unlikely that you have seen any of these tricks before.

Given this constraint, however, I would be surprised if any one of these hacks blows you out of your seat. My only hope is that you find at least one of them useful. With regards to this goal, I am more confident.

Enough jibber jabber! On with the show!

## Hack #1: Taking Counts to the Next Level
What do you imagine when you hear the word "count" with respect to vim? Most people use counts as a way of *repeating a command* (this is arguably their intended use),  but they can also be used as *arguments to a function*. For example, I have the following mappings defined in my `vimrc`:

{{< highlight Vim >}}
" Open Nth buffer in the current window.
nnoremap - :<C-u>execute "buffer " . v:count1<CR>

" Open a new window for the Nth buffer using a horizontal split.
nnoremap _ :<C-u>execute "sbuffer " . v:count1<CR>

" Open a new window for the Nth buffer using a vertical split.
nnoremap \| :<C-u>execute "vert sbuffer " . v:count1<CR>

" Open the Nth buffer in a new tab.
nnoremap + :<C-u>execute "tab sbuffer " . v:count<CR>

" Delete the Nth buffer.
nnoremap \<Del> :<C-u>execute "bdelete " . v:count<CR>
{{< /highlight >}}

{{% notice note %}}
The difference between `v:count` and `v:count1` is that `v:count` defaults to zero when no count is provided, whereas `v:count1` defaults to one.

For more information, refer to [this][vcount-w] Vim Tips Wiki article and/or [:help v:count][vcount-h].
{{% /notice %}}

## Hack #2: A Vimscript Function for Maintaining Comment Boxes

Not much to say about this one---since I've already posted a separate article explaining this hack in detail---but here's a demo anyway:

<img src="/images/MakeBox_Demo.gif" alt="Demonstration GIF for MakeBox Function"/>

You can find the full story [here][comment-boxes].

## Hack #3: A Useful Mnemonic for Key Bindings used to Edit Special Files

{{< highlight Vim >}}
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Create mappings to open 'file' in current window, to open 'file' using      "
" a horizontal split, and to open 'file' using a vertical split.              "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! s:MapEditCommands(chars, file)
    execute "nnoremap <Leader>0" . a:chars . " :e " . a:file . "<CR>"
    execute "nnoremap <Leader>_" . a:chars . " :sp " . a:file . "<CR>"
    execute "nnoremap <Leader>\\|" . a:chars . " :vs " . a:file . "<CR>"
endfunction


" ########## Snippets ##########
" Snippet file for this filetype.
call s:MapEditCommands("s", "/home/bryan/.vim/vim-snippets/<C-R>=&filetype<CR>.snippets")

" Snippet file for this filetype and local to (only active in) the current project
call s:MapEditCommands("ls", "<C-R>=getcwd()<CR>/<C-R>=&filetype<CR>.snippets")

" Global snippet file
call s:MapEditCommands("S", "/home/bryan/.vim/vim-snippets/all.snippets")


" ########## Vimscript Files ##########
" Vim configuration that are only active for this filetype
call s:MapEditCommands("v", "~/.vim/ftplugin/<C-R>=&filetype<CR>.vim")

" Vim configuration that are only active for this filetype and are local to (only active in) the current project.
call s:MapEditCommands("lv", "<C-R>=getcwd()<CR>/.lvimrc")

" Global vim configurations (vimrc file)
call s:MapEditCommands("V", "/home/bryan/.vim/vimrc")
{{< /highlight >}}

## Hack #4: Easy Way to Override a Key Binding for Each Filetype

## Hack #5: A Pair of Key Bindings that Allow you to Quickly Delete Files and/or vim Buffers

## Extra Credit: Manage your bashrc/zshrc Aliases and Functions using Macros

[vcount-w]: http://vim.wikia.com/wiki/Invoke_a_function_with_a_count_prefix
[vcount-h]: http://vimdoc.sourceforge.net/htmldoc/eval.html#v:count
[comment-boxes]: https://bryanbugyi.com/blog/creating-comment-boxes-in-vim
