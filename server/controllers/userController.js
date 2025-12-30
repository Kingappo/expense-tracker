import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { sendTemplatedEmail } from "../config/nodemail.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password -resetOtp -verifyOtp");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const createdAt = user.createdAt;
    const formattedDate = `${createdAt.getFullYear()}-${(
      createdAt.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${createdAt
      .getDate()
      .toString()
      .padStart(2, "0")} ${createdAt
      .getHours()
      .toString()
      .padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`;

    res.json({
      success: true,
      userData: {
        ...user._doc,
        registrationDate: formattedDate,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await userModel
      .findByIdAndUpdate(req.user.id, { firstName, lastName }, { new: true })
      .select("-password -resetOtp -verifyOtp");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const userDetails = {
      firstName: user.firstName,
      email: user.email,
    };

    await userModel.findByIdAndDelete(req.user.id);

    await sendTemplatedEmail("accountDeleted", userDetails.email, {
      firstName: userDetails.firstName,
      email: userDetails.email,
    });

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Both old and new passwords are required",
      });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendTemplatedEmail("passwordChanged", user.email, {
      firstName: user.firstName,
    });

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel
      .findById(id)
      .select("-password -resetOtp -verifyOtp");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
