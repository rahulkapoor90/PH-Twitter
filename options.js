// Saves options to chrome.storage
function save_options() {
    //var username = document.getElementById('username').value;
      var style = $('input[name=style]:checked').val();
        //var password = document.getElementById('password').value;
    chrome.storage.sync.set({
        style: style
    }, function () {
        // Update status to let user know options were saved.
        //var status = document.getElementById('status');
        var status = $('#status')[0]
        status.textContent = 'Settings saved.';
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
                style: ""
            }, function (items) {
                $('input[name=style]').filter('[value="'+items.style+'"]').attr('checked', true);
            });
        }
    )
    //document.addEventListener('DOMContentLoaded', restore_options);

//document.getElementById('save').addEventListener('click',save_options);
$('#save').on('click', save_options)
