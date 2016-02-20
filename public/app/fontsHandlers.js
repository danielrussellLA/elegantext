angular.module('fontsHandlers', [])
.controller('fontCtrl', function($scope, NewFontGenerator){
  $scope.font = 'Source Sans Pro';
  // $scope.fontFam = $scope.font;
  $scope.link = '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css">';
  $scope.data = data[0].fonts;

    $scope.h1letterSpacing = '3px';
    $scope.pletterSpacing = '1px';
    $scope.h1fontWeight = 'lighter';
    $scope.pfontWeight = 'lighter';
    $scope.plineHeight = '2em';

  textEditor.on("change", function(cm, change) {

      $scope.applyStyle();
      $scope.$apply();

  });


  $scope.applyStyle = function(){
    //on key press (change) in the textEditor, update the styles in fontView.
    var css = textEditor.doc.getValue();

    // LETTER SPACING
    var letterSpacing = css.match(/letter-spacing: [\w]+/g);
    var h1Style = letterSpacing[0].match(/ \w+/g).join('');
    var pStyle = letterSpacing[1].match(/ \w+/g).join('');

    // // FONT-FAMILY
    // var family = css.match(/font-family: "[\w ]+"/g);
    // console.log(family);
    // var fam = family[0].match(/ "[\w ]+"/g).join('');
    // console.log(fam);
    // FONT-WEIGHT
    var fontWeight = css.match(/font-weight: [\w]+/g);
    var h1Weight = fontWeight[0].match(/ \w+/g).join('');
    var pWeight = fontWeight[1].match(/ \w+/g).join('');

    // LINE-HEIGHT
    var lineHeight = css.match(/line-height: [\w]+/g);
    var plHeight = lineHeight[0].match(/ \w+/g).join('');

    // FORMAT STYLES PROPERLY
    // var fontFam = getRidOfSpaces(fam);
    var h1Spacing = getRidOfSpaces(h1Style);
    var pSpacing = getRidOfSpaces(pStyle);
    var h1fontWeight = getRidOfSpaces(h1Weight);
    var pfontWeight = getRidOfSpaces(pWeight);
    var plineHeight = getRidOfSpaces(plHeight);

   // APPLY STYLES
  //  $scope.fontFam = fontFam;
   $scope.h1letterSpacing = h1Spacing;
   $scope.pletterSpacing = pSpacing;
   $scope.h1fontWeight = h1fontWeight;
   $scope.pfontWeight = pfontWeight;
   $scope.plineHeight = plineHeight;

  //HELPER FUNCTIONS
  function getRidOfSpaces (str) {
     var result = '';
     for(var i = 0; i < str.length; i++){
       if(str[i] !== ' '){
         result += str[i];
       }
     }
     return result;
   }

  };

  $scope.applyNewFont = function(){
    var fontInfo = NewFontGenerator.getRandomFont($scope.data);
    $scope.font = fontInfo.name;
    $scope.link = '<link href="' + fontInfo.url + '" rel="stylesheet" type="text/css">';
    NewFontGenerator.changeTextEditorFont($scope.font);
  };

  $scope.autoRender = function(){
    NewFontGenerator.dynamicStyleUpdate();
  };
})
.factory('NewFontGenerator', function(){

  var getRandomFont = function(data){
    var randomIndex = Math.floor(Math.random() * data.length);

    return data[randomIndex];
  };

  var changeTextEditorFont = function(font){
    var newText = '*  {\n  font-family: "' + font + '", sans-serif; \n  font-variant: 300;\n}\n' +
                        'h1  {\n  font-weight: lighter;\n  text-align: center;\n  letter-spacing: 3px;\n}' + '\n' +
                        'p  {\n  font-weight: lighter;\n  letter-spacing: 1px;\n  line-height: 2em;\n  text-indent:2em;\n}';
    textEditor.doc.setValue(newText);
  };

  var dynamicStyleUpdate = function(scope){

  };

  return {
    getRandomFont: getRandomFont,
    changeTextEditorFont: changeTextEditorFont,
    dynamicStyleUpdate: dynamicStyleUpdate
  };

});
