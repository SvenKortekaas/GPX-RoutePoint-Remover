var data = null;
$(function () {
	$("#upload").bind("click", function () {
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.gpx)$/;
		if (regex.test($("#fileUpload").val().toLowerCase())) {
			if (typeof (FileReader) != "undefined") {
				var reader = new FileReader();
				reader.onload = function (e) {
					data = e.target.result;
					$("#fileData").val(data);
				}
				reader.readAsText($("#fileUpload")[0].files[0]);
			} else {
				alert("This browser does not support HTML5.");
			}
		} else {
			alert("Please upload a .GPX file.");
		}
	});
});

$(function () {
	$("#parse").bind("click", function () {
		var xml = $('textarea#fileData').val(),
		xmlDoc = $.parseXML(xml),
		$xml = $(xmlDoc);
		$xml.find("rte").remove();
		$("#resultArea").val($xml.text());
		var stringXml = new XMLSerializer().serializeToString($xml[0]);
		$("#xmlArea").val(stringXml);
	});
});

$(function () {
	$("#showResult").bind("click", function () {
		document.getElementById("resultRow").style.display = "inline";
	});
});

$(function () {
	$("#reset").bind("click", function () {
		document.getElementById("debugDataRow").style.display = "none";
		document.getElementById("resultRow").style.display = "none";
		document.getElementById("showResult").style.display = "none";
		document.getElementById("reset").style.display = "none";
		data = null;
		$("#fileData").val("");
		$("#resultArea").val("");
		$("#xmlArea").val("");
	});
});