<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SignalRChat.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SignalR Chat</title>
    <link rel="stylesheet" type="text/css" href="/Site.css" />
    <script src="/Scripts/jquery-1.6.4.min.js" type="text/javascript"></script>
    <script src="/Scripts/json2.min.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.signalR.js" type="text/javascript"></script>
    <script src="/Scripts/jquery.timer.js" type="text/javascript"></script>
    <script src="/Scripts/rx.js" type="text/javascript"></script>
    <script src="/Scripts/rx.jQuery.js" type="text/javascript"></script>
    <script src="/Scripts/extensions.js" type="text/javascript"></script>
    <script src="/signalr/hubs" type="text/javascript"></script>
    <script src="/Chat.js" type="text/javascript"></script>
</head>
<body>
    <div id="wrap">
        <div id="main">

            <div id="info" class="round">
                <h1>
                    SignalR Chat</h1>
                <form id="startform">
                Enter your name:
                <input type="text" id="name" />
                <input type="button" id="btn_login" class="button" style="margin-top: 25px;" value="Start chatting" />
                </form>
                <div id="login_error" style="margin-top: 100px;" class="error">
                </div>
            </div>

            <div id="chat">
                <div style="height: 50px;">
                    <div>SignalRChat</div>
                    <div id="logout">
                        <a href="" id="btn_logout">Logout</a>
                    </div>
                </div>
                <div class="users-box right round2">
                    <strong>Users in chat:</strong>
                    <ul id="users">
                    </ul>
                </div>
                <div class="chat-box round2">
                    <div id="messages">
                        <ul id="message-list">
                        </ul>
                    </div>
                    <form id="chatform">
                    <table width="100%">
                        <tr>
                            <td>
                                <input type="text" id="msg" />
                            </td>
                            <td align="right" width="100px">
                                <input type="button" id="btn_send" class="button" value="Send" />
                            </td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="footer">
        <p style="margin: 0; padding-top: 9px;">
            <a href="http://sourcecodebean.com">Blog</a> <a href="http://github.com/moberg/SignalRChat">
                SignalRChat on Github</a> <a href="http://twitter.com/moberg">Twitter</a>
        </p>
    </div>
</body>
</html>
