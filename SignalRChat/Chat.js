$(function () {
    function User(username, htmlListItem) {
        var self = {};
        var username = username;
        var rxTyping = new Rx.Subject();
        var htmlListItem = htmlListItem;

        rxTyping.AsObservable()      // RX 
            .Do(function (user) { htmlListItem.html(username + " ..."); })
            .Throttle(1200)
            .Subscribe(function (user) { htmlListItem.html(username); });

        self.typing = function () {
            rxTyping.OnNext(username);
        };

        return self;
    }

    var onlineUsers = null;
    var userList = [];
    var chat = $.connection.chat;

    var getUsers = function () {
        chat.getUsers().done(function (users) {
            onlineUsers = users;
            updateUserList();
        });
    };

    var updateUserList = function () {
        $('#users li').remove();
        userList = [];

        $.each(onlineUsers, function () {
            var listItem = $('<li>{0}</li>'.format(this.Name));
            $('#users').append(listItem);

            userList[this.Name] = User(this.Name, listItem);
        });
    };

    var send = function () {
        if ($('#msg').val() !== '') {
            chat.send($('#msg').val());
            $("#msg").val('');
        }
    };

    var login = function () {
        if ($('#name').val() !== '') {
            clientName = $('#name').val();

            chat.logon(clientName, function () {
                $("#info").toggle();
                $("#chat").toggle();
                $('#msg').focus();
                getUsers();
            }).fail(function (e) {
                $('#login_error').html(e);
            });
        }
    };

    var logout = function () {
        chat.logout();
    }

    var keypressed = function () {
        chat.keypressed();
    }

    // Callbacks from server
    chat.message = function (user, msg, time) {
        $('#message-list').append('<li class="message">{0} {1}: {2}</li>'.format(time, user, msg));
        $("#messages").prop({ scrollTop: $("#messages").prop("scrollHeight") });
    };

    chat.loggedOn = function (user, time) {
        $('#message-list').append('<li class="info">{0} {1} logged on</li>'.format(time, user));
        getUsers();
    };

    chat.loggedOff = function (user, time) {
        $('#message-list').append('<li class="info">{0} {1} logged off</li>'.format(time, user));
        getUsers();
    };
        
    chat.userTyping = function (user) {
        userList[user].typing();
    };

    // Form events
    $("#btn_send").click(function () { send(); $('#msg').focus(); });
    $("#btn_login").click(function () { login(); });
    $("#btn_logout").click(function () { logout(); });
    $('#chatform').submit(function () { send(); return false; });
    $('#startform').submit(function () { login(); return false; });

    $("#msg").toObservable("keypress") // RX 
        .OneInTime(1000)
        .Subscribe(function () { keypressed(); });

    // Logout when user closes browser
    window.onbeforeunload = function () { logout(); };

    // Start chat
    $.connection.hub.start();

    $("#chat").toggle();
    $('#name').focus();

});