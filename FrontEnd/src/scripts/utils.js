export function alert(message, color) {
    var alertDiv = document.getElementById('AlertDiv');
    alertDiv.innerHTML = `<strong>${message}</strong>`;
    alertDiv.classList.add(`alert-${color}`);
    alertDiv.style.display = 'block';
    setTimeout(function () {
        alertDiv.style.display = 'none';
    }, 3000);
}