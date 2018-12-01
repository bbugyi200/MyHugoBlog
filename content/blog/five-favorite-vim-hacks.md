+++
title = "My Five Favorite vim Hacks"
date = 2018-11-29T12:20:19-05:00
description = ""
categories = ["vim"]
image = "https://bryanbugyi.com/images/BB.jpeg"
draft = true
+++

First off, let me explain what I mean when I say *hack*. When selecting which hacks (e.g. tips, tricks, whatever) to include in this article, I really only held myself accountable for one rule: **each hack must be original**. As in no plugins and no hijacked StackOverflow answers. So, at the very least, it is unlikely that you have seen any of these tricks before.

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

For more information, see [this][vcount-w] Vim Tips Wiki article and [:help v:count][vcount-h].
{{% /notice %}}

## Hack #2: A Vimscript Function for Maintaining Comment Boxes

## Hack #3: A Useful Mnemonic for Key Bindings used to Edit Special Files

## Hack #4: One Key Binding is all you Need

## Hack #5: A Pair of Key Bindings that Allow you to Quickly Delete Files and / or vim Buffers

## Extra Credit: Manage your bashrc / zshrc Aliases and Functions using Macros

[vcount-w]: http://vim.wikia.com/wiki/Invoke_a_function_with_a_count_prefix
[vcount-h]: http://vimdoc.sourceforge.net/htmldoc/eval.html#v:count
