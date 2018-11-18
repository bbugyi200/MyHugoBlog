+++
title = "Keeping a Log of Most Recently Edited Files"
categories = ["vim"]
date = 2018-11-16T02:59:49-05:00
description = "Learn how you can keep a list of your most recently edited files and why this is SO useful."
image = "https://bryanbugyi.com/images/vim-icon.jpg"
+++

## Introduction

Your most important files are the ones that you've used most recently. So it makes sense that we would want to keep a list of such files.

With this goal in mind, I propose using the following script to wrap vim:

``` bash
#!/bin/bash

##############################################
#  Wrapper for editor that logs filenames.   #
##############################################

/usr/bin/"$(basename "$0")" "$@"

for arg in "$@"; do
    # Don't log options, only files.
    if [[ -f "${arg}" ]]; then

        # Find absolute path to file.
        if [[ "${arg}" == "/"* ]]; then
            filepath="${arg}"
        else
            filepath="$PWD"/"${arg}"
        fi

        # Don't log temporary files.
        if [[ "${filepath}" != *"/tmp/"* ]]; then
            # Remove duplicate entries.
            sed -i "/${filepath//\//\\/}/d" "${RECENTLY_EDITED_FILES_LOG}"

            echo "${filepath}" >> "${RECENTLY_EDITED_FILES_LOG}"
        fi
    fi
done
```

To make this work you need to export `RECENTLY_EDITED_FILES_LOG` to some suitable log file path (in your `bashrc`/`zshrc` file), name the script above `vim`, make it executable, and then place it onto your system's `PATH`. After these steps are complete, any files that you open in vim will be logged to this file.

{{% notice note %}}
If you use another editor besides vim, you can still use this script. You just have to make sure the name of the script matches the name of your editor. There is no need to make any changes to the script above.
{{% /notice %}}

## What can you use this for?

There are two applications that I have thought of so far, though I'm sure there are many more.

### Easy Shortcut for Opening Recently Used Files

I have the following one-liner in my `zshrc` config:

``` bash
rim() { vim "$(awk -F'/' "/[^/]*$1[^/]*$/ {print \$0}" $RECENTLY_EDITED_FILES_LOG)"; }
```

Now when I run `rim <EXPR>`, the most recently edited file whose filename matches `<EXPR>` will be opened up in vim.

### Grep through Recently Used Files

I also use the following alias to search through the contents of each of these logged files with `grep`:

``` bash
alias vgrep='cat $RECENTLY_EDITED_FILES_LOG | xargs grep'
```

## Extra Credit

* Checkout the [vim-startify] plugin for a heavier (but more powerful) alternative to the script discussed above.

* The `:oldfiles` command in vim produces a list of recently edited files. For more information, run `:h :oldfiles` from within vim.

[vim-startify]: https://github.com/mhinz/vim-startify
