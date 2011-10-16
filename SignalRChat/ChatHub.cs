using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using SignalR.Hubs;

namespace SignalRChat
{
    [HubName("chat")]
    public class ChatHub : Hub, IDisconnect
    {
        private static readonly Dictionary<string, ChatUser> _users 
            = new Dictionary<string, ChatUser>(StringComparer.OrdinalIgnoreCase);

        public Task Send(string message)
        {
            var user = _users.Values.FirstOrDefault(u => u.ClientId == Context.ClientId);

            if (user == null)
            {
                throw new Exception("User is not logged in");
            }

            return Clients.message(user.Name, message, TimeStamp());
        }

        public Task Logon(string userName)
        {
            if (userName.Length > 10)
            {
                throw new Exception("I prefer short names.");
            }

            if (_users.Any(x => x.Key == userName))
            {
                throw new Exception("User name is already taken, please select a different one.");
            }
            
            _users.Add(userName, new ChatUser {ClientId = Context.ClientId, Name = userName});

            Caller.name = userName;

            return Clients.loggedOn(userName, TimeStamp());
        }

        public Task Logout()
        {
            var user = _users.Values.FirstOrDefault(u => u.ClientId == Context.ClientId);

            if (user != null)
            {
                _users.Remove(user.Name);
                return Clients.loggedOff(user.Name, TimeStamp());
            }

            return null;
        }

        public void Disconnect()
        {
            Logout();
        }

        public Task Keypressed()
        {
            var user = _users.Values.FirstOrDefault(u => u.ClientId == Context.ClientId);

            if (user == null)
            {
                throw new Exception("User is not logged in");
            }

            return Clients.userTyping(user.Name);
        }

        

        public IEnumerable<ChatUser> GetUsers()
        {
            return _users.Values.OrderBy(x => x.Name);
        }

        private static string TimeStamp()
        {
            return DateTime.Now.ToShortTimeString();
        }
    }

    public class ChatUser
    {
        public string ClientId { get; set; }
        public string Name { get; set; }
    }
}