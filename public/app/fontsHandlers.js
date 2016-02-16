angular.module('fontsHandlers', [])
.controller('fontCtrl', function($scope, NewFontGenerator){
  $scope.font = 'Source Sans Pro';
  $scope.link;
  $scope.data = data[0].fonts;
  $scope.myStyle;



  $scope.applyNewFont = function(){
    var fontInfo = NewFontGenerator.getRandomFont($scope.data);
    $scope.font = fontInfo.name;
    $scope.link = '<link href="' + fontInfo.url + '" rel="stylesheet" type="text/css">';
    console.log($scope.link);
    $scope.myStyle = '{ fontFamily: "'  + $scope.font + '"; }';
    NewFontGenerator.changeTextEditorFont($scope.font);
    console.log($scope.myStyle);
    //$scope.renderNewFont();
  };

  // $scope.renderNewFont = function(){
  //   var fontFamily = $scope.font;
  //   $scope.myStyles = ".something:after { font-family: " + fontFamily + "; }";
  //
  // };
})
.factory('NewFontGenerator', function(){

  var getRandomFont = function(data){
    var randomIndex = Math.floor(Math.random() * data.length);

    return data[randomIndex];
  };

  var changeTextEditorFont = function(font){
    var newText = '*  {\n  font-family: "' + font + '", sans-serif; \n}\n' +
                        'h1  {\n  font-weight: lighter;\n  text-align: center;\n  letter-spacing: 3px;\n}' + '\n' +
                        'p  {\n  font-weight: lighter;\n  letter-spacing: 1.1px;\n  line-height: 2em;\n  text-indent:2em;\n}';
    textEditor.doc.setValue(newText);
  };

  return {
    getRandomFont: getRandomFont,
    changeTextEditorFont: changeTextEditorFont
  };

});
