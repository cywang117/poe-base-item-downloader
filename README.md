# Path of Exile Base Item Downloader
Script to download Path of Exile's base item art off the PoE Wiki

---

### Usage:
1. `git clone https://github.com/cywang117/poe-base-item-downloader`
2. `npm i`
    * Make sure you have `node.js` installed!
3. Follow the [instructions](https://github.com/brather1ng/RePoE) to install brather1ng's RePoE
4. Copy `base_items.min.json` from `/RePoE/RePoE/data` into project `/data` directory
    * You must create `/data` yourself
6. `node getBaseItemPNGs.js` to run script

---

### Config:
By default, this script only downloads **non-unique** equippable items, gems, flasks, and currency. My usage of the script excluded the need to use any other artwork.

However, through tweaking of the `makeWikiUrl` and `filterBases` functions, you may be able to download other items that are listed in RePoE's `base_items.min.json`. See the non-minified `base_items.json` and RePoE's corresponding documentation for information on how to code your downloads for any other item art.

For items not listed in `base_items.min.json` or additional features, feel free to raise an issue.

---

### Special thanks to:
* [PyPoE](https://github.com/OmegaK2/PyPoE)
* [RePoE](https://github.com/brather1ng/RePoE)
* [Grinding Gear Games](http://www.grindinggear.com/) -- All Path of Exile content belongs to them. Please don't use their files without permission ^^
