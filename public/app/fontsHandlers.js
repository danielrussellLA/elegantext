angular.module('fontsHandlers', [])
.controller('fontCtrl', function($scope, NewFontGenerator){
  $scope.font = 'Source Sans Pro';
  $scope.h1letterSpacing = '3px';
  $scope.pletterSpacing = '3px';
  $scope.link;
  $scope.data = data[0].fonts;
  // $scope.userInput = textEditor.doc.getValue();
  //
  // $scope.sassy = ".preview{" + $scope.userInput +  "}";
  // sass.compile($scope.sassy, function(result){
  //     $scope.sassy = result;
  //   });

  textEditor.on("change", function(cm, change) {

      $scope.applyStyle();
      $scope.$apply();
      console.log($scope.h1letterSpacing);

  });


  $scope.applyStyle = function(){
    //on key press (change) in the textEditor, update the styles in fontView.
    var css = textEditor.doc.getValue();
    var letterSpacing = css.match(/letter-spacing: [\w]+/g);
    var h1Style = letterSpacing[0].match(/ \w+/g).join('');
    var pStyle = letterSpacing[1].match(/ \w+/g).join('');

    var h1Spacing = '';
    for(var i = 0; i < h1Style.length; i++){
      if(h1Style[i] !== ' '){
        h1Spacing += h1Style[i];
      }
    }

    

    //$scope.h1 = temp;
   $scope.h1letterSpacing = h1Spacing;
  //  $scope.pletterSpacing = pSpacing

  //  var getRidOfSpaces = function (str) {
   //
  //  }
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
                        'p  {\n  font-weight: lighter;\n  letter-spacing: 1.1px;\n  line-height: 2em;\n  text-indent:2em;\n}';
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
