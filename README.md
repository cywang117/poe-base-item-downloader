# Path of Exile Base Item Downloader :crossed_swords:
Script to download Path of Exile's base item art off the PoE Wiki

<p align="center">
  <img src="./assets/AbyssJewelRanged.png">
  <img src="./assets/CurrencyRerollRare.png">
  <img src="./assets/Amulet8.png">
  <img src="./assets/SupportGemMultistrikePlus.png">
</p>

---

### Usage:
1. `git clone https://github.com/cywang117/poe-base-item-downloader`
2. `npm i`
    * Ensure `node.js` is installed.
3. Follow the [instructions](https://github.com/brather1ng/RePoE) to install brather1ng's RePoE
    * Alternatively, navigate to `base_items.min.json` in his project directory and download just that file.
4. `mkdir data`
5. Copy `base_items.min.json` from `/RePoE/RePoE/data` into `/data`
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
