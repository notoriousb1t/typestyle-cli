# TypeStyle CLI

TypeStyle CLI compiles your TypeStyle files into CSS files.

## Setup
```bash
npm i typestyle-cli --save-dev
```

## Usage
** In your package.json **
```json
{
    "scripts": {
        "css": "typestyle src/styles/site.ts"
    }
}
```

** Run this from the command line **
```bash
npm run css
```

That will output site.css

## Reasons

With TypeStyle's ability to render dynamically in the browser, and its ability to render on the server on NodeJS, it is tempting to think that covers all cases.
TypeStyle CLI is intended for applications using other server technologies such as JSP, ASP.NET, and Ruby on Rails.  ASP.NET in particular has a thriving TypeScript
community that may not be able to leverage TypeStyle otherwise.