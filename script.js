(function() {
  //  https://github.com/Lane/jquery.typeText
  $(document).ready(function() {
    // print the text inside the div
    return $(".print").typeText({
      then: function() {
        // or pass a string
        return this.typeText(".......................", {
          typeSpeed: 250,
          then: function() {
            return this.typeText(".......................", {
              typeSpeed: 500
            });
          }
        });
      }
    });
  });

  // typeText([String], [Object])
  // ----
  // @param printString [String] when the first paramater is a string,
  //   it will be appended to the element instead of printing its contents
  // @param options [Object] options for typing the text
  // @option lineWait [Number] how long to wait at a new line in ms
  // @option typeSpeed [Number] delay before typing a new character in ms
  // @option then [Function] a function to execute when it's done typing
  (function($) {
    return $.fn.typeText = function() {
      var addString, defaultOptions, options;
      
      // process args
      if (arguments.length === 1) {
        if (typeof arguments[0] === "string") {
          addString = arguments[0];
          options = {};
        } else {
          options = arguments[0];
        }
      } else if (arguments.length === 2) {
        addString = arguments[0];
        options = arguments[1];
      } else {
        throw new Error("incorrect number of args for typeText");
      }
      
      // default options if necessary
      defaultOptions = {
        typeSpeed: 50,
        lineWait: 1000,
        then: function() {}
      };
      // extended options
      options = $.extend(defaultOptions, options);
      
      // for each element in the selection
      return this.each(function() {
        var _el, addToFinishedQueue, afterHandlers, currentEl, index, init, lineIndex, onTick, printLine, printedString, setString, stringArray, triggerFinished, typeInterval, wholeString;
        
        // store a reference to the jQuery element
        _el = $(this);
        stringArray = [];
        wholeString = printedString = "";
        index = lineIndex = 0;
        typeInterval = currentEl = null;
        afterHandlers = [];
        // sets the elements HTML value
        // cursor blinks every 3rd character while it's printing
        setString = (newString = null) => {
          if (!newString) {
            newString = printedString;
          }
          return currentEl.text(newString);
        };
        // appends a character on the printed string
        // for every tick. Clears the timer and triggers
        // any callbacks when finished
        onTick = () => {
          if (index < wholeString.length) {
            // add a character to the string
            printedString += wholeString[index++];
            return setString();
          } else {
            // finished printing the string, 
            // clean up and print the next line
            setString(wholeString);
            clearInterval(typeInterval);
            if (lineIndex < stringArray.length) {
              // print the next line
              return setTimeout(() => {
                currentEl.removeClass("printing");
                currentEl = $(this).children().eq(lineIndex);
                return printLine(stringArray[lineIndex++]);
              }, options.lineWait);
            } else {
              // trigger any callbacks
              return triggerFinished();
            }
          }
        };
        // prints a line of text
        printLine = function(printString) {
          wholeString = printString;
          printedString = "";
          index = 0;
          // printing class adds the cursor
          currentEl.addClass("printing");
          return typeInterval = setInterval(onTick, options.typeSpeed);
        };
        // adds a function to the callback queue
        addToFinishedQueue = function(cb) {
          return afterHandlers.push(cb);
        };
        // executes the callback functions
        triggerFinished = function() {
          var handler, i, len, results;
          currentEl.removeClass("printing");
          results = [];
          for (i = 0, len = afterHandlers.length; i < len; i++) {
            handler = afterHandlers[i];
            results.push(handler.apply(_el));
          }
          return results;
        };
        init = function() {
          var newParagraph;
          // add the callback to the queue
          addToFinishedQueue(options.then);
          if (addString) {
            // we are adding a new string
            // append a paragraph
            newParagraph = $("<p></p>");
            stringArray.push(addString);
            _el.append(newParagraph);
            currentEl = newParagraph;
          } else {
            // we are printing the child elements
            // store all of the text of child elements
            _el.children().each(function() {
              stringArray.push($(this).text());
              return $(this).text("");
            });
            // store the current element and print the text
            currentEl = _el.children().eq(lineIndex);
          }
          return printLine(stringArray[lineIndex++]);
        };
        init();
        return this;
      });
    };
  })(jQuery);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQTBDO0VBQUE7RUFFMUMsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUEsRUFBQTs7V0FFaEIsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLFFBQVosQ0FDRTtNQUFBLElBQUEsRUFBTSxRQUFBLENBQUEsQ0FBQSxFQUFBOztlQUVKLElBQUksQ0FBQyxRQUFMLENBQWMseUJBQWQsRUFDRTtVQUFBLFNBQUEsRUFBVyxHQUFYO1VBQ0EsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO21CQUNKLElBQUksQ0FBQyxRQUFMLENBQWMseUJBQWQsRUFDRTtjQUFBLFNBQUEsRUFBVztZQUFYLENBREY7VUFESTtRQUROLENBREY7TUFGSTtJQUFOLENBREY7RUFGZ0IsQ0FBbEIsRUFGMEM7Ozs7Ozs7Ozs7RUFzQjFDLENBQUMsUUFBQSxDQUFDLENBQUQsQ0FBQTtXQUVDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBTCxHQUFnQixRQUFBLENBQUEsQ0FBQTtBQUVsQixVQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsT0FBQTs7O01BQ0ksSUFBRyxTQUFTLENBQUMsTUFBVixLQUFvQixDQUF2QjtRQUNFLElBQUcsT0FBTyxTQUFTLENBQUMsQ0FBRCxDQUFoQixLQUF3QixRQUEzQjtVQUNFLFNBQUEsR0FBWSxTQUFTLENBQUMsQ0FBRDtVQUNyQixPQUFBLEdBQVUsQ0FBQSxFQUZaO1NBQUEsTUFBQTtVQUlFLE9BQUEsR0FBVSxTQUFTLENBQUMsQ0FBRCxFQUpyQjtTQURGO09BQUEsTUFNSyxJQUFHLFNBQVMsQ0FBQyxNQUFWLEtBQW9CLENBQXZCO1FBQ0gsU0FBQSxHQUFZLFNBQVMsQ0FBQyxDQUFEO1FBQ3JCLE9BQUEsR0FBVSxTQUFTLENBQUMsQ0FBRCxFQUZoQjtPQUFBLE1BQUE7UUFJSCxNQUFNLElBQUksS0FBSixDQUFV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QUE7OztZQVVFLEdBQUcsQ0FBQyxRQUFKLENBQUEsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsUUFBQSxDQUFBLENBQUE7Y0FDbEIsV0FBVyxDQUFDLElBQVosQ0FBaUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBQSxDQUFqQjtxQkFDQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLEVBQWI7WUFGa0IsQ0FBcEIsRUFGVjs7WUFNVSxTQUFBLEdBQVksR0FBRyxDQUFDLFFBQUosQ0FBQSxDQUFjLENBQUMsRUFBZixDQUFrQixTQUFsQixFQWRkOztpQkFlQSxTQUFBLENBQVUsV0FBVyxDQUFDLFNBQUEsRUFBRCxDQUFyQjtRQW5CSztRQXFCUCxJQUFBLENBQUE7QUFFQSxlQUFPO01BdEZDLENBQVY7SUF6QmM7RUFGakIsQ0FBRCxDQUFBLENBbUhFLE1BbkhGO0FBdEIwQyIsInNvdXJjZXNDb250ZW50IjpbIiMgIGh0dHBzOi8vZ2l0aHViLmNvbS9MYW5lL2pxdWVyeS50eXBlVGV4dFxuXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuICAjIHByaW50IHRoZSB0ZXh0IGluc2lkZSB0aGUgZGl2XG4gICQoXCIucHJpbnRcIikudHlwZVRleHRcbiAgICB0aGVuOiAtPlxuICAgICAgIyBvciBwYXNzIGEgc3RyaW5nXG4gICAgICB0aGlzLnR5cGVUZXh0IFwiLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIixcbiAgICAgICAgdHlwZVNwZWVkOiAyNTBcbiAgICAgICAgdGhlbjogLT5cbiAgICAgICAgICB0aGlzLnR5cGVUZXh0IFwiLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cIixcbiAgICAgICAgICAgIHR5cGVTcGVlZDogNTAwXG5cbiMgdHlwZVRleHQoW1N0cmluZ10sIFtPYmplY3RdKVxuIyAtLS0tXG4jIEBwYXJhbSBwcmludFN0cmluZyBbU3RyaW5nXSB3aGVuIHRoZSBmaXJzdCBwYXJhbWF0ZXIgaXMgYSBzdHJpbmcsXG4jICAgaXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgZWxlbWVudCBpbnN0ZWFkIG9mIHByaW50aW5nIGl0cyBjb250ZW50c1xuIyBAcGFyYW0gb3B0aW9ucyBbT2JqZWN0XSBvcHRpb25zIGZvciB0eXBpbmcgdGhlIHRleHRcbiMgQG9wdGlvbiBsaW5lV2FpdCBbTnVtYmVyXSBob3cgbG9uZyB0byB3YWl0IGF0IGEgbmV3IGxpbmUgaW4gbXNcbiMgQG9wdGlvbiB0eXBlU3BlZWQgW051bWJlcl0gZGVsYXkgYmVmb3JlIHR5cGluZyBhIG5ldyBjaGFyYWN0ZXIgaW4gbXNcbiMgQG9wdGlvbiB0aGVuIFtGdW5jdGlvbl0gYSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gaXQncyBkb25lIHR5cGluZ1xuXG4oKCQpIC0+XG4gIFxuICAkLmZuLnR5cGVUZXh0ID0gLT5cbiAgICBcbiAgICAjIHByb2Nlc3MgYXJnc1xuICAgIGlmIGFyZ3VtZW50cy5sZW5ndGggaXMgMVxuICAgICAgaWYgdHlwZW9mKGFyZ3VtZW50c1swXSkgaXMgXCJzdHJpbmdcIlxuICAgICAgICBhZGRTdHJpbmcgPSBhcmd1bWVudHNbMF1cbiAgICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICBlbHNlXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMF1cbiAgICBlbHNlIGlmIGFyZ3VtZW50cy5sZW5ndGggaXMgMlxuICAgICAgYWRkU3RyaW5nID0gYXJndW1lbnRzWzBdXG4gICAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiaW5jb3JyZWN0IG51bWJlciBvZiBhcmdzIGZvciB0eXBlVGV4dFwiXG4gICAgXG4gICAgIyBkZWZhdWx0IG9wdGlvbnMgaWYgbmVjZXNzYXJ5XG4gICAgZGVmYXVsdE9wdGlvbnMgPVxuICAgICAgdHlwZVNwZWVkIDogNTBcbiAgICAgIGxpbmVXYWl0IDogMTAwMFxuICAgICAgdGhlbjogLT5cblxuICAgICMgZXh0ZW5kZWQgb3B0aW9uc1xuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCBkZWZhdWx0T3B0aW9ucywgb3B0aW9uc1xuICAgIFxuICAgICMgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgc2VsZWN0aW9uXG4gICAgdGhpcy5lYWNoIC0+XG4gICAgICBcbiAgICAgICMgc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGpRdWVyeSBlbGVtZW50XG4gICAgICBfZWwgPSAkKHRoaXMpXG4gICAgICBcbiAgICAgIHN0cmluZ0FycmF5ID0gW11cbiAgICAgIHdob2xlU3RyaW5nID0gcHJpbnRlZFN0cmluZyA9IFwiXCJcbiAgICAgIGluZGV4ID0gbGluZUluZGV4ID0gMFxuICAgICAgdHlwZUludGVydmFsID0gY3VycmVudEVsID0gbnVsbFxuICAgICAgYWZ0ZXJIYW5kbGVycyA9IFtdXG5cbiAgICAgICMgc2V0cyB0aGUgZWxlbWVudHMgSFRNTCB2YWx1ZVxuICAgICAgIyBjdXJzb3IgYmxpbmtzIGV2ZXJ5IDNyZCBjaGFyYWN0ZXIgd2hpbGUgaXQncyBwcmludGluZ1xuICAgICAgc2V0U3RyaW5nID0gKG5ld1N0cmluZyA9IG51bGwpID0+XG4gICAgICAgIHVubGVzcyBuZXdTdHJpbmdcbiAgICAgICAgICBuZXdTdHJpbmcgPSBwcmludGVkU3RyaW5nXG4gICAgICAgIGN1cnJlbnRFbC50ZXh0IG5ld1N0cmluZ1xuXG4gICAgICAjIGFwcGVuZHMgYSBjaGFyYWN0ZXIgb24gdGhlIHByaW50ZWQgc3RyaW5nXG4gICAgICAjIGZvciBldmVyeSB0aWNrLiBDbGVhcnMgdGhlIHRpbWVyIGFuZCB0cmlnZ2Vyc1xuICAgICAgIyBhbnkgY2FsbGJhY2tzIHdoZW4gZmluaXNoZWRcbiAgICAgIG9uVGljayA9ID0+XG4gICAgICAgIGlmIGluZGV4IDwgd2hvbGVTdHJpbmcubGVuZ3RoXG4gICAgICAgICAgIyBhZGQgYSBjaGFyYWN0ZXIgdG8gdGhlIHN0cmluZ1xuICAgICAgICAgIHByaW50ZWRTdHJpbmcgKz0gd2hvbGVTdHJpbmdbaW5kZXgrK11cbiAgICAgICAgICBzZXRTdHJpbmcoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgIyBmaW5pc2hlZCBwcmludGluZyB0aGUgc3RyaW5nLCBcbiAgICAgICAgICAjIGNsZWFuIHVwIGFuZCBwcmludCB0aGUgbmV4dCBsaW5lXG4gICAgICAgICAgc2V0U3RyaW5nIHdob2xlU3RyaW5nXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCB0eXBlSW50ZXJ2YWxcbiAgICAgICAgICBcbiAgICAgICAgICBpZiBsaW5lSW5kZXggPCBzdHJpbmdBcnJheS5sZW5ndGhcbiAgICAgICAgICAgICMgcHJpbnQgdGhlIG5leHQgbGluZVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICBjdXJyZW50RWwucmVtb3ZlQ2xhc3MgXCJwcmludGluZ1wiXG4gICAgICAgICAgICAgIGN1cnJlbnRFbCA9ICQodGhpcykuY2hpbGRyZW4oKS5lcSBsaW5lSW5kZXhcbiAgICAgICAgICAgICAgcHJpbnRMaW5lIHN0cmluZ0FycmF5W2xpbmVJbmRleCsrXVxuICAgICAgICAgICAgLCBvcHRpb25zLmxpbmVXYWl0XG4gICAgICAgICAgICBcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIHRyaWdnZXIgYW55IGNhbGxiYWNrc1xuICAgICAgICAgICAgdHJpZ2dlckZpbmlzaGVkKClcblxuICAgICAgIyBwcmludHMgYSBsaW5lIG9mIHRleHRcbiAgICAgIHByaW50TGluZSA9IChwcmludFN0cmluZykgLT5cbiAgICAgICAgd2hvbGVTdHJpbmcgPSBwcmludFN0cmluZ1xuICAgICAgICBwcmludGVkU3RyaW5nID0gXCJcIlxuICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgIyBwcmludGluZyBjbGFzcyBhZGRzIHRoZSBjdXJzb3JcbiAgICAgICAgY3VycmVudEVsLmFkZENsYXNzIFwicHJpbnRpbmdcIlxuICAgICAgICB0eXBlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCBvblRpY2ssIG9wdGlvbnMudHlwZVNwZWVkXG5cbiAgICAgICMgYWRkcyBhIGZ1bmN0aW9uIHRvIHRoZSBjYWxsYmFjayBxdWV1ZVxuICAgICAgYWRkVG9GaW5pc2hlZFF1ZXVlID0gKGNiKSAtPlxuICAgICAgICBhZnRlckhhbmRsZXJzLnB1c2ggY2JcblxuICAgICAgIyBleGVjdXRlcyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgICB0cmlnZ2VyRmluaXNoZWQgPSAtPlxuICAgICAgICBjdXJyZW50RWwucmVtb3ZlQ2xhc3MgXCJwcmludGluZ1wiXG4gICAgICAgIGZvciBoYW5kbGVyIGluIGFmdGVySGFuZGxlcnNcbiAgICAgICAgICBoYW5kbGVyLmFwcGx5IF9lbFxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgIyBhZGQgdGhlIGNhbGxiYWNrIHRvIHRoZSBxdWV1ZVxuICAgICAgICBhZGRUb0ZpbmlzaGVkUXVldWUgb3B0aW9ucy50aGVuXG4gICAgICAgIFxuICAgICAgICBpZiBhZGRTdHJpbmdcbiAgICAgICAgICAjIHdlIGFyZSBhZGRpbmcgYSBuZXcgc3RyaW5nXG4gICAgICAgICAgIyBhcHBlbmQgYSBwYXJhZ3JhcGhcbiAgICAgICAgICBuZXdQYXJhZ3JhcGggPSAkKFwiPHA+PC9wPlwiKVxuICAgICAgICAgIHN0cmluZ0FycmF5LnB1c2ggYWRkU3RyaW5nXG4gICAgICAgICAgX2VsLmFwcGVuZCBuZXdQYXJhZ3JhcGhcbiAgICAgICAgICBjdXJyZW50RWwgPSBuZXdQYXJhZ3JhcGhcbiAgICAgICAgZWxzZVxuICAgICAgICAgICMgd2UgYXJlIHByaW50aW5nIHRoZSBjaGlsZCBlbGVtZW50c1xuICAgICAgICAgICMgc3RvcmUgYWxsIG9mIHRoZSB0ZXh0IG9mIGNoaWxkIGVsZW1lbnRzXG4gICAgICAgICAgX2VsLmNoaWxkcmVuKCkuZWFjaCAtPlxuICAgICAgICAgICAgc3RyaW5nQXJyYXkucHVzaCAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgJCh0aGlzKS50ZXh0IFwiXCJcbiAgICAgICAgICAjIHN0b3JlIHRoZSBjdXJyZW50IGVsZW1lbnQgYW5kIHByaW50IHRoZSB0ZXh0XG4gICAgICAgICAgY3VycmVudEVsID0gX2VsLmNoaWxkcmVuKCkuZXEgbGluZUluZGV4XG4gICAgICAgIHByaW50TGluZSBzdHJpbmdBcnJheVtsaW5lSW5kZXgrK11cblxuICAgICAgaW5pdCgpXG5cbiAgICAgIHJldHVybiB0aGlzXG4gXG4pIGpRdWVyeVxuICAgICJdfQ==
//# sourceURL=coffeescript