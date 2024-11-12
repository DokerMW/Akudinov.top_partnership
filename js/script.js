

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	this.nodes = document.querySelectorAll("[data-da]");

	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}


const iconMenu = document.querySelector('.main-header__burger');
if (iconMenu) {
	const menuBody = document.querySelector('.header__mobile-menu');
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}



const swiperExamples = new Swiper('.examples__swiper', {
	direction: 'horizontal',
	loop: false,
	slidesPerView: 3,
	spaceBetween: 20,
	autoHeight: true,
	navigation: {
		nextEl: '.examples__next-btn',
		prevEl: '.examples__prev-btn',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		769: {
			slidesPerView: 2,
		},
		1260: {
			slidesPerView: 3,
		},
	},
});


const swiperClients = new Swiper('.clients__swiper', {
	direction: 'horizontal',
	loop: false,
	slidesPerView: 6,
	spaceBetween: 55,
	autoHeight: false,
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.clients__next-btn',
		prevEl: '.clients__prev-btn',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		769: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 6,
		},
	},
});


const swiperReviewsText = new Swiper('.text-reviews__swiper', {
	direction: 'horizontal',
	loop: false,
	slidesPerView: 3,
	spaceBetween: 20,
	autoHeight: true,
	navigation: {
		nextEl: '.reviews-text__next-btn',
		prevEl: '.reviews-text__prev-btn',
	},
	breakpoints: {

		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		1195: {
			slidesPerView: 3,
		},
	},
});
const swiperReviewsVideo = new Swiper('.video-reviews__swiper', {
	direction: 'horizontal',
	loop: false,
	slidesPerView: 4,
	spaceBetween: 20,
	autoHeight: false,
	navigation: {
		nextEl: '.reviews-video__next-btn',
		prevEl: '.reviews-video__prev-btn',
	},
	breakpoints: {

		320: {
			slidesPerView: 1,
			spaceBetween: 50,
			centeredSlides: true,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1195: {
			slidesPerView: 4,
		},
	},
});

new Accordion('.accordion-included', {
	duration: 400,
	showMultiple: true,
});


const tabBtns = document.querySelectorAll('.tabs__btn');
const videoTab = document.getElementById('video')
const textTab = document.getElementById('text')

tabBtns.forEach(e => {
	e.addEventListener('click', e => {
		for (let i = 0; i < tabBtns.length; i++) {
			tabBtns[i].classList.remove('active');
		}
		e.target.classList.add('active');
		tabOpening(e)
	})
})

const tabOpening = (event) => {
	if (event.target.id == 'video-review') {
		textTab.classList.remove('active')
		videoTab.classList.add('active')
	} else if (event.target.id == 'text-review') {
		videoTab.classList.remove('active')
		textTab.classList.add('active')
	}
}




function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

let unlock = true;
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');

			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});
const arrows = document.querySelectorAll('.item-tariff__mirror-link');
const arrowsReverse = document.querySelectorAll('.item-tariff__mirror-link_reverse');

arrows.forEach(e => {
	let parent = e.closest('.tariff__column')
	e.addEventListener('click', e => {
		parent.classList.add('reverse')
	})
})
arrowsReverse.forEach(e => {
	let parent = e.closest('.tariff__column')
	e.addEventListener('click', e => {
		parent.classList.remove('reverse')
	})
})
const allInputs = document.querySelectorAll('input');
const forms = document.querySelectorAll('form[id^="form"]');
const testName = /[а-яА-Яa-zA-Z\\s]+/;
const testEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const testPhone = /^\+?[0-9][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
const testDomen = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

forms.forEach(e => {
	let allInputs = document.querySelectorAll('input');
	e.addEventListener('submit', event => {
		allInputs.forEach(e => {
			if (e.classList.contains('success')) {
				e.classList.remove('success')
			}
		})
		let inputTel = event.target.querySelector('input[name="phone"]');
		let inputName = event.target.querySelector('input[name="name"]');
		let inputEmail = event.target.querySelector('input[name="email"]');
		let inputDomen = event.target.querySelector('input[name="domen"]');

		const validate = (inputName, test) => {
			if (inputName) {
				if (test.test(inputName.value)) {
					inputName.classList.add('success')
				} else {
					let parent = inputName.closest('.input');
					event.preventDefault();
					inputName.classList.add('error')
					parent.classList.add('error')
				}
			}
		}

		validate(inputEmail, testEmail)
		validate(inputTel, testPhone)
		validate(inputName, testName)
		validate(inputDomen, testDomen)

	});
})

allInputs.forEach(e => {
	e.addEventListener('focus', event => {
		if (event.target.classList.contains('error')) {
			let parent = event.target.closest('.input');
			event.target.classList.remove('error')
			parent.classList.remove('error')
		}
	});
})
