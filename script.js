const form = document.querySelector(".x__forms__form")
const formName = form.querySelector("#form-name")


const INPUT_MAP = {
    'form-name': {
        'function': formatName,
        'card-input': '.card-name'},
    'form-card-number': {
        'function': formatNumber,
        'card-input': '.card-number'},
    'form-mm': {
        'function': formatMM,
        'card-input': '.card-mm'},
    'form-yy': {
        'function': formatYY,
        'card-input': '.card-yy'},
    'form-cvc': {
        'function': formatCVC,
        'card-input': '.card-cvc'},
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const inputs = [...form.querySelectorAll("input")]
    inputs.forEach(input => {
        hideErrors(input)
        revealErrors(input, checkErrors(input))
    })
    if (!document.querySelector(".input-error")) {
        document.querySelector(".x__forms__thanks").classList.remove("hidden")
        document.querySelector(".x__forms__form").classList.add("hidden")
        
    }
})

function checkErrors(input) {
    if (blankCheck(input)) return "Can't be blank."
    else return formatCheck(input)
}

function blankCheck(input) {
    return input.value == ''
}

function formatCheck(input) {
    const trimmed = input.value.trim()
    return INPUT_MAP[input.id].function(trimmed)
}

function formatName(name) {
    const names = name.split(' ')
    if (names.length < 2) return 'Please provide a full name.'
    if (/[^A-Za-z\s]/.test(name)) return 'Names cannot contain numbers or symbols'
    if (/(^[a-z]|\s[a-z])/.test(name)) return 'Names must be capitalised'
    return ''
}

function formatNumber(number) {
    if (/[^\d ]/.test(number)) return 'Number must only contain digits and spaces'
    if (number.length != 19) return 'Must be 16 numbers with a space every 4 numbers.'
    if (!/ /.test(number)) return 'Must be formatted with a space every 4 numbers.'
    return ''
}

function formatMM(mm) {
    if (!/^\d{2}$/.test(mm)) return "Format MM."
    if (parseInt(mm) > 12) return "Invalid month."
    return ''
}

function formatYY(yy) {
    const mm = document.querySelector("#form-mm").value.trim()
    if (!/^\d{2}$/.test(yy)) return "Format YY."
    return ''
}

function formatCVC(cvc) {
    if (!/^\d{3}$/.test(cvc)) return 'Must be 3 digits.'
    return ''
}

function revealErrors(input, error) {
    if (!error) return
    input.classList.add('input-error')
    const div = input.closest('.input-wrap')
    const message = div.querySelector('.error')
    message.classList.remove('hidden')
    message.innerText = error
}

function hideErrors(input) {
    input.classList.remove('input-error')
    const div = input.closest('.input-wrap')
    const message = div.querySelector('.error')
    message.classList.add('hidden')
    message.innerText = ""
}