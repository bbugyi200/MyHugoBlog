---
title: "Tips and Tricks for Using Cookie"
date: 2018-11-15T03:47:43Z
draft: false
---

As far as time-saving applications, [cookie] has quickly found its way to the top of my list. If you haven't used cookie before, don't worry, I'll take a second to get you up to speed:

As the title of this post suggests, cookie is a "Template-based File Generator". But what does that mean? It's just like it sounds really. Cookie templates are stored in `~/.cookiecutters`. Each template contains an arbitrary number of template variables which are specified using a syntax similar to that used by the [jinja] templating engine (e.g. `{{ variable }}`). When you initialize a new file, cookie looks to insert a value in place of each template variable. The user (you) is expected to provide those values on the command-line (cookie will prompt you). See the [section][#envvar] on environment variables for an alternative approach to specifying these values. After all template variables are accounted for, cookie opens up your brand new file in an editor so you can get to work.

That's the short version. For the full story, checkout the project's [homepage][cookie]. Once you've got a grip on the basics, your ready for this article's main course: **Tips and Tricks for using Cookie**.

## <a name="envvar">Template Variables Inherit from your System's Environment Variables</a>

Cookie is all about speed and convenience. But there is nothing convenient about manually typing out a half-dozen variable values every time you initialize a new script with cookie. Thankfully, there's another way. Before prompting the user to manually specify variable values on the command-line, Cookie will check the currently defined environment variables. There are two ways to take advantage of this: 1) Assign values to the environment variables *right* before running `cookie` OR 2) Export the desired environment variables at *some* point before running `cookie`.

We will illustrate both methods with the same template: [hw.tex]. Notice that this template expects four template variables to be specified: `ASSIGNMENT_NUMBER`, `DEPARTMENT`, `COURSE`, and `SECTION` That's why I NEVER run `cookie` directly when using this template. Instead I've defined a shell function to wrap the `cookie` command. I use this to initialize my `hw.tex` template instead:

``` bash
hw() { ASSIGNMENT_NUMBER="$1" cookie -T hw.tex -f "${@:2}" HW"$1"/hw"$1".tex; }
```

This takes care of one of the four variable definitions for me. I take care of the other three using a hack that enables me to define a *local* zshrc file (more or less). This is made possible by the following section of my zshrc config:

``` bash
chpwd() {
    if [[ -f $PWD/.lzshrc ]]; then
        printf "\n*** ALERT: A Local zshrc File has been Sourced ***\n\n"
        source ".lzshrc"
    fi
}
```

To complement this setup, I have added environment variable definitions to a file named `.lzshrc` in each directory which is dedicated to a specific college course. For example, in the directory dedicated to my "Programming Languages" course, the `.lshrc` file contains the following definitions:

``` bash
export DEPARTMENT=CS
export COURSE=314
export SECTION=02
```

When I'm ready to start my 5th homework assignment (for example) I travel to the directory where all of my "Programming Languages" course material is and then run `hw 5`.

## The Power of the EXEC_HOOK_CMD

Cookie works on all sorts of files, but it was designed with executable scripts in mind. It should come as no surprise then that this is where the project shines brightest.

#### Basics
If you pass the `-x` option to the `cookie` command, the executable bit of the new file will be set before opening the file in an editor.

#### Advanced
The `-x` option does more than just set the executable bit, however. When you specify that you are working with an executable script, Cookie also runs whatever command (if any) is specified in [Cookie's configuration file][config]. The `TARGET` variable is set to the full path of the new file and is injected into the hook command's environment prior to running the command. It is important to note that in order for your hook command to take advantage of the `TARGET` variable, you must escape the `$` symbol.

For example, the following hook definition (placed in Cookie's configuration file) will create a symbolic link from the new executable script to the `/usr/bin` directory (thus placing the script on your system's `PATH`):

``` bash
EXEC_CMD_HOOK="ln -s \${TARGET} /usr/bin/\$(basename \${TARGET})"
```

## BONUS: Convenient Vim Bindings
When working on a new script / config / whatever in vim, it is common for me to want to navigate to (one of) the Cookie template(s) that corresponds to that filetype. This seems like it might be difficult to automate since one can have an arbitrary number of templates for any given filetype. Fortunately, vimscript is more versatile (though perhaps ugly) language. The following vimscript function will return the nth Cookie template (using alphabetical order) of the same filetype as the current working document:

``` vim
function! Cookie(n)
    let ext = &filetype

    " Python filetype in Vim doesn't match the extension as it does in most languages.
    " There are most likely other languages that will require manual rules be set up as well.
    if &filetype == "python"
        let ext = 'py'
    endif

    let templates = systemlist('cookie -l | grep \.' . ext)
    return '/home/bryan/.cookiecutters/' . templates[a:n]
endfunction
```

With that out of the way, we are now just a few short vim mappings away from having Cookie templates on call whenever are fingers demand them:

``` vim
nnoremap <Leader>t1 :execute 'edit' Cookie(0)<CR>
nnoremap <Leader>t2 :execute 'edit' Cookie(1)<CR>
nnoremap <Leader>t3 :execute 'edit' Cookie(2)<CR>
...
nnoremap <Leader>tn :execute 'edit' Cookie(n)<CR>
```

[cookie]: https://github.com/bbugyi200/cookie
[jinja]: https://github.com/pallets/jinja
[demo]: https://raw.githubusercontent.com/bbugyi200/cookie/master/img/demo.gif
[hw.tex]: https://github.com/bbugyi200/dotfiles/blob/master/.cookiecutters/hw.tex
[config]: https://github.com/bbugyi200/cookie#configuration
