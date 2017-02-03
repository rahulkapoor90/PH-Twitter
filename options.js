// Saves options to chrome.storage
function save_options() {
        var token = $('#access').val()

    chrome.storage.sync.set({
        phtoken: token
    }, function () {
        // Update status to let user know options were saved.
        //var status = document.getElementById('status');
        var status = $('#status')[0]
        status.textContent = 'Credentials saved.';
        setTimeout(function () {
            status.style.display = 'none';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
jQuery(document).ready(
        function restore_options() {
            // Use default value color = 'red' and likesColor = true.
            chrome.storage.sync.get({
                phtoken: ""
            }, function (items) {
                //document.getElementById('username').value = items.username;
                //document.getElementById('password').value = items.password;

                //Using jquery
                $('#access').val(items.phtoken)
            });
        }
    )
    //document.addEventListener('DOMContentLoaded', restore_options);

//document.getElementById('save').addEventListener('click',save_options);
$('#save').on('click', save_options)
