# api-polling
A real-world use case for polling would be if we used a third-party authentication provider (such as Firebase or Auth0 ) and need to wait on the result before we proceed. When a user registers, we send the user’s data to the authentication provider from the client. Then on the server, we wait for the response from the authentication provider and then create a user in our database.
During this whole process, the client must wait through the authentication and the user creation on our server. Since we know this process will either succeed or fail reasonably quickly, we can be comfortable implementing a poll that will make API requests to our server every 1 second until we complete the process of registering and creating a new user.
