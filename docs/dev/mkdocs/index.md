
# Cheat Sheet

Material for MkDocs is packed with many great features that make technical
writing a pleasure. This section of the documentation explains how to set up
a page, and showcases all available specimen that can be used directly from
within Markdown files.

## Usage

### Setting the page title

When [Metadata] is enabled, the page title can be overridden for a document with
some custom front matter. Add the following lines at the top of a Markdown file:

``` sh
---
title: Lorem ipsum dolor sit amet # (1)!
---

# Document title
...
```

1.  This will set the [`title`][title] inside the HTML document's [`head`][head]
    for the generated page to this value. Note that the site title, which is set
    via [`site_name`][site_name], is appended with a dash.

  [title]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
  [head]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
  [site_name]: https://www.mkdocs.org/user-guide/configuration/#site_name

### Setting the page description

When [Metadata] is enabled, the page description can be overridden for a
document with custom front matter. Add the following lines at the top of a
Markdown file:

``` sh
---
description: Nullam urna elit, malesuada eget finibus ut, ac tortor. # (1)!
---

# Document title
...
```

1.  This will set the `meta` tag containing the site description inside the
    document `head` for the current page to the provided value.

### Setting the page template

If you're using [theme extension] and created a new page template in the
`overrides` directory, you can enable it for a specific page. Add the following 
lines at the top of a Markdown file:

``` sh
---
template: custom.html
---

# Document title
...
```


## Customization

### Using metadata in templates

#### on all pages

In order to add custom `meta` tags to your document, you can [extend the theme
][theme extension] and [override the `extrahead` block][overriding blocks],
e.g. to add indexing policies for search engines via the `robots` property:

``` html
{% extends "base.html" %}

{% block extrahead %}
  <meta property="robots" content="noindex, nofollow" />
{% endblock %}
```

#### on a single page

If you want to set a `meta` tag on a single page, or want to set different
values for different pages, you can use the `page.meta` object inside your
template override, e.g.:

``` html
{% extends "base.html" %}

{% block extrahead %}
  {% if page and page.meta and page.meta.robots %}
    <meta property="robots" content="{{ page.meta.robots }}" />
  {% else %}
    <meta property="robots" content="index, follow" />
  {% endif %}
{% endblock %}
```

You can now use `robots` exactly like [`title`][title] and
[`description`][description] to set values. Note that in this case, the
template defines an `else` branch, which would set a default if none was given.

  [title]: #setting-the-page-title
  [description]: #setting-the-page-description
