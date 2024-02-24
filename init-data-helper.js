/**
 * A helper JS file to get the initial data of 24 Hour of Lemons events.
 * To run it, navigate to the the url[1] and copy / paste the contents
 * of this file in to the browser console.  It will output a 
 * stringified JSON array of the events
 * 
 * 1. https://24hoursoflemons.com/schedule/#race
 */


function getBasicEventInfo(data) {
	//debugger;
	let url = data.item(0).childNodes[1].href;
	let eventLocation = data.item(0).textContent.trim();
	let eventType = '';

	if (url.includes('race')) {
		eventType = 'race';
	} else if (url.includes('rally')) {
		eventType = 'rally';
	}

	return {
		'url': url,
		'eventLocation': eventLocation,
		'eventType': eventType
	};
}

function getEventDate(data) {
	let originalText = data.item(1).textContent.trim();
	if (originalText.includes('Entry')) {
		return originalText.substring(0, originalText.indexOf('Entry'));
	}
	return originalText;
}

function getEventName(data) {
	return data.item(2).textContent.trim();
}

function processEntries(data) {
	//debugger;
	const entriesData = [];
	const entriesCount = entries.length;

	for (var i = 0; i < entriesCount; i++) {
		//debugger;
		try {
			let row = entries[i].getElementsByClassName('row');
			let colsItem = row.item(0);
			let cols = colsItem.getElementsByClassName('col-sm');
			let eventData = getBasicEventInfo(cols);
			eventData['dateInfo'] = getEventDate(cols);
			eventData['eventName'] = getEventName(cols);
			entriesData.push(eventData);
		} catch(e) {
			console.warn(e);
		}
	}

	//debugger;
	//console.log('%j', entriesData);
	console.log(JSON.stringify(entriesData));
}

const entries = window.document.getElementsByClassName('container mb-20 d-none d-md-flex');

if (!entries) {
	console.alert('No entries found!');
} else {
	console.log(entries.length);
}

processEntries(entries);