const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { sendPasswordResetEmail } = require('../mail/mail'); // Implement this function to send the password reset email
const Users = require('../models/Users.js');
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user by email
    const user = await Users.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = (await promisify(randomBytes)(20)).toString('hex');
    console.log(resetToken)
    // Set the password reset token and its expiration time for the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 7200000; // Token expires in 2 hour

    // Save the user's updated information
    await user.save();

    // Send the password reset email to the user
    sendPasswordResetEmail(resetToken); // Implement this function to send the password reset email

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    // Find the user by the password reset token and check its expiration
    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(token)
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the user's password
    user.password = await bcrypt.hash(password, 10);


    // Save the user's updated information
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { forgotPassword, resetPassword };
