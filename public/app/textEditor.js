// CodeMirror Text Editor Box:
var textEditor = CodeMirror.fromTextArea(document.getElementById('textEditor'), {
  lineNumbers: true,
  gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

var defaultStyling = '*  {\n  font-family: "Source Sans Pro", sans-serif; \n  font-variant: 300;\n}\n' +
                    'h1  {\n  font-weight: lighter;\n  text-align: center;\n  letter-spacing: 3px;\n}' + '\n' +
                    'p  {\n  font-weight: lighter;\n  letter-spacing: 1.1px;\n  line-height: 2em;\n  text-indent:2em;\n}'
                    ;


textEditor.doc.setValue(defaultStyling);

var text = textEditor.doc.getValue();
console.log(text);
