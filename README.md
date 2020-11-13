# typed-pokedex

## How to start server using VSCode
1. Clone repository.
2. Run `yarn` in root of directory
3. Download Live Server VSCode extension
4. In one terminal, run `tsc --watch`
  * This watches for any changes in the TypeScript files and updates the 
    JavaScript files.
5. In another terminal, run the Live Server on `index.html`
  * This watches for any changes related to the `index.html` files which are:
    * The HTML file
    * The CSS file
    * The built JS file (not the TS file)