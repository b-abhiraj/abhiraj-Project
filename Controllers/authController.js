import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }
        const existingUser = await userModel.findOne({ email });


        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered Please Login'
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Registered successfully',
            user
        })

    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            message
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid message or password',
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Password in invalid'
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: 'login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token,
        });
    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'message in Login',
            message
        })
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({
                message: 'Email is required'
            })
        }
        if (!answer) {
            res.status(400).send({
                message: 'Answer is required'
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: 'New Password is required'
            })
        }

        const user = await userModel.findOne({ email, answer });

        if (!user) {
            res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password Reset Successful',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;
        const user = await userModel.findById(req.user._id)
        if (password && password.length < 6) {
            return res.json({ error: 'Password is required & should be more than 6 characters' })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something Went Wrong in Update!',
            error
        })
    }
}

export const testController = (req, res) => {
    res.send('Protected Route')
}
