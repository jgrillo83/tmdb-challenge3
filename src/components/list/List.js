import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
            },
            Focus: {
              visible: false,
              y: 120,
              x: -30,
                /**
                 * @ todo: Your goal is to add a focus indicator. Please take a look at the video
                 * and inspect the rectanle frame that's before the focused movie item.
                 * extra: Animate it a bit when the focus changes to the next item
                 */
                 zIndex: 2,
                 texture: Lightning.Tools.getRoundRect(234, 340, 4, 4, 0xff43f0e7, false),
            },
            Metadata: {
              visible: false,
              /**
               * @todo: Your goal is to add a component that have multiple text labels,
               * 1 for the Title of the selected asset and 1 for the genre.
               */
              Title: {
                text : {
                  text: '', fontSize: 48, fontFace: "SourceSansPro-Bold"
                }
              },
              Genre: {
                y: 55,
                text: {
                  text: '', fontSize: 24, fontFace: "SourceSansPro-Regular", textColor: 0xff43f0e7
                }
              }
            }
        }
    }

    $toggleText(item) {
      console.log("toggleText : " + item.title);
      this.tag("Metadata").tag("Title").patch({
        text: { text: item.title }
      });
      this.tag("Metadata").tag("Genre").patch({
        text: { text : item.genres.join(" | ") }
      })
    }

    _focus() {
      console.error("focus list");
      this.tag("Focus").patch({
        visible: true,
      })
      this.tag("Metadata").patch({
        visible: true,
      })
    }

    _unfocus() {
      console.error("unfocus list");
      this.tag("Focus").patch({
        visible: false,
      })
      this.tag("Metadata").patch({
        visible: false,
      })
    }

    _init() {
        this._index = 0;
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
    }

    set label(v) {
        // @todo: update list title
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }
}
