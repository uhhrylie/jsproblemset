# Welcome

So we've done a bit of JavaScript already, but let's get some more practice with this. In this problem set, you'll be creating some sample code. This file should also serve as a reference for you in future projects.

Note: I've been migrating introductory JS content over to our [trinket.io textbook](https://trinket.io/thinkle_innovationcharter_org/courses/intro-to-html#/javascript/hello-world-in-javascript) as well so you have an easier place to look at it in the future rather than having to find this project.

## Accessing Single Elements with JavaScript
The easiest way to access an element in JavaScript is to use the command `querySelector`, like so:

```JavaScript
let element = document.querySelector("h1")
```

Where I typed "h1" above you could type any valid CSS selector. The word `let` tells JavaScript to save the result of the command in a variable; in this case I named it `element` but I could use any name.

If there are more than one element that match the selector, `document.querySelector` will return only the *first* match.

## Modifying Elements
There are 3 main ways you would can modify an element.

1. Apply or remove a class so you can use CSS to apply styles, transitions, animations, etc.
2. Modify the content of the element.
3. Modify the style of the element.

### Adding or removing a class
Each element has a classList property. The classList in turn has the following useful methods:

- element.classList.add("name") *add class **name** to element*
- element.classList.remove("name") *remove class **name** from element*
- element.classList.toggle("name") *add class **name** if it is not currently there; otherwise, remove it*
- element.classList.contains("name") *return **true** if element has class **name**

I recommend making a simple class in your CSS for testing, such as:

```css
.red {
  background-color: red;
  color: white;
}
```

Then you can run code like this:
```html
element.classList.add('red')
```

It should now be very clear which element you have selected. Go ahead and try the following:

```javascript
let listItem = document.querySelector('li');
listItem.classList.add('red');
```

### Modifying Content
The simplest way to change the `content` of an element is to assign to its `innerHTML`, like so:

```JavaScript
element.innerHTML = "Look, I wrote JavaScript";
```


### Modifying the style directly
You can apply style rules directly to an element using its style attribute.

Any word that is hyphenated in CSS can be written in camel caps (camelCaps look like this: camelCaps) in JavaScript.

```javascript
element.style.borderBottom = '3px solid blue';
element.style.fontFamily = 'Impact';
```

These style rules will show up as style= rules on the element, which means they will override any CSS rules that apply.

## Accessing Multiple Elements

If you want to access all items that match a selector, you can use the command `document.querySelectorAll`. In most cases, you will then want to use a **loop** to modify each item that you have selected. The simplest way to do that is with a *for... of...* loop. Here is what that looks like.

```javascript
// Define a variable for each matching element
for (let li of document.querySelectorAll('li')) {
  // This code runs once per element matched...
  console.log('A match',li)
  li.innerHTML += ', <i>wow!</i>';
}
```

# Reacting to the User

Almost everything that we do in JavaScript will be done in a *callback function*, which is a function that you write and then tell the browser to run at a later time. Callbacks are used for things such as:

- Responding to user clicks, scrolls, or keystrokes
- Running code once a resource loads from the network
- Running code when a css transition is complete

## Putting a handler in your HTML

The easiest way to write a callback is to put it directly in your HTML. You can write JavaScript code to run directly in HTML like this (note: you can access the element itself by using event.target)

```html
<h2 onclick="event.target.style.color='blue'">Click to turn blue</h2>
```

However, it's more normal to add a handler by defining a function in your JavaScript which you then call from HTML, like this:

HTML
```html
<h3 onclick="turnRed(event)">Click to turn red</h3>
```

JS
```javascript
function turnRed (event) {
  event.target.classList.add('red')  
}
```

## Adding a callback with JavaScript

You can also add a handler directly in JavaScript by using the function [addEventListener](https://www.w3schools.com/jsref/met_element_addeventlistener.asp), which looks like this:

```javascript
element.addEventListener("click", clickHandler)
```

In addition to "click" there are many other events you can listen for such as "mouseover", "mouseout" and more.

Here's some code to make it so every list item in the document will get twice as big if you click on it:

```javascript
for (let li of document.querySelectorAll("li")) {
  li.addEventListener(
    "click",
    function (event) {
      event.target.style.fontSize = "200%"
    }
  )
}
```

You can potentially nest these calls, though be careful: it's easy to make your logic hard to follow.

Here's an example that is probably as complicated as you should ever let your logic get:

```javascript
function selectListItem (event) {
  let li = event.target
  li.style.fontWeight = 'bold';
  li.style.fontSize = '200%';
  li.addEventListener("click",removeListItem)
  li.innerText += "(click to remove)"
}
function removeListItem (event) {
  event.target.remove();
}
```

## Using the event object

Note: in addition to including the "target" element,
the **event** object you have access to in an event
listener can have othe useful properties as well.

You can find detailed documentation by googling any
event + javascript which should bring you to mozilla
docs or w3schools. For example, here's the documentation
on the [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), which shows you that you can get
the coordinates of the mouse from the click event.

That would enable us to do things like create an
annoying piece of text that follows the mouse:

HTML
```html
<div id="fly">
  I am an annoying fly!
  <br>Wow, this is the worst
</div>
```

JavaScript
```javascript
let fly = document.querySelector('#fly')
fly.style.position = 'absolute';
let body = document.querySelector("body");
body.addEventListener(
  "mousemove",
  function (event) {
    fly.style.left = event.pageX + 'px';
    fly.style.top = event.pageY + 'px'
  }
)
```

## Crawling the DOM with JavaScript

Often, it's convenient to be able to move around
the HTML tree from code. For example, imagine a 
TODO list like this:

```html
<div class="todo">
  <header>
    <input type="checkbox"> Done
  </header>
  <h2>Mow the Lawn</h2>    
</div>
<div class="todo">
  <header>
    <input type="checkbox"> Done
  </header>
  <h2>Go Grocery Shopping</h2>    
</div>
<div class="todo">
  <header>
    <input type="checkbox" onclick="handleItem(event)"> Done
  </header>
  <h2>Do Bike Maintenance</h2>    
</div>
```

You might want to make the checkbox automatically
change the style of the current item and then perhaps
highlight the next item.

When you write a JavaScript callback, all it knows is
the element that *triggered* the event, so we need a way
to navigate from e.g. the checkbox input up to the card
we're interested in and then perhaps down to the next
or previous sibling.

## Moving UP the tree (to parents)

You can move one step up the tree by using the `parentElement` property on any element which
will give you the direct parent.

```javascript
function handleItem(event) {
  let checkbox = event.target;
  let header = checkbox.parentElement;
  let card = header.parentElement;
  ...
}
```



### Searching Ancestors on the Tree

The code above is fragile. It would break if I did something as simple as add another element to my card, such as adding a label around the input and the word "Done" so that clicking "Done" activtes the checkbox.

```html
<div class="todo">
  <header>
    <label>
      <input 
        type="checkbox" 
        onclick="handleItem(event)"> 
        Done
    </label>
  </header>
  <h2>Do Bike Maintenance</h2>    
</div>
```

You can *search* up the tree by using the `closest("selector")` method on any element.

Here's a revised version of the code above which is much more robust:

```javascript
function handleItem(event) {
  let checkbox = event.target;
  let header = checkbox.parentElement;
  // Find the nearest ancestor with class="todo"
  let card = checkbox.closest(".todo");
  ...
}
```

## Moving across the tree

If you have an element and you want to move 
across the HTML tree, you can use the 
`nextElementSibling` and `previousElementSibling` properties.

```javascript
function handleItem(event) {
  let checkbox = event.target;
  let header = checkbox.parentElement;
  // Find the nearest ancestor with class="todo"
  let card = checkbox.closest(".todo");
  let nextCard = card.nextElementSibling;
  if (nextCard) {
    nextCard.classList.add('highlight');
  }
  ...
}
```

## Searching descendants

Each *element* supports both `querySelector` and `querySelectorAll` to search its descendants. These work the same as `document.querySelector` and `document.querySelectorAll` except that they begin at the given element and search its descendants.


# Tasks to Accomplish
Check your understanding of the above by accomplishing the tasks listed in
index.html.
