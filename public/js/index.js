var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('H:mm:ss');

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('H:mm:ss');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageBox = jQuery('[name=message]');

    if(messageBox.val() === '') return;

    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function () {
        messageBox.val('');
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function (){
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browswer.');
    }

    locationBtn.attr('disabled', 'disabled')
    .text('Sending...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationBtn.removeAttr('disabled').text('Send location');
        });

    }, function (){
        alert('Unable to fetch location.');
        locationBtn.removeAttr('disabled').text('Send location');
    });
});