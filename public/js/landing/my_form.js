window.addEventListener('load', function (event) {
    const thanks = document.getElementById("thanks")

    const form = document.getElementById("myForm")

    function sendData() {
        const FD = new FormData(form)

        fetch('http://142.93.139.219:8010/mail-submit', {
            method: 'post',
            body: FD,
        })
        .then(function (response) {
            console.log('Request succeeded with JSON response', response);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        thanks.style.display = "block"
        setTimeout(function () {
            thanks.style.display = "none"
            thanks.classList.add("fade-out")
            form.reset()
        }, 5000)

        sendData();

        messageUs.style.display = "none"
        thanks.style.display = "block"

        setTimeout(function () {
            messageUs.style.display = "block"
            thanks.style.display = "none"
            form.reset()
        }, 5000)
    });
})
