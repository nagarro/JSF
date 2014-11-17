$$.adapter.restful = function (_params) {
    var params = $.extend({
        url: '/echo/json/',
        dataType: 'json',
        data: {
            'json': JSON.stringify(_params.data)
        },
    }, _params);
    $.ajax(params);
};

// Header
var header = $$({
  model: {},
  view: {
    format: $('#header').html()
  },
  controller: {}
});

// body
var container = $$({
  model: {},
  view: {
    format: $('#content').html()
  },
  controller: {}
});

// Footer
var footer = $$({
  model: {},
  view: {
    format: $('#footer').html()
  },
  controller: {}
});

// Item in list prototype
var item = $$({}, '<li><span data-bind="content"/> <button>x</button></li>', '& span { cursor:pointer; }', {
    'click span': function () {
        var input = prompt('Edit to-do item:', this.model.get('content'));
        if (!input) return;
        this.model.set({
            content: input
        });
    },
        'click button': function () {
        this.destroy();
    },
        'create': function () {
        this.view.$().fadeIn();
    }
});

// second page
var screen2 = $$({}, '<div><span data-bind="heading"/> <button id="new">Add Comment</button> <ul></ul> </div>', {
    'click #new': function () {
        var newItem = $$(item, {
            content: 'My query'
        });
        this.append(newItem, 'ul'); // add to container, appending at <ul>
    }
});

// first page
var screen1 = $$({}, '<div> This is my home <br/><button class="post">Question 1</button><br/> <button class="post"> Question 2</button> <br/><button class="post"> Question 3</button> <br/><div></div> </div>', {
    'click .post': function (event) {
        var ques = $$(screen2, {
          heading: $(event.target).html()
        });
        container.empty();
        container.append(ques);
        container.append(search);

    }
});

// two way binding
var search = $$({query:'Type of query'}, '<p>Enter comment : <input type="search" data-bind="name"/> <br/>You entered- <span data-bind="name"/></p>');

$(document).ready(function () {
    $$.document.append(header);
    $$.document.append(container);
    $$.document.append(footer);
  
    container.append(screen1);
});