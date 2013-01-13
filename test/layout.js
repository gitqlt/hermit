'use strict';
/*jshint asi: true */

var test = require('tape')
  , parse = require('../lib/parse')
  , layout = require('../lib/layout')
  , render = require('../lib/render')
  
function inspect(obj, depth) {
  return require('util').inspect(obj, false, depth || 5, true);
}

var src = [
    '<h2>outside</h2>'
  , '<ul>'  
  , ' <li>' 
  , '   <p>- One Level List</p>'  
  , '     <ul>'  
  , '       <li>' 
  , '         <p>- Two Levels List</p>' 
  , '       </li>'  
  , '     </ul>'  
  , ' </li>'  
  , '</ul>'
].join('\n')

test('render parsed: \n' + src + '\nwith list indent "12"', function (t) {
  parse(src, function (err, res) {
    var expected = 
          '\n\noutside\n12- One Level List\n' 
        + '\n1212- Two Levels List\n\n'
      , layedout = layout(res, { listIndent: '12' })
      , result = render(layedout)

    t.equals(result, expected, 'returns result that renders to ' + expected)
    t.end()
  });  
})

test('render parsed: \n' + src + '\nwith list indent "1234"', function (t) {
  parse(src, function (err, res) {
    var expected = 
          '\n\noutside\n1234- One Level List\n'
        + '\n12341234- Two Levels List\n\n'
      , layedout = layout(res, { listIndent: '1234' })
      , result = render(layedout)

    t.equals(result, expected, 'returns result that renders to ' + expected)
    t.end()
  });  
})
