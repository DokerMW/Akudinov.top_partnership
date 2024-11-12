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