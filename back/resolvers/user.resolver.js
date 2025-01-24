import { users } from "../exampleData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const userResolver = {
  Mutation: {
    // ======= register for MongoDB
    register: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("Please fill in all required fields");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          avatar: gender === "male" ? boyPic : girlPic,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (error) {
        console.error("Error of user registration: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        // if (!username || !password) {
        //   throw new Error("Please fill in all required fields");
        // }

        // const user = await User.findOne({ username });
        // if (!user) {
        //   throw new Error("User not found");
        // }

        // const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // if (!isPasswordCorrect) {
        //   throw new Error("Wrong password");
        // }

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);

        return user;
      } catch (error) {
        console.error("Error in user login: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in user logout: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    // ======= register for PostgreSQL (via prisma)
    // register: async (_, { input }, context) => {
    //   try {
    //     const { username, name, password, gender } = input;
    //     if (!username || !name || !password || !gender) {
    //       throw new Error("Please fill in all required fields");
    //     }

    //     const existingUser = await prisma.user.findUnique({
    //       where: { username },
    //     });
    //     if (existingUser) {
    //       throw new Error("User already exists");
    //     }

    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    //     const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //     const newUser = await prisma.user.create({
    //       data: {
    //         username,
    //         name,
    //         password: hashedPassword,
    //         gender,
    //         avatar: gender === "male" ? boyPic : girlPic,
    //       },
    //     });

    //     await context.login(newUser);

    //     return newUser;
    //   } catch (error) {
    //     console.error("Error of user registration: ", error);
    //     throw new Error(error.message || "Internal server error");
    //   }
    // },
  },

  Query: {
    // users: () => {
    //   return users;
    // },
    // user: (_, args) => {
    //     return users.find((user) => user._id === args.userId);
    //   },

    authUser: async (_, __, context) => {
      const user = await context.getUser();
      return user;
    },

    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        return user;
      } catch (error) {
        console.error("User is not found in DB: ", error);
        throw new Error(error.message || "Error getting user");
      }
    },

    // todo => add user/transaction relation
  },
};

export default userResolver;
