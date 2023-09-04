# Repository of Labs-Hardel IO

Hardel's lab offers tools that allow the creation of datapacks without any knowledge of programming and datapacks.

## Website :

The site is freely accessible to all at the following address:  
https://labs.hardel.io

### Beta of Hardel's Lab :

To try unstable features in advance, there is a link accessible to all.  
https://beta-labs.hardel.io

**WARNING !**  
There are several elements to know all these features are in an experimental bute.  
It is extremely and strongly recommended not to create any concrete datapack project with the Beta version, this site exists only to test new features.

-   The data can be regularly erased and reset.
-   The data are not the same as the production version.
-   Accounts can be deleted.

# Author and thanks

The creation and design of the site was done by Hardel.  
However, the idea was not only mine but also a developer "RedCoal"...  
I would like to thank Dataworld for supporting this project.

### Owner and website developper.

-   Hardel

### Datapacks Developper

-   RedCoal

# Bugs/Feature/Suggestions.

If you need to contact me, to request additional features, or to talks about bug or change requests.  
Go to this Discord server, or create a ticker on Github.

# Open Souce

Also the Hardel's Labs project is fully open source.  
In this interest any person can come and improve the generators or the tools, help to fix bugs or other.  
Some parts however will not be public for security reasons.

## Technologies :

Hardel's Labs is based on the NextJS framework, here is the list of main technologies and libraries.

### Framework :

[NextJS 13](https://nextjs.org/) (Expérimental)  
Next.js is a Frontend, JavaScript framework based on React and Node.js.
It also includes a server part in the form of a RestAPI ExpressJS.

### Language :

-   ([Typescript](https://www.typescriptlang.org/)) Hardel's Labs includes Typescript for a better development experience.
-   ([Sass](https://sass-lang.com/)) Hardel's Labs includes Sass which allows to facilitate the style of the files.

### Styles :

-   ([Sass](https://sass-lang.com/)) However it is only used for some small global files.
-   ([TailwindCSS](https://tailwindui.com/components)) This tool is the main source of styling of the site, it is used in all components and pages.

### Database :

-   ([PlanetScale](https://planetscale.com/)) The databases are all hosted on the PlanetScale. site in Mysql.
-   ([Prisma](https://www.prisma.io/)) The ORM that is used is Prisma, easy to use and compatible with other technologies.

### Hosted :

-   ([Vercel](https://vercel.com/)) The entire website is hosted on Vercel for reasons of economic cost, the technology that embeds it and the fact that it is the creator of the framework used.
-   (AWS S3 / [CloudFlare R2](https://cloudflare.com)) All assets ( particularly images) of the users are stored on the Amazon platform on an S3.
    For this CloudFlare R2 based (AWS S3) is used to simplify many things.

### Other :

-   ([CloudFlare](https://cloudflare.com)) For the domain registration.
-   ([Pusher](https://pusher.com/)) For real time Pusher is used.
-   ([ESLint](https://eslint.org/)/[Prettier](https://prettier.io/)) For the correction the development rules and the trainer, ESLint and Prettier are part of the game.
-   ([NextAuth](https://next-auth.js.org/)) Authentication is managed by NextAuth, perfectly adapted for the Prisma ORM and, for the Vercel hosting company.

# License

This software is distributed under the GNU GPLv3 License. BepinEx is distributed under LGPL-2.1 License.
