---
title: tibl home
---
# <p style="text-align: center;">[🗿 tibl home](index.html)</p>

If you're reading this tibl shoud be properly "installed". 

*This stub page is your index, that you can edit in `data/index.md`.*

1. [Adding content](#adding)
	1. [Adding a post (manual)](#manual)
	1. [Adding a post (tibl-cli)](#tibl-cli)
1. [More information](#more)

## <a name="adding"></a>Adding content

You have two options there : a manual one that requires nothing but a file browser/text editor, and a more automated one that requires [tibl-cli](https://ujj.space/tibl/t.html?p=tibl-cli).

Feel free to edit all that's in the `data/` directory. It's all your content: post listing, navbar, footer, and posts/pages.

```js
let abod = "";
```
**Posts vs. Pages**: 
> - A page is a hidden post. It won't be automatically added to the post listing. You can use pages to upload unpublished posts, or to do real pages that you may link in the `nav.md` or `foot.md` files, that represent the navbar and the footer (duh).
> - A post named `foo.md` will be reachable at the address `yoursite.com/t.html?t=foo`
> - A page named `_bar.md` will be reachable at the address `yoursite.com/t.html?p=bar`

#### <a name="manual"></a>Adding a post (manual)

1. Create `data/my-post.md`
- Add some Markdown formatted content (HTML works too)
- Add your post into the post listing in `database.md` following this pattern : 

  ```
  *[My new post](t.html?t=my-post)
  ```

#### <a name="tibl-cli"></a>Adding a post (tibl-cli)

1. Be in your site's root (where you have `index.html`, `t.html`)
- Run `tibl new` and follow the prompts
- Add some Markdown formatted content (HTML works too)

## <a name="more"></a>More information

For more information checkout tibl's [website](https://ujj.space/tibl).
