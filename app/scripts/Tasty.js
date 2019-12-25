/*
Tasty.css by Mrthomas20121 2018-2019
These Buttons are free to use in/edit for a project
If you use my buttons in your site or app, credit me, that's all im asking!

https://twitter.com/Mrthomas20121
https://github.com/Mrthomas20121
https://codepen.io/mrthomas20121
*/
/*
Custom Style
*/
class Tasty {
  name="Tasty.css"
  constructor() {}
  /**
   * 
   * @param {String} color 
   * @param {String} name 
   */
  static addCustomColor(color='000000', name='black') {
    return new CustomColor(color, name);
  }
}

HTMLHeadElement.prototype.hasELement= function(elementName) {
  for (var element of this.children) {
    if(element.nodeName.toLowerCase() == elementName) {
      return true
    }
  }
  return false
}

class CustomColor {
  constructor(hex='', name='') {
    this.hex = hex;
    this.name = name;
  }
  GenerateCss() {
    var head = document.head;
    var textColor = this.name.includes('dark', 0) || this.name.includes('brown', 0) ? 'white': 'black'
    var css = `a.button.${this.name}, button.button.${this.name} { border-color:#${this.hex}; color:#${this.hex}; } a.button.${this.name}.fill, button.button.${this.name}.fill { border-color:#${this.hex}; background:#${this.hex}; color:${textColor};} a.button:hover.${this.name}, button.button:hover.${this.name}  {background-color: #${this.hex}; color: ${textColor};}`

    if(!head.hasELement('style')) {
      var style = document.createElement('style');
      style.id = `TastyCustomCss`
      style.innerHTML = css;
      head.append(style)
    }
    else {
      var style = document.querySelector('style');
      style.id = 'TastyCustomCss'
      style.innerHTML = style.innerHTML + css;
    }
  }
}