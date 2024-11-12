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



