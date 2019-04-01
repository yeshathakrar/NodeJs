let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'choose option';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

let table = document.getElementById('tblData');

function AddData() {
	var data = {};
	data.name = prompt("Please enter name to be added", "Name");			
	var json = JSON.stringify(data);
	const url = 'http://localhost:3000/PostName';	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			alert('data posted');
			document.location.reload();
		} else {
			alert('Error');
		}
	}
	xhr.send(json); 
}

function updateItem(id) {
	var url = "http://localhost:3000/url";

	var data = {};
	data.name = prompt("Please enter name to be updated", "Name");	
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url+'/'+id, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			alert('name updated');
			document.location.reload();
		} else {
			console.error('error');
		}
	}
	xhr.send(json);
}

const url = 'http://localhost:3000/url';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
	if (request.status === 200) {
		const data = JSON.parse(request.responseText);
		let option;
		for (var i = 0; i < data.length; i++) {
			var row = table.insertRow(i+1);
			var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
			cell1.innerHTML = data[i].name;
			cell2.innerHTML = '<button onclick="updateItem('+(i+1)+')">update</button>';
			cell3.innerHTML = '<button onclick="deleteItem('+(i+1)+')">delete</button>';
			option = document.createElement('option');
			option.text = data[i].name;
			option.value = data[i].name;
			dropdown.add(option);
		}
	}
	else {
		console.log('returned error');
	}
};

function deleteItem(id) {
	var url = "http://localhost:3000/url";

	var data = {};
	//data.name = prompt("Please enter name to be updated", "Name");	
	data.id = id;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url+'/'+id, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			alert('name deleted');
			document.location.reload();
		} else {
			console.error('error');
		}
	}
	xhr.send(json);
}

request.onerror = function() {
	console.log('returned error');
};

request.send();