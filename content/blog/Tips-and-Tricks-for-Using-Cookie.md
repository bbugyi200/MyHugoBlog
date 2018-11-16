---
title: "cookie: Advanced Tips and Tricks"
date: 2018-11-15T03:47:43Z
draft: false
---

As far as time-saving applications go, [cookie] is quickly becoming one of my favorites. In case you haven't heard of cookie before, I'll start this post off by giving a quick micro-tutorial of the tool.

As the title of this post suggests, cookie is a "Template-based File Generator". But what does that mean? It's just like it sounds really. cookie templates are stored in `~/.cookiecutters`. Each template contains an arbitrary number of template variables which are specified using a syntax similar to that used by the [jinja] templating engine (e.g. `{{ variable }}`). When you initialize a new file, cookie looks to insert a value in place of each template variable. The user (you) provides those values on the command-line when prompted (see [this tip](https://bryanbugyi.com/blog/tips-and-tricks-for-using-cookie/#envvars) for a better way). After all template variables are accounted for, cookie opens up the newly created file in your system's default editor.

That's the short version. For the full story, checkout cookie's [homepage][cookie] or follow along with the demonstration GIF below. Once you've got a grip on the basics, your ready for this article's main course.

![demo]

## <a name="envvars">Template Variables Inherit from your System's Environment Variables</a>

Cookie is all about speed and convenience. But there is nothing convenient about manually typing out a half-dozen variable values every time you initialize a new script. Thankfully, there's another way. Before prompting the user to manually specify variable values on the command-line, cookie will check the currently defined environment variables. There are two ways to take advantage of this:

1) Assign values to the environment variables *right* before running `cookie`

OR 

2) Export the desired environment variables at *some* point before running `cookie`.

We will illustrate both methods using the same template: [hw.tex]. Notice that this template expects four template variables to be specified: `ASSIGNMENT_NUMBER`, `DEPARTMENT`, `COURSE`, and `SECTION`. Instead of running `cookie` directly for a template like this, I've found that it is easier to define a shell function that wraps the `cookie` command:

``` bash
hw() { ASSIGNMENT_NUMBER="$1" cookie -T hw.tex -f "${@:2}" HW"$1"/hw"$1".tex; }
```

This one-liner function takes care of one of the variable definitions, but what about the other three? For the rest of the variables, I use a technique (OK fine... a *hack*) that enables me to define a local zshrc file (more or less). This is made possible by the following section of my zshrc config:

``` bash
chpwd() {
    if [[ -f $PWD/.lzshrc ]]; then
        printf "\n*** ALERT: A Local zshrc File has been Sourced ***\n\n"
        source ".lzshrc"
    fi
}
```

To complement this setup, I have added environment variable definitions to a file named `.lzshrc` in each directory which is dedicated to a specific course that I happen to be taking at the moment. For example, in the directory dedicated to my "Programming Languages" course, the `.lshrc` file might contain the following definitions:

``` bash
export DEPARTMENT=CS
export COURSE=314
export SECTION=02
```

When I'm ready to start my 5th homework assignment (for example) I travel to the directory where all of my "Programming Languages" course material is and then run `hw 5`. All of the template variables are then substituted with the appropriate values and the new file is opened up in an editor so I can get started on my homework.

## The Power of the EXEC_HOOK_CMD

Cookie works on all sorts of files, but it was designed with executable scripts in mind. It should come as no surprise then that this is where the project shines brightest.

### Basics
If you pass the `-x` option to the `cookie` command, the executable bit of the new file will be set before opening the file in an editor.

### Advanced
The `-x` option does more than just set the executable bit, however. When you specify that you are working with an executable script, cookie also runs whatever hook command (if any) is specified in cookie's [config] file. The `TARGET` variable is set to the full path of the new file and is injected into the hook command's environment prior to running the command. It is important to note that in order for your hook command to take advantage of the `TARGET` variable, you must escape the `$` symbol.

For example, the following hook definition (placed in cookie's [config] file) will create a symbolic link from the new executable script to the `/usr/local/bin` directory (thus placing the script on your system's `PATH`):

``` bash
EXEC_CMD_HOOK="ln -s \${TARGET} /usr/local/bin/\$(basename \${TARGET})"
```

## BONUS: Convenient Vim Bindings
When working on a new script / config / whatever in vim, it is common for me to want to navigate to (one of) the cookie template(s) that corresponds to that filetype. This seems like it might be difficult to automate since one can have an arbitrary number of cookie templates for any given filetype. Fortunately, vimscript is more versatile (though perhaps just as ugly) than you might have thought. The following vimscript function will return the nth cookie template (in alphabetical order) with the same filetype as the current working document:

```vim
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

With that out of the way, we are now just a few short vim mappings away from having our cookie templates at our fingertips whenever we need them:

```vim
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
