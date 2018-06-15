
// UI Controller
let UIController = ( _ => {

	let DOMStrings = {
			urlInput: 'URL',
			submitBtn: 'submitBtn',
			list: 'list'
	}

	return {

		getInput: _ => {
			
			return {
				url: document.getElementById(DOMStrings.urlInput).value
			}

		},

		getDOMStrings: _ => {
			return DOMStrings
		},

		displayLinks: _ => {
			let list = document.getElementById(DOMStrings.list)
			let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			list.innerHTML = ''
			bookmarks.forEach(x => {

				list.innerHTML += `
					<div class="item">
						<div class="content">
							<img src="https://www.freeiconspng.com/uploads/bookmarks-icon-12.png">
							<a target="blank" href="${x.url}"><p>${x.name}</p></a>
						</div>
						<button onclick="bookmarksController.removeItem('${x.url}')" ><i class="fas fa-trash-alt"></i></button>
					</div>
				`
			})
		}
	}
})();

// Bookmarks Controller
let bookmarksController = ( UICtrl => {
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	const apiURL = "https://opengraph.io/api/1.1/site/http%3A%2F%2F";
	const appID = "?app_id=5b23e9b2d1c0d31e0a8cdd0f";
	//https://opengraph.io/api/1.1/site/http%3A%2F%2Fwww.google.com?app_id=5b239dcbd0c5347950acebc7
	return {
		addItem: function() {


			let	bookmark = {
				url: 'http://' + UICtrl.getInput().url, // what ever is in the input field.
				name: UICtrl.getInput().url
			}

			if(!UICtrl.getInput().url){
				alert('You need to add a URL');
				return false;
			}

			if (localStorage.getItem('bookmarks') === null) {
			
				// create bookmarks array
				var bookmarks = [];
				
				// add to array
				bookmarks.push(bookmark);
				
				// set to localStorage
				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
				
			} else {
			
				// get bookmarks from localstorage
				let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
				
				// add book mark to bookmark array
				bookmarks.push(bookmark);
				
				// reset back to localstorage
				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));	
			}
			//location.reload();
			UICtrl.displayLinks();

		},

		removeItem: url => {
			let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			console.log(bookmarks)
			bookmarks.forEach((x,i) => {
				if(x.url === url) {
					bookmarks.splice(i, 1)
				}
			});
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
			UICtrl.displayLinks();
		}


	}
})(UIController);

// Global App Controller
let appController = ( (UICtrl, BMCtrl) => {
	
	let setupEventListeners = _ => {
		let DOM = UICtrl.getDOMStrings();
		let btn = document.getElementById(DOM.submitBtn);
		btn.addEventListener('click', BMCtrl.addItem);
	}

	return {
		init: _ => {
			console.log('Application has started!');
			setupEventListeners();
			UICtrl.displayLinks();
		}
	}
})(UIController, bookmarksController);

appController.init();
