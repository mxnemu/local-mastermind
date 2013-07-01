/////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2012 Nehmulos
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
// claim that you wrote the original software. If you use this software
// in a product, an acknowledgment in the product documentation would be
// appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
// misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source
// distribution.
/////////////////////////////////////////////////////////////////////////////

function Utils() {}

Utils.shuffleArray = function(array) {
  var tmp, rand;
  for(var i = 0; i < array.length; i++)
  {
    rand = Math.floor(Math.random() * array.length);
    tmp = array[i]; 
    array[i] = array[rand]; 
    array[rand] = tmp;
  }
  return array;
}

if (!window.assert) {
    window.assert = function(condition) {
        if (!condition) {
            throw new Error("assertation failed");
        }
    }
}

function lineCrossingPosition(a, b, onGivenDistanceCheck) {
    var yIncrementA = (a.nodeB.position.y - a.nodeA.position.y) /
                      (a.nodeB.position.x - a.nodeA.position.x);
    var yIncrementB = (b.nodeB.position.y - b.nodeA.position.y) /
                      (b.nodeB.position.x - b.nodeA.position.x); 
    
    if (yIncrementA == yIncrementB) {
        return null;
    }
    
    var yOriginA = a.nodeA.y - (yIncrementA * a.nodeA.x);
    var yOriginB = b.nodeA.y - (yIncrementA * b.nodeA.x);
    
    var x = (yIncrementA - yIncrementB) /
            (yIncrementB - yIncrementA);

    var ret = {
        x: x,
        y: (yIncrementA * x) + yOriginA
    };
    
    // TODO improve calc for vl
    if (!isFinite(ret.x) || !isFinite(ret.y)) {
        return null;
    }
    
    // FAILED DOSN'T CHECK IF SHIT'S ON LINE GOTTA SLEEP TO DO THIZ SHIT
    if (onGivenDistanceCheck || onGivenDistanceCheck == undefined) {
        var smallestAy = a.nodeA.position.y < a.nodeB.position.y ? a.nodeA.position.y : a.nodeB.position.y
        var smallestBy = b.nodeA.position.y < b.nodeB.position.y ? b.nodeA.position.y : b.nodeB.position.y
        var biggestAy = a.nodeA.position.y > a.nodeB.position.y ? a.nodeA.position.y : a.nodeB.position.y
        var biggestBy = b.nodeA.position.y > b.nodeB.position.y ? b.nodeA.position.y : b.nodeB.position.y;
        
        if ((ret.y < smallestAy && ret.y < smallestBy) ||
            (ret.y > biggestAy && ret.y > biggestBy)) {
            return null;
        }
    }
    
    return ret;
}
    

function randomBoolean() {
    return Math.random() > 0.5;
}

function randomInRange(minResult, maxResult) {
    return minResult + (Math.random()*(maxResult-minResult))
}

function randomElementInArray(array) {
    return array[Math.floor(randomInRange(0, array.length))];
}

/// do not confuse with randomElementInArray this one takes a 2dim array as range
function randomInRangearray(rangearray) {
    return randomInRange(rangearray[0], rangearray[1])
}

// thanks to TheVillageIdiot @ stackoverflow.com
// http://stackoverflow.com/questions/1056562/stupid-seo
function preventArrowKeyScrolling() {

    var ar=new Array(33,34,35,36,37,38,39,40);

    $(document).keydown(function(e) {
         var key = e.which;
          //console.log(key);
          //if(key==35 || key == 36 || key == 37 || key == 39)
          if($.inArray(key,ar) > -1) {
              e.preventDefault();
              return false;
          }
          return true;
    });
}

// ie8 does not supply a console object, when you don't open the dev tools
if (!window.console) {
    window.console = {
        log: function() {},
        info: function() {},
        warn: function() {},
        debug: function() {},
        error: function() {},
        group: function() {},
        groupCollapsed: function() {},
        groupEnd: function() {},
        time: function() {},
        timeEnd: function() {},
        clear: function() {}
    }
}
