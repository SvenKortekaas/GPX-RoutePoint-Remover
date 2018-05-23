function saveTextAsFile() {
  var textToWrite = $('textarea#xmlArea').val();
  var textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
  var fileNameToSaveAs = $("#fileUpload").val().replace(/C:\\fakepath\\/i, '');

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
  
  document.getElementById("showResult").style.display = "inline";
  document.getElementById("reset").style.display = "inline";
};

var button = document.getElementById('download');
button.addEventListener('click', saveTextAsFile);

function destroyClickedElement(event) {
  // remove the link from the DOM
  document.body.removeChild(event.target);
};