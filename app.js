(function(window) {
	// General utilities
	var doc = window.document,
			$ = function(selector) {
				var result = doc.querySelectorAll(selector);
				return (result.length > 1) ? result : result[0];
			};

	Node.prototype.on = Node.prototype.addEventListener;
	NodeList.prototype.on = function(type, func, flag) {
		[].forEach.call(this, function(node, index) {
			node.on(type, func, flag);
		});
	};

	// App related code starts here
	var label = $('.label'),
			labelText = $('.label .text');
			dropDown = $('.dropDown'),
			imgDiv = $('.imgWrapper'),
			actualImage = $('.imgWrapper img'),
			finalImg = $('.finalImg'),
			bkg = "";

	// Handling the events and creating the dropdown
	label.on('click', function(e) {
		dropDown.classList.toggle('dispBlock');
	}, false);

	dropDown.on('click', function(e) {
		var targetLi = e.target;
		bkg = targetLi.getAttribute('data-bkg');

		labelText.innerHTML = targetLi.textContent;
		this.classList.remove('dispBlock');
		setBkg();
		changeCanvasBkg();
	}, false);
	
	function setBkg() {
		imgDiv.style.background = bkg;
	}

	// exporting to canvas
	var canvas = doc.createElement('canvas'),
			context = canvas.getContext('2d'),
			img = new Image();

	finalImg.appendChild(img);

	canvas.width = imgDiv.offsetWidth;
	canvas.height = imgDiv.offsetHeight;

	function changeCanvasBkg() {
		context.fillStyle = bkg;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.drawImage(actualImage, 0, 0);
		
		img.src = canvas.toDataURL('image/png');
	}

}(this));