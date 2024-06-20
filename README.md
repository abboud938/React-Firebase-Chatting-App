

# React-Firebase Chatting App

A simple chat application developed with React and Firebase. This project demonstrates how to create a real-time chat application using Firebase's Firestore for data storage and Firebase Authentication for user management.

## Features

- **User Authentication**: Sign up and log in with email and password.
- **Real-time Messaging**: Send and receive messages in real-time.
- **Firestore Integration**: Store chat messages in Firestore.
- **Clean UI**: Simple and intuitive user interface.
- **Non-Responsive Design**: Currently not optimized for mobile devices. Future updates may include responsive design and additional features.

## Technologies Used

- **React**: Frontend framework.
- **Firebase**: Backend as a service, including Firestore and Authentication.
- **Vite**: Build tool for faster development.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abboud938/React-Firebase-Chatting-App.git
   cd React-Firebase-Chatting-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication (Email/Password).
   - Copy your Firebase config object and replace the placeholder in the `src/firebase.js` file.

4. **Run the app**:
   ```bash
   npm run dev
   ```

## Usage

1. **Sign Up**: Create a new account using email and password.
2. **Log In**: Log in with your credentials.
3. **Chat**: Start sending and receiving messages in real-time.


## Future Improvements

- **Responsive Design**: Make the app mobile-friendly.
- **New Features**: Add functionalities like image sharing, typing indicators, and message timestamps.
- **Performance Optimization**: Optimize Firestore queries and improve app performance.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
