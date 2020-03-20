const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mesg1')
const messageTwo = document.querySelector('#mesg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading.....'
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forcast
            }
        })
    })
})