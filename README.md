 


## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer 1 :
getElementById --  We can use getElementById for selecting unique element from DOM with and id name. and we can't use multiple id in one getElementById method

getElementByClassName --  With getElementByClassName we can select single class element from dom. its use for only with class name. 

querySelector --  With the querySelector we can select any element with id or classes fom the DOM but single element not multiple. But This time we have to use # for id and . for class notation specifically.

querySelectorAll --  With the querySelectorAll method we can select multiple element with id or classes fom the DOM. This time  we also have to use # or . notation but we can use multiple class or id.


### 2. How do you create and insert a new element into the DOM?

Answer 2: To create a new html element we can use document.createElement('tagName')
and for inserting it we can define a empty html tag in the index.html like section or artical and after defining it we have to grab it by id or class name and after that we can use  the selectionName.innerHtml = ` 
newCreatedElement` like this as we are pushing an html tag.

### 3. What is Event Bubbling? And how does it work?

Answer 3: Event Bubbling is a process , when an event happens on an element (like a click) it doesn’t just stay there it bubbles up to its parent elements all the way to the root of the document. like if we click  button inside so many parent div or section the divs and section also got clicked. We can stop this with event.stopPropagation() method.


### 4. What is Event Delegation in JavaScript? Why is it useful?

Answer 4 : Event Delegation is a technique where we attach a single event listener to a parent element to handle events for its child elements, instead of attaching individual event listeners to each child. its reduce memory consumption and we can handle click or events in many new incoming child or the parent element.


### 5. What is the difference between preventDefault() and stopPropagation() methods?

Answer 5: preventDefault() is used for preventing the page reload when a form was submitted in a html form .
and the stopPropagation() method is used for stop the event from bubbling to its parent.

