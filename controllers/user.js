const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register =async (req, res, prev) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password ,role} = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name && role)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: role,
        });



        // return new user
        res.status(200).json("new User Successfully Added");
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const login =async (req, res, prev) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email,is_deleted:false }).populate({
            path:"role",
            populate :{
                path:"permissions"
            }
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id,
                    email,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // token
            res.status(200).json({token:token});
        }else{
            res.status(400).json("Invalid Credentials");
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAll =async (req, res, prev) => {
    try {
        const data = await User.find({is_deleted:false}).select("-password");
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if(updatedData.password){
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        const result = await User.findByIdAndUpdate(
            id, updatedData
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const Delete =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndUpdate(id,
            {is_deleted:true})
        res.send(`Document with ${data.first_name+" "+data.last_name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    register,
    getAll,
    getById,
    Update,
    Delete,
    login
}